import { TrashIcon } from '@/public/icons';
import { useState } from 'react';

export default function DeleteBtn({ onClick, className, bgColor }) {
   const [hover, setHover] = useState(false);

   return (
      <button
         onClick={onClick}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         className={`p-1 rounded-sm flex items-center justify-center hover:bg-gray-300 ${className}`}
         style={{
            backgroundColor: hover ? bgColor.buttonHover : 'transparent',
         }}
      >
         <TrashIcon />
      </button>
   );
}
