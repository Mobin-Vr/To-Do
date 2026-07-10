import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

export function createSupabaseBrowserClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  return supabaseClient;
}
