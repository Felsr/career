import { createClient } from "@supabase/supabase-js";

// ✅ Load from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// ✅ Safety check
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Please add them in .env.local");
}

// ✅ Export Supabase client (used everywhere in your app)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
