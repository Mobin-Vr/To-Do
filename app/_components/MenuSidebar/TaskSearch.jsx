import { MagnifierIcon, XIcon } from '@/public/icons';
import { useRouter } from 'next/navigation';

const { useState, useEffect } = require('react');

export default function TaskSearch() {
   const [searchInput, setSearchInput] = useState('');
   const [isTyping, setIsTyping] = useState(false);
   const router = useRouter();

   useEffect(() => {
      if (searchInput) {
         router.push(
            `/tasks/search?query=${encodeURIComponent(searchInput)}`,
            undefined,
            { shallow: true }
         );
      }
   }, [searchInput, router]);

   function handleFocus() {
      setIsTyping(true);
   }

   function handleBlur() {
      setIsTyping(false);
   }

   function handleClearInputs(e) {
      e.preventDefault();
      setSearchInput('');
   }

   return (
      <div
         className={`h-[1.875rem] w-full mb-3 z-10 border border-1 border-gray-200 rounded-md overflow-hidden border-b-[2px] border-b-gray-300 ${
            isTyping ? 'border-b-[2.5px] border-b-blue-600' : ''
         }`}
      >
         <form className='flex items-center h-full relative w-full'>
            <div className='absolute right-2 cursor-pointer flex gap-1  items-center'>
               <button
                  className='rounded-md h-4 w-4 flex items-center justify-center hover:bg-gray-200'
                  onClick={handleClearInputs}
               >
                  {searchInput && <XIcon />}
               </button>

               <button className='rounded-md h-4 w-4 flex items-center justify-center hover:bg-gray-200'>
                  <MagnifierIcon />
               </button>
            </div>

            <input
               type='text'
               placeholder='Search'
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
               onFocus={handleFocus}
               onBlur={handleBlur}
               className={`p-2 pr-14 pl-4 text-sm font-light outline-none w-full h-full placeholder-gray-500 ${
                  isTyping ? '' : ''
               }`}
               style={{ minWidth: '0', flex: 1 }}
            />
         </form>
      </div>
   );
}
