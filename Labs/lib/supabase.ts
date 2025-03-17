import { createClient } from '@supabase/supabase-js';

// Log the environment variables for debugging
console.log("Supabase URL:", process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log("Supabase Key:", process.env.EXPO_PUBLIC_SUPABASE_KEY);

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export default supabase;
