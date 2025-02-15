import { CircleIcon, CompletedIcon, TickCircleIcon } from '@/public/icons';
import useTaskStore from '../../taskStore';

const btnStyles = `
   .btnStyles {
      color: var(--default-text-color);
   }

   .btnStyles:hover {
      color: var(--hover-text-color);
   }
`;

export default function CompleteBtn({ task, className, bgColor }) {
   const toggleCompleted = useTaskStore((state) => state.toggleCompleted);

   const handleCompleteClick = () => {
      if (!task.is_task_completed) {
         const dingSound = new Audio('/success-sound.mp3');
         dingSound
            .play()
            .catch((error) => console.error('Failed to play sound:', error));
      }
      toggleCompleted(task.task_id);
   };

   return (
      <button
         style={{ '--hover-text-color': bgColor.iconColor }}
         onClick={handleCompleteClick}
         className={`btnStyles group bg-transparent relative transition-all cursor-default duration-200 ease-in-out ${className}`}
      >
         {task.is_task_completed ? (
            <div className='btnStyles' style={{ color: bgColor.iconColor }}>
               <CompletedIcon />
            </div>
         ) : (
            <>
               <span className='block group-hover:hidden'>
                  <CircleIcon />
               </span>

               <span className='hidden group-hover:block'>
                  <TickCircleIcon />
               </span>
            </>
         )}

         <style>{btnStyles}</style>
      </button>
   );
}
