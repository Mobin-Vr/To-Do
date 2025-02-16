import { toast } from 'react-hot-toast';
import { useCallback } from 'react';

export default function useCustomToast() {
   const showToast = useCallback((message, icon = '') => {
      toast.custom((t) => (
         <div
            className={`${
               t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md shadow-lg rounded-md pointer-events-auto flex ring-1 ring-gray-600 ring-opacity-10 px-4 py-2 w-fit items-center gap-2 font-normal`}
            style={{
               background: '#dfedf7',
            }}
         >
            <span className='mt-1'>{icon}</span>
            <p className='mt-1 text-sm text-blue-700'>{message}</p>
         </div>
      ));
   }, []);

   return showToast;
}
