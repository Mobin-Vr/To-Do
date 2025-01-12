import { ArrowIcon } from '@/public/icons';

export default function CompletedToggle({
   isCompletedVisible,
   completedCount,
   onClick,
}) {
   return (
      <div
         onClick={onClick}
         className='h-6 text-xs font-normal text-gray-700 bg-accent-100 hover:bg-white rounded-md p-2 my-2 flex items-center gap-1 w-fit cursor-pointer select-none'
      >
         <span
            className={`transition-transform duration-300 ${
               isCompletedVisible ? 'rotate-90' : ''
            }`}
         >
            <ArrowIcon />
         </span>
         <p>Completed</p>
         <span className='ml-1'>{completedCount}</span>
      </div>
   );
}
