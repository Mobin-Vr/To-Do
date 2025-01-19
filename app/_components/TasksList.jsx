import { useState } from 'react';
import TaskGroup from './TaskGroup';
import CompletedToggle from './CompletedToggle';
import useTaskStore from '../store';

export default function TasksList({ listRef, bgColor }) {
   const [isCompletedVisible, setCompletedVisible] = useState(false);
   const TasksList = useTaskStore((state) => state.TasksList);

   if (TasksList.length === 0) return null;

   const uncompletedTasks = TasksList.filter((task) => !task.isCompleted);
   const completedTasks = TasksList.filter((task) => task.isCompleted);

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
