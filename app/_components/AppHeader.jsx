import { DotIcon } from '@/public/icons';

export default function AppHeader({ bgColor }) {
   return (
      <div
         className={`px-6 pt-12 sticky top-0 h-36 z-10`}
         style={{ backgroundColor: bgColor, opacity: 0.99 }}
      >
         <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-medium text-gray-600'>My Day</h1>
            <button>
               <DotIcon />
            </button>
         </div>
         <span className='text-xs text-gray-500'>Friday, January 10</span>
      </div>
   );
}
