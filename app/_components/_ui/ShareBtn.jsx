import { ShareIcon } from '@/public/icons';

export default function ShareBtn({ onClick }) {
   return (
      <button
         onClick={onClick}
         className='p-1 rounded-sm flex items-center justify-center hover:bg-gray-300'
      >
         <ShareIcon />
      </button>
   );
}
