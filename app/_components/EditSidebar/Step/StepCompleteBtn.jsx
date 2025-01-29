import useTaskStore from '@/app/taskStore';
import { CircleIcon, CompletedIcon, TickCircleIcon } from '@/public/icons';

export default function StepCompleteBtn({ taskId, step, className }) {
   const updateStep = useTaskStore((state) => state.updateStep);

   function handleCompleteBtn() {
      updateStep(taskId, step.id, { isCompleted: !step.isCompleted });
   }

   return (
      <button
         onClick={handleCompleteBtn}
         className={`group bg-transparent relative transition-all cursor-default duration-300 ease-in-out ${className} ${
            step.isCompleted
               ? 'line-through text-gray-300 decoration-gray-300 decoration-2'
               : ''
         }`}
      >
         {step.isCompleted ? (
            <CompletedIcon size='16px' />
         ) : (
            <>
               <span className='block group-hover:hidden'>
                  <CircleIcon size='16px' />
               </span>

               <span className='hidden group-hover:block'>
                  <TickCircleIcon size='16px' />
               </span>
            </>
         )}
      </button>
   );
}
