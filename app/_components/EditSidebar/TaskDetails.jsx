import { SunIcon, XIcon } from '@/public/icons';
import BoxTemplate from './BoxTemplate';
import CompleteButton from '../CompleteButton';
import StarButton from '../StarButton';
import Step from './Step';
import TaskDescription from '../TaskDescription';
import { DEFAULT_COLOR } from '@/app/_lib/utils';

export default function TaskDetails({ task }) {
   return (
      <>
         <BoxTemplate className='p-3'>
            <div className='flex justify-between items-center mb-2'>
               <div className='flex items-center'>
                  <CompleteButton task={task} className='complete-btn' />
                  <TaskDescription task={task} />
               </div>
               <StarButton task={task} className='star-btn' />
            </div>
            <Step className='px-1' />
         </BoxTemplate>

         <BoxTemplate className='flex p-3 font-light justify-between items-center relative'>
            <div className='flex gap-2'>
               <SunIcon color={DEFAULT_COLOR.blue} />
               <span className='text-blue-500'>Added to My Day</span>
            </div>
            <button className='absolute right-0 h-full aspect-square flex justify-center items-center rounded-sm hover:bg-accent-50 transition-all duration-300'>
               <XIcon />
            </button>
         </BoxTemplate>
      </>
   );
}
