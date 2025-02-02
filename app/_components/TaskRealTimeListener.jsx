'use client';

import { useEffect } from 'react';
import { supabase } from '../_lib/supabase';
import useTaskStore from '../taskStore';
import { useShallow } from 'zustand/react/shallow';

export default function TaskRealTimeListener() {
   const {
      addTaskFromRealtime,
      updateTaskFromRealtime,
      deleteTaskFromRealtime,
      addUserFromRealtime,
      removeUserWhenNotOwner,
      removeUserWhenOwner,
      getInvitations,
      getSharedWithMe,
      userInfo,
   } = useTaskStore(
      useShallow((state) => ({
         addTaskFromRealtime: state.addTaskFromRealtime,
         updateTaskFromRealtime: state.updateTaskFromRealtime,
         deleteTaskFromRealtime: state.deleteTaskFromRealtime,
         addUserFromRealtime: state.addUserFromRealtime,
         removeUserWhenNotOwner: state.removeUserWhenNotOwner,
         removeUserWhenOwner: state.removeUserWhenOwner,
         getInvitations: state.getInvitations,
         getSharedWithMe: state.getSharedWithMe,
         userInfo: state.userInfo,
      }))
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
            (payload) => {
               addTaskFromRealtime(payload.new);
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'UPDATE',
               schema: 'public',
               table: 'tasks',
            },
            (payload) => {
               updateTaskFromRealtime(payload.new);
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'DELETE',
               schema: 'public',
               table: 'tasks',
            },
            (payload) => {
               deleteTaskFromRealtime(payload.old);
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
               // Fetch user info using the user_id from the collaborator
               const { data: user, error } = await supabase
                  .from('users')
                  .select('*')
                  .eq('user_id', payload.new.user_id)
                  .single();

               if (error) {
                  console.error('Error fetching user:', error);
                  return;
               }

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

               // Find the invitation and shared category
               const invitation = getInvitations()?.find(
                  (inv) => inv.invitation_id === invitationId
               );

               const sharedCategory = getSharedWithMe()?.find(
                  (list) => list.invitation_id === invitationId
               );

               console.log('invitationId:', invitationId);
               console.log('sharedWithMe:', getSharedWithMe());
               console.log('sharedCategory:', sharedCategory);

               // Check if the requester is the owner
               const isOwner =
                  invitation?.invitation_owner_id === userInfo.user_id;

               // Check if the requester is a user in sharedWithMe
               const isUser =
                  sharedCategory?.invitation_owner_id !== userInfo.user_id &&
                  sharedCategory !== undefined;

               // Remove the user from the store
               console.log('isOwner:', isOwner);
               console.log('isUser:', isUser);

               if (isOwner) removeUserWhenOwner(invitationId, userId);
               if (isUser) removeUserWhenNotOwner(invitationId);
            }
         )
         .subscribe();

      // Cleanup subscription when the component is unmounted
      return () => taskChannel.unsubscribe();
   }, []);

   return null;
}
