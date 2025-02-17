import { CircleIcon, CompletedIcon, TickCircleIcon } from '@/public/icons';
import useTaskStore from '../../taskStore';

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
         onClick={handleCompleteClick}
         className={`group bg-transparent relative transition-all cursor-default duration-200 ease-in-out ${className}`}
      >
         {task.is_task_completed ? (
            <div style={{ color: bgColor.iconSecondaryColor }}>
               <CompletedIcon />
            </div>
         ) : (
            <>
               <span
                  className='block group-hover:hidden'
                  style={{ color: bgColor.ternaryText }}
               >
                  <CircleIcon />
               </span>

               <span
                  className='hidden group-hover:block'
                  style={{ color: bgColor.iconSecondaryColor }}
               >
                  <TickCircleIcon />
               </span>
            </>
         )}
      </button>
   );
}
