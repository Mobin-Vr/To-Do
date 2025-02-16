import { TrashIcon } from '@/public/icons';

export default function DeleteBtn({ onClick, className }) {
   return (
      <button
         onClick={onClick}
         className={`p-1 rounded-md flex items-center justify-center hover:bg-sidebar-hover  ${className}`}
      >
         <TrashIcon />
      </button>
   );
}
