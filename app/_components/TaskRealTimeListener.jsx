"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSupabaseRealtimeToken } from "@/app/_lib/useSupabaseRealtimeToken";
import useTaskStore from "@/app/_store/useTaskStore";
import useCategoryStore from "@/app/_store/useCategoryStore";
import useInvitationStore from "@/app/_store/useInvitationStore";
import useUserStore from "@/app/_store/useUserStore";

export default function TaskRealTimeListener() {
  const { supabase, isTokenReady } = useSupabaseRealtimeToken();
  const router = useRouter();
  const channelRef = useRef(null);

  useEffect(() => {
    if (!supabase || !isTokenReady) return;

    const channel = supabase
      .channel("realtime-changes", { config: { private: true } })
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => useTaskStore.getState().addTaskFromRealtime(payload.new),
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tasks" },
        (payload) =>
          useTaskStore.getState().updateTaskFromRealtime(payload.new),
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "tasks" },
        (payload) =>
          useTaskStore.getState().deleteTaskFromRealtime(payload.old),
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "collaborators" },
        (payload) => {
          useInvitationStore
            .getState()
            .addUserFromRealtime(payload.new.invitation_id, payload.new);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "collaborators" },
        (payload) => {
          const currentUserId = useUserStore.getState().userState?.user_id;
          if (payload.old.user_id === currentUserId) {
            useInvitationStore
              .getState()
              .removeUserWhenNotOwner(payload.old.invitation_id);
            router.push("/tasks");
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "categories" },
        (payload) => {
          const currentUserId = useUserStore.getState().userState?.user_id;
          if (payload.new.category_owner_id !== currentUserId) {
            useCategoryStore
              .getState()
              .updateCategoryNameFromRealTime(
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
