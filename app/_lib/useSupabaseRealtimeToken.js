"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createSupabaseBrowserClient } from "./supabase-browser";

// Clerk's default session token expires around 60s; refresh before that
const TOKEN_REFRESH_INTERVAL_MS = 45_000;

export function useSupabaseRealtimeToken() {
  const { getToken, isSignedIn } = useAuth();
  const supabaseRef = useRef(createSupabaseBrowserClient());
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      setIsTokenReady(false);
      return;
    }

    let cancelled = false;
    const supabase = supabaseRef.current;

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
  }, [isSignedIn, getToken]);

  return { supabase: supabaseRef.current, isTokenReady };
}
