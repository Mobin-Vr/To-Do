import { MagnifierIcon, XIcon } from '@/public/icons';

const { useState } = require('react');

export default function TaskSearch() {
   const [searchInput, setSearchInput] = useState('');
   const [isTyping, setIsTyping] = useState(false);

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
         className={`h-[1.875rem] w-full mb-3 z-10 border border-1  border-gray-200 rounded-md overflow-hidden border-b-[1.5px] border-b-gray-500 ${
            isTyping ? 'border-b-2 border-b-blue-500' : ''
         }`}
      >
         <form
            className='flex items-center h-full relative'
            // onSubmit={handleSubmit}
         >
            <div className='absolute right-2 cursor-pointer flex gap-2 items-center'>
               <button onClick={handleClearInputs}>
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
               className={`p-2 pr-8 text-sm font-light outline-none w-full h-full placeholder-gray-800 ${
                  isTyping ? '' : ''
               }`}
            />
         </form>
      </div>
   );
}
