'use client';

import { useShallow } from 'zustand/react/shallow';
import { defaultCategoryId } from '../_lib/configs';
import useTaskStore from '../taskStore';
import DeleteBtn from './_ui/DeleteBtn';
import MenuBtn from './_ui/MenuBtn';
import SortMethodBtn from './_ui/SortMethodBtn';
import CategoryTitleEditor from './CategoryTitleEditor';
import ShareBtn from './shareList/ShareBtn';
import { getFormattedDate } from '../_lib/utils';

export default function AppHeader({
   listConfig,
   className,
   handleDeleteCategory,
   theCategoryId,
   query,
}) {
   const { bgColor, listName, listIcon, theCategory } = listConfig;

   const { getUserInfo } = useTaskStore(
      useShallow((state) => ({
         getUserInfo: state.getUserInfo,
      }))
   );

   const isCategoryOwner =
      theCategoryId !== defaultCategoryId &&
      theCategory.category_owner_id === getUserInfo().user_id;

   const isEditable =
      theCategoryId !== defaultCategoryId &&
      theCategory.category_owner_id === getUserInfo().user_id;

   return (
      <div
         className={`${className}`}
         style={{ backgroundColor: bgColor.mainBackground, opacity: 0.99 }}
      >
         <MenuBtn
            className='mt-6 -translate-x-1 -translate-y-1'
            bgColor={bgColor}
         />

         {listName !== 'Search' && (
            <div
               className={`flex items-center sm:mt-10 ${
                  listName === 'Search' ? 'justify-center' : 'justify-between'
               }`}
               style={{ color: bgColor.primaryText }}
            >
               <h1
                  className='text-3xl font-medium flex gap-3 items-center ml-1 mt-3 leading-tight text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap'
                  title={query}
               >
                  {listIcon}

                  {theCategoryId === defaultCategoryId ? (
                     listName
                  ) : isEditable ? (
                     <CategoryTitleEditor theCategory={theCategory} />
                  ) : (
                     listName
                  )}
               </h1>

               {isCategoryOwner && (
                  <>
                     <ShareBtn
                        theCategoryId={theCategoryId}
                        bgColor={bgColor}
                     />

                     <DeleteBtn
                        onClick={handleDeleteCategory}
                        bgColor={bgColor}
                     />
                  </>
               )}

               <SortMethodBtn bgColor={bgColor} />
            </div>
         )}

         {listName === 'My Day' && (
            <span
               className='text-sm font-extralight ml-1'
               style={{ color: bgColor.ternaryText }}
            >
               {getFormattedDate()}
            </span>
         )}

         {listName === 'Search' && (
            <div
               className='ml-1 mt-1.5 leading-tight text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap'
               title={query}
               style={{ color: bgColor.primaryText }}
            >
               <span className='text-sm font-extralight text-accent-200 block'>
                  Results for
               </span>

               <span className='text-2xl font-normal leading-none'>
                  {query}
               </span>
            </div>
         )}
      </div>
   );
}
