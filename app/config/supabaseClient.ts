import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('Supabase URL and/or Supabase Anon Key not provided.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
