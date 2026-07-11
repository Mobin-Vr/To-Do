"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createSupabaseBrowserClient } from "./supabase-browser";

// Clerk's default session token expires around 60s; refresh before that
const TOKEN_REFRESH_INTERVAL_MS = 45_000;

export function useSupabaseRealtimeToken() {
  const { getToken, isSignedIn } = useAuth();

  // A stable Supabase client created once – lazy initializer ensures
  // it never changes across renders, and it's safe to return directly.
  const [supabase] = useState(() => createSupabaseBrowserClient());

  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      // Defer state update to avoid React 19 synchronous setState warning
      queueMicrotask(() => setIsTokenReady(false));
      return;
    }

    let cancelled = false;

    async function refreshToken() {
      try {
        const token = await getToken({ skipCache: true });
        if (!cancelled && token) {
          supabase.realtime.setAuth(token);
          setIsTokenReady(true);
        }
      } catch (e) {
        console.error("Realtime token error:", e);
      }
    }

    refreshToken();
    const intervalId = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [isSignedIn, getToken, supabase]);

  return { supabase, isTokenReady };
}
