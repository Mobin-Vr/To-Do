import { useState } from 'react';
import {
   CalendarIcon,
   PaperClipIcon,
   RepeatIcon,
   XIcon,
   ClockIcon,
   SunIcon,
} from '@/public/icons';
import { DEFAULT_COLOR } from '@/app/_lib/utils';

const iconsMap = {
   ClockIcon,
   SunIcon,
   CalendarIcon,
   RepeatIcon,
   PaperClipIcon,
};

export default function BoxBtn({
   text,
   size,
   activeText,
   icon,
   disabled = false,
   toggleModal,
   weekday,
   isDateSet,
   clearDate,
}) {
   const Icon = iconsMap[icon];

   const iconColor = isDateSet ? DEFAULT_COLOR.blue : DEFAULT_COLOR.current;
   const textColor = isDateSet ? 'text-blue-700' : '';

   return (
      <div className='flex font-normal justify-between items-center text-gray-600 relative'>
         <button
            disabled={disabled}
            onClick={toggleModal}
            className={`flex px-3 gap-4 w-full items-center ${
               disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-50'
            }`}
         >
            {Icon && (
               <span>
                  <Icon color={iconColor} size={size ? size : '14px'} />
               </span>
            )}
            <div className='flex flex-col mt-1 h-10 justify-center leading-tight'>
               <span className={`${textColor} text-[0.78rem] font-normal cap`}>
                  {isDateSet ? activeText : text}
               </span>
               {isDateSet && (
                  <span className='text-start text-[0.72rem] text-gray-500'>
                     {weekday}
                  </span>
               )}
            </div>
         </button>

         {isDateSet && !disabled && (
            <button
               onClick={clearDate}
               className='p-3 h-full aspect-square flex justify-center items-center rounded-sm hover:bg-accent-50 transition-all duration-300'
            >
               <XIcon />
            </button>
         )}
      </div>
   );
}
