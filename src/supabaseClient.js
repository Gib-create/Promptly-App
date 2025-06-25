import { createClient } from '@supabase/supabase-js';

// Values are loaded from Vite environment variables. See README for setup.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
