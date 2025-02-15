import { defaultCategoryId } from '@/app/_lib/configs';
import TasksMinimizer from './TasksMinimizer';

export default function AllMinimizer({
   tasks,
   listRef,
   bgColor,
   handleToggleSidebar,
   getCategoriesList,
   listName,
}) {
   const defaultTasks = tasks.filter(
      (task) => task.task_category_id == defaultCategoryId
   );

   const customTasks = tasks.filter(
      (task) => task.task_category_id !== defaultCategoryId
   );

   const customLists = getCategoriesList().filter(
      (cat) => cat.category_id !== defaultCategoryId
   );

   return (
      <>
         <TasksMinimizer
            TogglerName='Tasks'
            tasks={defaultTasks}
            listRef={listRef}
            bgColor={bgColor}
            handleToggleSidebar={handleToggleSidebar}
            isVisibleByDefault={true}
            listName={listName}
         />

         {customLists.map(
            (cat) =>
               customTasks.filter(
                  (task) => task.task_category_id === cat.category_id
               ).length > 0 && (
                  <TasksMinimizer
                     key={cat.category_id}
                     TogglerName={cat.category_title}
                     listRef={listRef}
                     bgColor={bgColor}
                     handleToggleSidebar={handleToggleSidebar}
                     isVisibleByDefault={true}
                     listName={listName}
                     tasks={tasks.filter(
                        (task) => task.task_category_id === cat.category_id
                     )}
                  />
               )
         )}
      </>
   );
}
