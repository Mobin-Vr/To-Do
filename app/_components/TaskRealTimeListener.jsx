"use client";

import { useEffect } from "react";
import { supabase } from "../_lib/supabase";
import useTaskStore from "../taskStore";
import { useShallow } from "zustand/react/shallow";
import { defaultCategoryId } from "../_lib/configs";
import { redirect } from "next/navigation";
import { getCategoryInvIdAction, getUserByIdAction } from "../_lib/Actions";

export default function TaskRealTimeListener() {
  const {
    addTaskFromRealtime,
    updateTaskFromRealtime,
    updateCategoryNameFromRealTime,
    deleteTaskFromRealtime,
    addUserFromRealtime,
    removeUserWhenNotOwner,
    removeUserWhenOwner,
    getCategoriesList,
    getInvitations,
    getSharedWithMe,
    getUserState,
  } = useTaskStore(
    useShallow((state) => ({
      addTaskFromRealtime: state.addTaskFromRealtime,
      updateTaskFromRealtime: state.updateTaskFromRealtime,
      updateCategoryNameFromRealTime: state.updateCategoryNameFromRealTime,
      deleteTaskFromRealtime: state.deleteTaskFromRealtime,
      addUserFromRealtime: state.addUserFromRealtime,
      removeUserWhenNotOwner: state.removeUserWhenNotOwner,
      removeUserWhenOwner: state.removeUserWhenOwner,
      getCategoriesList: state.getCategoriesList,
      getInvitations: state.getInvitations,
      getSharedWithMe: state.getSharedWithMe,
      getUserState: state.getUserState,
    })),
  );

  const invitations = getInvitations() || [];
  const sharedLists = getSharedWithMe() || [];

  // Categories where the user is the owner or a collaborator
  const userOwnedInvitationIds = invitations.map((inv) => inv.invitation_id);
  const sharedInvitationIds = sharedLists.map((list) => list.invitation_id);

  const relevantInvitationIds = Array.from(
    // eslint-disable-next-line no-undef
    new Set([...userOwnedInvitationIds, ...sharedInvitationIds]),
  );

  useEffect(() => {
    const taskChannel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        async (payload) => {
          const isShared =
            getCategoriesList().find(
              (cat) => cat.category_id === payload.new.task_category_id,
            )?.has_category_invitation ?? false;

          if (!isShared) return; // If not shared, it means we received the change that we made ourselves.

          if (payload.new.task_category_id === defaultCategoryId) return;

          const invId = await getCategoryInvIdAction(
            payload.new.task_category_id,
          );

          const isRelevant = relevantInvitationIds.includes(
            invId?.invitation_id,
          );

          if (isRelevant) addTaskFromRealtime(payload.new);
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tasks" },
        async (payload) => {
          const isShared =
            getCategoriesList().find(
              (cat) => cat.category_id === payload.new.task_category_id,
            )?.has_category_invitation ?? false;

          if (!isShared) return; // If not shared, it means we received the change that we made ourselves.
          if (payload.new.task_category_id === defaultCategoryId) return;

          const invId = await getCategoryInvIdAction(
            payload.new.task_category_id,
          );

          const isRelevant = relevantInvitationIds.includes(
            invId.invitation_id,
          );

          if (isRelevant) updateTaskFromRealtime(payload.new);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "tasks" },
        async (payload) => {
          const isShared =
            getCategoriesList().find(
              (cat) => cat.category_id === payload.old.task_category_id,
            )?.has_category_invitation ?? false;

          if (!isShared) return; // If not shared, it means we received the change that we made ourselves.

          if (payload.old.task_category_id === defaultCategoryId) return;

          const invId = await getCategoryInvIdAction(
            payload.old.task_category_id,
          );

          const isRelevant = relevantInvitationIds.includes(
            invId.invitation_id,
          );

          if (isRelevant) deleteTaskFromRealtime(payload.old);
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "collaborators" },
        async (payload) => {
          const { invitation_id: invitationId, user_id: userId } = payload.new;

          if (getUserState().user_id === userId) return; // there is no need to add owner to members list

          const invitation = getInvitations()?.find(
            (inv) => inv.invitation_id === invitationId,
          );

          // Check if the requester is the owner
          const isOwner =
            invitation?.invitation_owner_id === getUserState().user_id;

          if (!isOwner) return;

          // Fetch user info related to the new collaborator
          const user = await getUserByIdAction(userId);

          if (!user) return;

          // Add the new user to the store
          addUserFromRealtime(payload.new.invitation_id, user);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "collaborators" },
        async (payload) => {
          const { invitation_id: invitationId, user_id: userId } = payload.old;

          const invitation = getInvitations()?.find(
            (inv) => inv.invitation_id === invitationId,
          );

          const sharedCategory = getSharedWithMe()?.find(
            (list) => list.invitation_id === invitationId,
          );

          // Check if the requester is the owner
          const isOwner =
            invitation?.invitation_owner_id === getUserState().user_id;

          // Check if the requester is a user in sharedWithMe
          const isUser =
            sharedCategory?.invitation_owner_id !== getUserState().user_id &&
            sharedCategory !== undefined;

          if (isOwner) removeUserWhenOwner(invitationId, userId);
          if (isUser) {
            await removeUserWhenNotOwner(invitationId);
            redirect(`/tasks`);
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "categories" },
        async (payload) => {
          const {
            category_id: categoryId,
            category_owner_id: userId,
            category_title: categoryTitle,
          } = payload.new;

          if (getUserState().user_id === userId) return; // there is no need to add for owner

          updateCategoryNameFromRealTime(categoryId, categoryTitle);
        },
      )
      .subscribe();

    // Cleanup subscription when the component is unmounted
    return () => taskChannel.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
