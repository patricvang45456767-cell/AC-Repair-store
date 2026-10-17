# AC-Repair-store Supabase setup

This repository is wired to the Supabase project configured by `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. The browser client uses a publishable key only; row-level security policies in the migrations enforce access control.

## Database migrations

The files in `supabase/migrations` mirror the four migrations already applied to the connected project:

- `20261017204443_ac_repair_initial_schema.sql`
- `20261017204503_ac_repair_security_and_indexes.sql`
- `20261017204516_ac_repair_api_access.sql`
- `20261017204738_ac_repair_app_integration.sql`

The public schema includes service catalog, bookings, contact messages, site content, gallery items, and testimonials. `private.admin_users` holds explicit admin assignments. Customer booking rows cannot be read through the public client; only approved admins can read or update them.

## Create the first administrator

1. In the Supabase Dashboard, open **Authentication → Users → Add user** and create the account using the admin email and password you choose. Do not put the password in SQL, GitHub, or chat.
2. After the user exists, run the following in the Supabase SQL Editor, replacing the email with the exact admin email:
   
   ```sql
   insert into private.admin_users (user_id)
   select id
   from auth.users
   where lower(email) = lower('replace-with-admin-email@example.com')
     and deleted_at is null
   on conflict (user_id) do nothing;
   ```

3. Confirm that exactly one row was added, then sign in from the website's Admin Dashboard. The frontend calls `public.is_current_user_admin()` and refuses entry if the signed-in user is not on the private allowlist.

## Recommended Auth hardening

- If visitors do not need accounts, turn off **Allow new users to sign up** under **Authentication → Sign In / Providers**. Dashboard-created users can still be managed by the project owner.
- Under the Auth password/security settings, enable leaked-password protection. Supabase's Security Advisor reported that this is currently disabled on the project.
- Keep MFA enabled on the Supabase owner account. Never put a Supabase secret/service-role key in a `VITE_*` variable or browser code.

## Local development

Copy the relevant environment values from `.env.example` into your local `.env` or hosting provider's environment-variable settings. Keep `GEMINI_API_KEY` server-side only. Then run:

```bash
npm install
npm run build
npm run lint
```

The legacy in-memory `/api/requests` and `/api/settings` endpoints now return HTTP 410; booking persistence and settings use Supabase directly. The AI diagnosis endpoint remains server-side.
