'use client';

import { useEffect } from 'react';
import { supabase } from '../_lib/supabase';
import useTaskStore from '../taskStore';
import { useShallow } from 'zustand/react/shallow';
import { getCategoryInvId, getUserById } from '../_lib/data-services';
import { defaultCategoryId } from '../_lib/configs';
import { redirect } from 'next/navigation';

export default function TaskRealTimeListener() {
   const {
      addTaskFromRealtime,
      updateTaskFromRealtime,
      deleteTaskFromRealtime,
      addUserFromRealtime,
      removeUserWhenNotOwner,
      removeUserWhenOwner,
      categoriesList,
      getInvitations,
      getSharedWithMe,
      getUserInfo,
   } = useTaskStore(
      useShallow((state) => ({
         addTaskFromRealtime: state.addTaskFromRealtime,
         updateTaskFromRealtime: state.updateTaskFromRealtime,
         deleteTaskFromRealtime: state.deleteTaskFromRealtime,
         addUserFromRealtime: state.addUserFromRealtime,
         removeUserWhenNotOwner: state.removeUserWhenNotOwner,
         removeUserWhenOwner: state.removeUserWhenOwner,
         categoriesList: state.categoriesList,
         getInvitations: state.getInvitations,
         getSharedWithMe: state.getSharedWithMe,
         getUserInfo: state.getUserInfo,
      }))
   );

   const invitations = getInvitations() || [];
   const sharedLists = getSharedWithMe() || [];

   // Categories where the user is the owner or a collaborator
   const userOwnedInvitationIds = invitations.map((inv) => inv.invitation_id);
   const sharedInvitationIds = sharedLists.map((list) => list.invitation_id);

   const relevantInvitationIds = Array.from(
      // eslint-disable-next-line no-undef
      new Set([...userOwnedInvitationIds, ...sharedInvitationIds])
   );

   useEffect(() => {
      // Make the useEffect async
      const taskChannel = supabase
         .channel('realtime posts')
         .on(
            'postgres_changes',
            {
               event: 'INSERT',
               schema: 'public',
               table: 'tasks',
            },
            async (payload) => {
               const isShared =
                  categoriesList.find(
                     (cat) => cat.category_id === payload.new.task_category_id
                  )?.has_category_invitation ?? false;

               if (!isShared) return; // If not shared, it means we received the change that we made ourselves.

               if (payload.new.task_category_id === defaultCategoryId) return;

               const invId = await getCategoryInvId(
                  payload.new.task_category_id
               );

               const isRelevant = relevantInvitationIds.includes(
                  invId?.invitation_id
               );

               if (isRelevant) addTaskFromRealtime(payload.new);
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'UPDATE',
               schema: 'public',
               table: 'tasks',
            },
            async (payload) => {
               const isShared =
                  categoriesList.find(
                     (cat) => cat.category_id === payload.new.task_category_id
                  )?.has_category_invitation ?? false;

               if (!isShared) return; // If not shared, it means we received the change that we made ourselves.
               if (payload.new.task_category_id === defaultCategoryId) return;

               const invId = await getCategoryInvId(
                  payload.new.task_category_id
               );

               const isRelevant = relevantInvitationIds.includes(
                  invId.invitation_id
               );

               if (isRelevant) updateTaskFromRealtime(payload.new);
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'DELETE',
               schema: 'public',
               table: 'tasks',
            },
            async (payload) => {
               const isShared =
                  categoriesList.find(
                     (cat) => cat.category_id === payload.old.task_category_id
                  )?.has_category_invitation ?? false;

               if (!isShared) return; // If not shared, it means we received the change that we made ourselves.

               if (payload.old.task_category_id === defaultCategoryId) return;

               const invId = await getCategoryInvId(
                  payload.old.task_category_id
               );

               const isRelevant = relevantInvitationIds.includes(
                  invId.invitation_id
               );

               if (isRelevant) deleteTaskFromRealtime(payload.old);
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'INSERT',
               schema: 'public',
               table: 'collaborators',
            },
            async (payload) => {
               const { invitation_id: invitationId, user_id: userId } =
                  payload.new;

               const invitation = getInvitations()?.find(
                  (inv) => inv.invitation_id === invitationId
               );

               // Check if the requester is the owner
               const isOwner =
                  invitation?.invitation_owner_id === getUserInfo().user_id;

               if (!isOwner) return;

               // Fetch user info related to the new collaborator
               const user = await getUserById(userId);

               if (!user) return;

               // Add the new user to the store
               addUserFromRealtime(payload.new.invitation_id, user);
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'DELETE',
               schema: 'public',
               table: 'collaborators',
            },
            async (payload) => {
               const { invitation_id: invitationId, user_id: userId } =
                  payload.old;

               const invitation = getInvitations()?.find(
                  (inv) => inv.invitation_id === invitationId
               );

               const sharedCategory = getSharedWithMe()?.find(
                  (list) => list.invitation_id === invitationId
               );

               // Check if the requester is the owner
               const isOwner =
                  invitation?.invitation_owner_id === getUserInfo().user_id;

               // Check if the requester is a user in sharedWithMe
               const isUser =
                  sharedCategory?.invitation_owner_id !==
                     getUserInfo().user_id && sharedCategory !== undefined;

               if (isOwner) removeUserWhenOwner(invitationId, userId);
               if (isUser) {
                  await removeUserWhenNotOwner(invitationId);
                  redirect(`/tasks`);
               }
            }
         )
         .subscribe();

      // Cleanup subscription when the component is unmounted
      return () => taskChannel.unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return null;
}
