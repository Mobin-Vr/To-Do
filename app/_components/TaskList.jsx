import { useState } from 'react';
import TaskGroup from './TaskGroup';
import CompletedToggle from './CompletedToggle';
import useTaskStore from '../store';

export default function TaskList({ listRef, bgColor }) {
   const [isCompletedVisible, setCompletedVisible] = useState(false);
   const taskList = useTaskStore((state) => state.taskList);

   if (taskList.length === 0) return null;

   const uncompletedTasks = taskList.filter((task) => !task.isCompleted);
   const completedTasks = taskList.filter((task) => task.isCompleted);

   const sortedCompletedTasks = completedTasks.sort(
      (a, b) => b.isStarred - a.isStarred
   );

   const sortedUncompletedTasks = uncompletedTasks.sort(
      (a, b) => b.isStarred - a.isStarred
   );

   return (
      <>
         <TaskGroup
            tasks={sortedUncompletedTasks}
            listRef={listRef}
            bgColor={bgColor}
         />

         {completedTasks.length > 0 && (
            <>
               <CompletedToggle
                  isCompletedVisible={isCompletedVisible}
                  completedCount={completedTasks.length}
                  onClick={() => setCompletedVisible(!isCompletedVisible)}
               />

               {isCompletedVisible && (
                  <TaskGroup
                     tasks={sortedCompletedTasks}
                     listRef={listRef}
                     bgColor={bgColor}
                  />
               )}
            </>
         )}
      </>
   );
}
