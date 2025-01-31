'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import useTaskStore from '../taskStore';
import { supabase } from '../_lib/supabase';

export default function TaskRealTimeListener() {
   const { addTaskFromRealtime, userInfo } = useTaskStore(
      useShallow((state) => ({
         addTaskFromRealtime: state.addTaskFromRealtime,
         userInfo: state.userInfo,
      }))
   );
   useEffect(() => {
      const taskSubscription = supabase
         .from('tasks')
         .on('INSERT', (payload) => {
            console.log('New task added:', payload.new);

            if (payload.new.user_id === userInfo.user_id) {
               addTaskFromRealtime(payload.new);
            }
         })
         .subscribe();

      return () => supabase.removeSubscription(taskSubscription);
   }, [addTaskFromRealtime, userInfo.user_id]);
   return <div>Listening for new tasks...</div>;
}
