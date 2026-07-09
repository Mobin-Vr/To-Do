"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSupabaseRealtimeToken } from "../_lib/useSupabaseRealtimeToken";
import useTaskStore from "../taskStore";

export default function TaskRealTimeListener() {
  const { supabase, isTokenReady } = useSupabaseRealtimeToken();
  const router = useRouter();
  const channelRef = useRef(null);

  useEffect(() => {
    if (!supabase || !isTokenReady) return;

    // Grab all needed actions once – their references are stable
    const {
      addTaskFromRealtime,
      addUserFromRealtime,
      updateTaskFromRealtime,
      updateCategoryNameFromRealTime,
      deleteTaskFromRealtime,
      removeUserWhenNotOwner,
      getUserState,
    } = useTaskStore.getState();

    const channel = supabase
      .channel("realtime-changes", {
        config: { private: true },
      })
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => addTaskFromRealtime(payload.new),
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tasks" },
        (payload) => updateTaskFromRealtime(payload.new),
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "tasks" },
        (payload) => deleteTaskFromRealtime(payload.old),
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "collaborators" },
        (payload) => {
          const currentUserId = getUserState().user_id;
          addUserFromRealtime(payload.new.invitation_id, payload.new);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "collaborators" },
        (payload) => {
          const currentUserId = getUserState().user_id;
          if (payload.old.user_id === currentUserId) {
            removeUserWhenNotOwner(payload.old.invitation_id);
            router.push("/tasks");
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "categories" },
        (payload) => {
          const currentUserId = getUserState().user_id;
          if (payload.new.category_owner_id !== currentUserId) {
            updateCategoryNameFromRealTime(
              payload.new.category_id,
              payload.new.category_title,
            );
          }
        },
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, isTokenReady, router]);

  return null;
}

// This component renders nothing (returns null) and only sets up a realtime
// listener. Subscribing to the store with useTaskStore(selector) would cause
// it to re‑run on every store change, even though it never displays data.
// By reading actions directly from useTaskStore.getState() inside the effect,
// the component stays completely outside the React render cycle, avoids
// unnecessary re‑renders, and keeps the Supabase channel stable across
// unrelated state updates.
