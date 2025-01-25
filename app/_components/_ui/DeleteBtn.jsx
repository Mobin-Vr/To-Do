import { TrashIcon } from '@/public/icons';

export default function DeleteBtn({ onClick, className }) {
   return (
      <button
         onClick={onClick}
         className={`p-1 rounded-sm flex items-center justify-center hover:bg-gray-300 ${className}`}
      >
         <TrashIcon />
      </button>
   );
}
