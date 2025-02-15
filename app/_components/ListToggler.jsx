import { useState } from 'react';
import { ArrowIcon } from '@/public/icons';

export default function ListToggler({
   isVisible,
   completedCount,
   onClick,
   bgColor,
   TogglerName,
}) {
   const [bg, setBg] = useState(bgColor.toggleBackground);

   return (
      <div
         onClick={onClick}
         onMouseEnter={() => setBg(bgColor.toggleHover)}
         onMouseLeave={() => setBg(bgColor.toggleBackground)}
         className='h-8 text-sm font-normal rounded-md p-2 my-2 flex items-center gap-1 w-fit cursor-pointer select-none transition-colors duration-200'
         style={{
            backgroundColor: bg,
            color: bgColor.toggleText,
         }}
      >
         <span
            className={`transition-transform duration-300 flex items-center ${
               isVisible ? 'rotate-90' : ''
            }`}
         >
            <ArrowIcon color={bgColor.toggleText} />
         </span>
         <p>{TogglerName}</p>
         <span className='ml-1'>{completedCount}</span>
      </div>
   );
}
