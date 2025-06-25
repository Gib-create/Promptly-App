import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nzhyjnsxgrkckjxwesbk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56aHlqbnN4Z3JrY2tqeHdlc2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjgzOTQsImV4cCI6MjA2NTg0NDM5NH0.ZZ5fIgYXhcPyGt3mhI_sx7j8bnOkS7HxuIKfyXeoI70';

export const supabase = createClient(supabaseUrl, supabaseKey);
