import { defaultCategoryId } from '@/app/_lib/utils';
import AppHeader from './AppHeader';
import TasksList from './TasksList';
import TaskInput from './taskInput/TaskInput';

export default function Template({
   listRef,
   listConfig,
   handleDeleteCategory,
   theCategoryId = defaultCategoryId,
}) {
   return (
      <div
         className='w-full h-full flex flex-col'
         style={{ backgroundColor: listConfig.bgColor[0] }}
      >
         <AppHeader
            className='px-6 sm:px-10 h-36 z-10'
            listConfig={listConfig}
            handleDeleteCategory={handleDeleteCategory}
            theCategoryId={theCategoryId}
         />

         <div className='px-6 sm:px-10 my-2 h-full flex-grow overflow-auto'>
            <TasksList
               listRef={listRef}
               bgColor={listConfig.bgColor}
               categoryId={listConfig.theCategory.category_id}
            />
         </div>

         <TaskInput
            className='px-6 sm:px-10 h-[7rem] w-full'
            bgColor={listConfig.bgColor}
            categoryId={listConfig.theCategory.category_id}
         />
      </div>
   );
}
