import { ArrowIcon } from '@/public/icons';

export default function CompletedToggle({
   isCompletedVisible,
   completedCount,
   onClick,
   bgColor,
}) {
   return (
      <div
         onClick={onClick}
         className='h-8 text-sm font-normal text-gray-700 bg-accent-100 hover:bg-white rounded-md p-2 my-2 flex items-center gap-1 w-fit cursor-pointer select-none'
         style={{ color: bgColor[3] }}
      >
         <span
            className={`transition-transform duration-300 flex items-center ${
               isCompletedVisible ? 'rotate-90' : ''
            }`}
         >
            <ArrowIcon color={bgColor[3]} />
         </span>
         <p>Completed</p>
         <span className='ml-1'>{completedCount}</span>
      </div>
   );
}
