import { DEFAULT_COLOR } from '@/app/_lib/utils';
import BoxTemplate from './BoxTemplate';
import { SunIcon, XIcon } from '@/public/icons';

function AddCategory() {
   return (
      <BoxTemplate className='flex p-3 font-light justify-between items-center relative'>
         <div className='flex gap-2'>
            <SunIcon color={DEFAULT_COLOR.blue} />
            <span className='text-blue-500'>Added to My Day</span>
         </div>

         <button className='absolute right-0 h-full aspect-square flex justify-center items-center rounded-sm hover:bg-accent-50 transition-all duration-300'>
            <XIcon />
         </button>
      </BoxTemplate>
   );
}

export default AddCategory;
