'use client';

import { useShallow } from 'zustand/react/shallow';
import { defaultCategoryId } from '../_lib/utils';
import useTaskStore from '../taskStore';
import DeleteBtn from './_ui/DeleteBtn';
import MenuBtn from './_ui/MenuBtn';
import SortMethodBtn from './_ui/SortMethodBtn';
import CategoryTitleEditor from './CategoryTitleEditor';
import ShareBtn from './shareList/ShareBtn';

export default function AppHeader({
   listConfig,
   className,
   handleDeleteCategory,
   theCategoryId,
}) {
   const { bgColor, listName, listIcon, theCategory } = listConfig;

   const { userInfo } = useTaskStore(
      useShallow((state) => ({
         userInfo: state.userInfo,
      }))
   );

   const cond =
      theCategory.category_id !== defaultCategoryId &&
      theCategory.category_owner_id === userInfo.user_id;

   return (
      <div
         className={`${className}`}
         style={{ backgroundColor: bgColor[0], opacity: 0.99 }}
      >
         <MenuBtn
            className='mt-6 -translate-x-1 -translate-y-1'
            color={bgColor[3]}
         />

         <div
            className='flex justify-between items-center sm:mt-10'
            style={{ color: bgColor[3] }}
         >
            <h1
               className='text-3xl font-medium flex gap-3 items-center'
               style={{ color: bgColor[3] }}
            >
               {listIcon}

               {theCategory.category_id === defaultCategoryId ? (
                  listName
               ) : (
                  <CategoryTitleEditor theCategory={theCategory} />
               )}
            </h1>

            {cond && (
               <>
                  <ShareBtn theCategoryId={theCategoryId} />
                  <DeleteBtn onClick={handleDeleteCategory} />
               </>
            )}
            <SortMethodBtn />
         </div>

         {listName === 'My Day' && (
            <span className='text-xs' style={{ color: bgColor[4] }}>
               Friday, January 10
            </span>
         )}
      </div>
   );
}
