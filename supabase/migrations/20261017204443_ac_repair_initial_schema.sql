create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated;

create table private.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table private.admin_users enable row level security;
revoke all on table private.admin_users from public, anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from private.admin_users a
    where a.user_id = (select auth.uid())
  );
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.set_updated_at() from public, anon, authenticated;

create table public.service_catalog (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  base_price numeric(10,2) check (base_price is null or base_price >= 0),
  price_unit text not null default 'per service',
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  icon text,
  image_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  service_id uuid references public.service_catalog(id) on delete set null,
  service_name text not null,
  preferred_date date,
  preferred_time time,
  address text,
  problem_description text,
  ai_diagnosis text,
  status text not null default 'new'
    check (status in ('new','contacted','scheduled','in_progress','completed','cancelled')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new'
    check (status in ('new','read','replied','archived')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_content (
  setting_key text primary key,
  setting_value jsonb not null default '{}'::jsonb,
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  category text,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_location text,
  rating smallint not null default 5 check (rating between 1 and 5),
  review text not null,
  is_approved boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index service_catalog_active_order_idx
  on public.service_catalog (is_active, display_order);
create index service_bookings_status_created_idx
  on public.service_bookings (status, created_at desc);
create index service_bookings_preferred_date_idx
  on public.service_bookings (preferred_date);
create index contact_messages_status_created_idx
  on public.contact_messages (status, created_at desc);
create index gallery_items_published_order_idx
  on public.gallery_items (is_published, display_order);
create index testimonials_approved_order_idx
  on public.testimonials (is_approved, display_order);

create trigger service_catalog_set_updated_at
before update on public.service_catalog
for each row execute function public.set_updated_at();
create trigger service_bookings_set_updated_at
before update on public.service_bookings
for each row execute function public.set_updated_at();
create trigger contact_messages_set_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();
create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();
create trigger gallery_items_set_updated_at
before update on public.gallery_items
for each row execute function public.set_updated_at();
create trigger testimonials_set_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

alter table public.service_catalog enable row level security;
alter table public.service_bookings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_content enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;

grant select on public.service_catalog to anon, authenticated;
grant insert, update, delete on public.service_catalog to authenticated;
grant insert on public.service_bookings to anon, authenticated;
grant select, update, delete on public.service_bookings to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;
grant select on public.testimonials to anon, authenticated;
grant insert on public.testimonials to anon, authenticated;
grant update, delete on public.testimonials to authenticated;

create policy "Anyone can read active services"
on public.service_catalog for select to anon, authenticated
using (is_active = true or (select private.is_admin()));
create policy "Admins can add services"
on public.service_catalog for insert to authenticated
with check ((select private.is_admin()));
create policy "Admins can update services"
on public.service_catalog for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
create policy "Admins can delete services"
on public.service_catalog for delete to authenticated
using ((select private.is_admin()));

create policy "Visitors can submit service bookings"
on public.service_bookings for insert to anon, authenticated
with check (status = 'new' and admin_notes is null);
create policy "Admins can read service bookings"
on public.service_bookings for select to authenticated
using ((select private.is_admin()));
create policy "Admins can update service bookings"
on public.service_bookings for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
create policy "Admins can delete service bookings"
on public.service_bookings for delete to authenticated
using ((select private.is_admin()));

create policy "Visitors can send contact messages"
on public.contact_messages for insert to anon, authenticated
with check (status = 'new' and admin_notes is null);
create policy "Admins can read contact messages"
on public.contact_messages for select to authenticated
using ((select private.is_admin()));
create policy "Admins can update contact messages"
on public.contact_messages for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
create policy "Admins can delete contact messages"
on public.contact_messages for delete to authenticated
using ((select private.is_admin()));

create policy "Visitors can read public site content"
on public.site_content for select to anon, authenticated
using (is_public = true or (select private.is_admin()));
create policy "Admins can add site content"
on public.site_content for insert to authenticated
with check ((select private.is_admin()));
create policy "Admins can update site content"
on public.site_content for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
create policy "Admins can delete site content"
on public.site_content for delete to authenticated
using ((select private.is_admin()));

create policy "Visitors can read published gallery items"
on public.gallery_items for select to anon, authenticated
using (is_published = true or (select private.is_admin()));
create policy "Admins can add gallery items"
on public.gallery_items for insert to authenticated
with check ((select private.is_admin()));
create policy "Admins can update gallery items"
on public.gallery_items for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
create policy "Admins can delete gallery items"
on public.gallery_items for delete to authenticated
using ((select private.is_admin()));

create policy "Visitors can read approved testimonials"
on public.testimonials for select to anon, authenticated
using (is_approved = true or (select private.is_admin()));
create policy "Visitors can submit testimonials for moderation"
on public.testimonials for insert to anon, authenticated
with check (is_approved = false);
create policy "Admins can update testimonials"
on public.testimonials for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
create policy "Admins can delete testimonials"
on public.testimonials for delete to authenticated
using ((select private.is_admin()));

comment on table public.service_catalog is 'Services displayed on the AC-Repair-store website. Keep public-visible service data here only.';
comment on table public.service_bookings is 'Customer service requests. Only admins may read customer personal data.';
comment on table public.contact_messages is 'Website contact form submissions. Only admins may read message details.';
comment on table public.site_content is 'Public website content/configuration. Never store secrets in this table.';
comment on table private.admin_users is 'Trusted admin account IDs. Managed only by the project owner, never by public clients.';
