import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://ecegktmycedzwmayseai.supabase.co';
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_djWqIu1rgXIebI8aSZePXQ_Gjq79kwi';

// This publishable key is intended for browser use. Administrative access is enforced
// separately by the private.admin_users table and the protected Express API routes.
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
