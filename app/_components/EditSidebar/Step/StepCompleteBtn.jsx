import useTaskStore from '@/app/taskStore';
import { CircleIcon, CompletedIcon, TickCircleIcon } from '@/public/icons';

const btnStyles = `
   .btnStyles {
      color: var(--default-text-color);
   }

   .btnStyles:hover {
      color: var(--hover-text-color);
   }
`;

export default function StepCompleteBtn({ taskId, step, className, bgColor }) {
   const updateStep = useTaskStore((state) => state.updateStep);

   function handleCompleteBtn() {
      updateStep(taskId, step.step_id, {
         is_step_completed: !step.is_step_completed,
      });
   }

   return (
      <button
         onClick={handleCompleteBtn}
         style={{ '--hover-text-color': bgColor.iconColor }}
         className={`btnStyles group bg-transparent relative transition-all cursor-default duration-300 ease-in-out ${className}`}
      >
         {step.is_step_completed ? (
            <span
               className='btnStyles'
               style={{ '--default-text-color': bgColor.iconColor }}
            >
               <CompletedIcon size='16' />
            </span>
         ) : (
            <>
               <span className='block group-hover:hidden'>
                  <CircleIcon size='16' />
               </span>

               <span className='hidden group-hover:block'>
                  <TickCircleIcon size='16' />
               </span>
            </>
         )}

         <style>{btnStyles}</style>
      </button>
   );
}
