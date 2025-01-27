'use client';

import { defaultCategoryId } from '../_lib/utils';
import DeleteBtn from './_ui/DeleteBtn';
import MenuBtn from './_ui/MenuBtn';
import ShareBtn from './shareList/ShareBtn';
import SortMethodBtn from './_ui/SortMethodBtn';
import CategoryTitleEditor from './CategoryTitleEditor';

export default function AppHeader({
   listConfig,
   className,
   handleDeleteCategory,
}) {
   const { bgColor, listName, listIcon, theCategory } = listConfig;

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
               {theCategory.id === defaultCategoryId ? (
                  listName
               ) : (
                  <CategoryTitleEditor theCategory={theCategory} />
               )}
            </h1>

            {theCategory.id !== defaultCategoryId && (
               <>
                  <DeleteBtn onClick={handleDeleteCategory} />
                  <ShareBtn />
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
