import { defaultCategoryId } from '@/app/_lib/configs';
import AppHeader from './AppHeader';
import TasksList from './TasksList';
import TaskInput from './taskInput/TaskInput';
import NoTaskInMyDay from './NoTaskInMyDay';

export default function Template({
   listRef,
   listConfig,
   handleDeleteCategory,
   theCategoryId = defaultCategoryId,
   showInput = true,
}) {
   return (
      <div
         className='w-full h-full flex flex-col'
         style={{ backgroundColor: listConfig.bgColor.mainBackground }}
      >
         <AppHeader
            className='px-6 sm:px-10 h-36 z-10'
            listConfig={listConfig}
            handleDeleteCategory={handleDeleteCategory}
            theCategoryId={theCategoryId}
            query={listConfig?.query}
         />

         <div className='px-6 sm:px-10 my-2 h-full flex-grow overflow-auto'>
            {listConfig.tasks.length > 0 ? (
               <TasksList
                  listRef={listRef}
                  bgColor={listConfig.bgColor}
                  categoryId={theCategoryId}
                  tasks={listConfig.tasks}
                  listName={listConfig.listName}
                  query={listConfig?.query}
               />
            ) : (
               listConfig.listName === 'My Day' && <NoTaskInMyDay />
            )}
         </div>

         {showInput && (
            <TaskInput
               className='px-6 sm:px-10 h-[6rem] w-full'
               bgColor={listConfig.bgColor}
               categoryId={theCategoryId}
               listName={listConfig.listName}
            />
         )}
      </div>
   );
}
