create sequence if not exists public.service_request_ref_seq start with 10001;

alter table public.service_bookings
  add column if not exists ref_code text unique default ('SR-' || lpad(nextval('public.service_request_ref_seq')::text, 5, '0')),
  add column if not exists service_slug text not null default 'general-inquiry',
  add column if not exists area_text text not null default '',
  add column if not exists ac_type text not null default 'not_sure',
  add column if not exists brand_model text not null default 'Unspecified',
  add column if not exists preferred_time_window text not null default 'anytime',
  add column if not exists additional_notes text,
  add column if not exists contacted_at timestamptz,
  add column if not exists notes jsonb not null default '[]'::jsonb,
  add column if not exists status_history jsonb not null default '[]'::jsonb;

alter table public.service_bookings drop constraint if exists service_bookings_status_check;
alter table public.service_bookings
  add constraint service_bookings_status_check
  check (status in ('new','contacted','scheduled','in_progress','completed','cancelled','unable_to_serve'));
alter table public.service_bookings
  add constraint service_bookings_ac_type_check
  check (ac_type in ('split','window','inverter','floor_standing','not_sure'));
alter table public.service_bookings
  add constraint service_bookings_preferred_time_window_check
  check (preferred_time_window in ('morning','afternoon','evening','anytime'));
alter table public.service_bookings
  add constraint service_bookings_notes_is_array_check
  check (jsonb_typeof(notes) = 'array');
alter table public.service_bookings
  add constraint service_bookings_status_history_is_array_check
  check (jsonb_typeof(status_history) = 'array');

drop policy if exists "Visitors can submit service bookings" on public.service_bookings;
create policy "Visitors can submit service bookings"
on public.service_bookings for insert to anon, authenticated
with check (
  status = 'new'
  and admin_notes is null
  and contacted_at is null
  and notes = '[]'::jsonb
  and status_history = '[]'::jsonb
);

create or replace function public.is_current_user_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_admin();
$$;
revoke all on function public.is_current_user_admin() from public, anon;
grant execute on function public.is_current_user_admin() to authenticated;

insert into public.site_content (setting_key, setting_value, is_public)
values (
  'site_settings',
  '{
    "businessName":"ABC Air Care",
    "tagline":"Precision AC Repair, Jet Servicing & HVAC Engineering",
    "description":"Certified technicians specializing in inverter troubleshooting, high-pressure jet cleaning, nitrogen leak testing, and honest upfront estimates.",
    "phoneDisplay":"0346 3902834",
    "phoneE164":"+923463902834",
    "whatsappE164":"+923463902834",
    "whatsappPrefill":"Assalam o Alaikum ABC Air Care, mujhe AC service ya repair k baray me rabta krna hai.",
    "email":"service@abcaircare.com",
    "address":"Shop 14, Commercial Center, Main Boulevard, Lahore",
    "showAddress":true,
    "openingHours":"Mon - Sun: 8:00 AM - 9:30 PM (Emergency breakdown hotline active)",
    "pricePolicy":"Honest, inspection-based estimates. A standard nominal visit fee applies, which is 100% credited into your final invoice upon approved service.",
    "serviceAreas":["DHA Phase 1 - 9 & Raya","Gulberg (I, II, III, IV, V)","Johar Town & PIA Society","Model Town & Garden Town","Bahria Town & Canal Gardens","WAPDA Town & PCSIR","Cantt, Cavalry & Falcon Complex","Faisal Town & Township","Valencia, Lake City & Bahria Orchard","Askari (1 through 11)"],
    "emergencyEnabled":true
  }'::jsonb,
  true
)
on conflict (setting_key) do nothing;
