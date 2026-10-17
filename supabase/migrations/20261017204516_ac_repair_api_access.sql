grant select, insert, update, delete on
  public.service_catalog,
  public.service_bookings,
  public.contact_messages,
  public.site_content,
  public.gallery_items,
  public.testimonials
to service_role;

grant usage on schema private to service_role;
grant select, insert, update, delete on private.admin_users to service_role;
grant execute on function private.is_admin() to service_role;
