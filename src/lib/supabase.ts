import {serviceFetch} from './network';
import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error('Supabase public configuration is missing.');
export const supabase = createClient(url, key, {
  global: { fetch: serviceFetch },
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: 'tipix-auth' },
});
