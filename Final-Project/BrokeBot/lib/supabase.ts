import { createClient } from "@supabase/supabase-js";


// Log the environment variables to check if they are loaded correctly
console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.EXPO_PUBLIC_SUPABASE_KEY);

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_KEY as string
);

export default supabase;
