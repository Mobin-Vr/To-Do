"use client";

import { useEffect, useRef } from "react";
import useTaskStore from "../taskStore";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next/navigation";
import { useSupabaseRealtimeToken } from "../_lib/useSupabaseRealtimeToken";

export default function TaskRealTimeListener() {
  const { supabase, isTokenReady } = useSupabaseRealtimeToken();
  const router = useRouter();

  const {
    addTaskFromRealtime,
    addUserFromRealtime,
    updateTaskFromRealtime,
    updateCategoryNameFromRealTime,
    deleteTaskFromRealtime,
    removeUserWhenNotOwner,
    getUserState,
  } = useTaskStore(
    useShallow((state) => ({
      addTaskFromRealtime: state.addTaskFromRealtime,
      addUserFromRealtime: state.addUserFromRealtime,
      updateTaskFromRealtime: state.updateTaskFromRealtime,
      updateCategoryNameFromRealTime: state.updateCategoryNameFromRealTime,
      deleteTaskFromRealtime: state.deleteTaskFromRealtime,
      removeUserWhenNotOwner: state.removeUserWhenNotOwner,
      getUserState: state.getUserState,
    })),
  );

  const channelRef = useRef(null);

  useEffect(() => {
    // wait until the Clerk token is actually set on the realtime socket
    if (!supabase || !isTokenReady) return;

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
          // if (payload.new.user_id === currentUserId) {
          //   // joined via another tab/flow – hook this up if you need a live refresh
          // }

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
          console.log("RT>>>", payload.new.category_title);

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
  }, [
    supabase,
    isTokenReady,
    addTaskFromRealtime,
    updateTaskFromRealtime,
    deleteTaskFromRealtime,
    updateCategoryNameFromRealTime,
    removeUserWhenNotOwner,
    getUserState,
    router,
  ]);

  return null;
}
