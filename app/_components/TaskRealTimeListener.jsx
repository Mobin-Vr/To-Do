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
   } = useTaskStore(
      useShallow((state) => ({
         addTaskFromRealtime: state.addTaskFromRealtime,
         updateTaskFromRealtime: state.updateTaskFromRealtime,
         deleteTaskFromRealtime: state.deleteTaskFromRealtime,
         addUserFromRealtime: state.addUserFromRealtime,
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
               console.log('New task added:', payload.new);
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
               console.log('Task updated:', payload.new);
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
               console.log('Task deleted:', payload.old);
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
               console.log('New user added to collaborator:', payload.new);

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
         .subscribe();

      // Cleanup subscription when the component is unmounted
      return () => taskChannel.unsubscribe();
   }, [
      addTaskFromRealtime,
      updateTaskFromRealtime,
      deleteTaskFromRealtime,
      addUserFromRealtime,
   ]);

   return null;
}
