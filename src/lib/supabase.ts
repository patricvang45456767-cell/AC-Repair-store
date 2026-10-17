import { createClient } from '@supabase/supabase-js';

// These are publishable browser credentials; database access is protected by RLS.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in the host environment
// to override these project-specific defaults (never put a service-role key here).
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://ecegktmycedzwmayseai.supabase.co';
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_djWqIu1rgXIebI8aSZePXQ_Gjq79kwi';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
