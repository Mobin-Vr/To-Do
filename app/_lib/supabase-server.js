import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Original client creator – calls auth() internally. Used for mutations (no cache).
export async function createSupabaseServerClient() {
  const { getToken } = await auth();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      accessToken: async () => {
        return await getToken({ template: "supabase" });
      },
    },
  );
}

// New helper that accepts a ready‑made token.
// Used inside cached functions because they cannot call headers() / auth() directly.
export function createSupabaseClientWithToken(accessToken) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      accessToken: async () => accessToken,
    },
  );
}
