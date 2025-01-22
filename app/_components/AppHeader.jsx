import { DotIcon } from '@/public/icons';
import MenuButton from './menuSidebar/MenuButton';
import SortMethodBtn from './SortMethodBtn';

export default function AppHeader({ listConfig, className }) {
   const { bgColor, listName, listIcon } = listConfig;

   return (
      <div
         className={`${className}`}
         style={{ backgroundColor: bgColor[0], opacity: 0.99 }}
      >
         <MenuButton
            className='mt-6 -translate-x-1 -translate-y-1'
            color={bgColor[3]}
         />

         <div className='flex justify-between items-center sm:mt-10'>
            <h1
               className='text-2xl font-medium flex gap-3 items-center '
               style={{ color: bgColor[3] }}
            >
               {listIcon}
               {listName}
            </h1>

            <SortMethodBtn bgColor={bgColor[3]} />
         </div>

         {listName === 'My Day' && (
            <span className='text-xs' style={{ color: bgColor[4] }}>
               Friday, January 10
            </span>
         )}
      </div>
   );
}
