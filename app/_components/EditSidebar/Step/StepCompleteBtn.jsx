import useTaskStore from '@/app/store';
import { CompletedIcon, TickCircleIcon } from '@/public/icons';
import { CircleIcon } from 'lucide-react';

export default function StepCompleteBtn({
   taskId,
   step,
   compBtnRef,
   className,
}) {
   const updateStep = useTaskStore((state) => state.updateStep);

   function handleCompleteBtn() {
      updateStep(taskId, step.id, { isCompleted: !step.isCompleted });
   }

   return (
      <button
         //  ref={compBtnRef}
         onClick={handleCompleteBtn}
         className={`group bg-transparent relative transition-all cursor-default duration-300 ease-in-out ${className} ${
            step.isCompleted
               ? 'line-through text-gray-300 decoration-gray-300 decoration-2'
               : ''
         }`}
      >
         {step.isCompleted ? (
            <CompletedIcon size='15px' />
         ) : (
            <>
               <span className='block group-hover:hidden'>
                  <CircleIcon size='15px' />
               </span>

               <span className='hidden group-hover:block'>
                  <TickCircleIcon size='15px' />
               </span>
            </>
         )}
      </button>
   );
}
