import { categorizePlannedTasks } from '../../_lib/utils';
import TasksMinimizer from './TasksMinimizer';

export default function PlannedMinimizer({
   tasks,
   listRef,
   bgColor,
   handleToggleSidebar,
   listName,
}) {
   const { pastTasks, todayTasks, futureTasks } = categorizePlannedTasks(tasks);

   return (
      <>
         <TasksMinimizer
            TogglerName='Earlier'
            tasks={pastTasks}
            listRef={listRef}
            bgColor={bgColor}
            handleToggleSidebar={handleToggleSidebar}
            isVisibleByDefault={true}
            listName={listName}
         />

         <TasksMinimizer
            TogglerName='Today'
            tasks={todayTasks}
            listRef={listRef}
            bgColor={bgColor}
            handleToggleSidebar={handleToggleSidebar}
            isVisibleByDefault={true}
            listName={listName}
         />

         <TasksMinimizer
            TogglerName='Later'
            tasks={futureTasks}
            listRef={listRef}
            bgColor={bgColor}
            handleToggleSidebar={handleToggleSidebar}
            isVisibleByDefault={true}
            listName={listName}
         />
      </>
   );
}
