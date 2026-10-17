create policy "No direct client access to admin assignments"
on private.admin_users
for all
to anon, authenticated
using (false)
with check (false);

create index service_bookings_service_id_idx
on public.service_bookings (service_id);
