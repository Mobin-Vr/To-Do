import { generateNewUuid, getDateNowIso } from '@/app/_lib/utils';
import useTaskStore from '@/app/store';
import { CircleIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function AddStep({ className, taskId }) {
   const addStep = useTaskStore((state) => state.addStep);

   const [stepInput, setStepInput] = useState('');
   const [isTyping, setIsTyping] = useState(false);

   function handleSubmit(e) {
      e.preventDefault();
      if (stepInput.trim() === '') return;

      const newStep = {
         id: generateNewUuid(),
         title: stepInput,
         isCompleted: false,
         completedAt: null,
         createdAt: getDateNowIso(),
      };

      addStep(taskId, newStep);
      setStepInput('');
   }

   function handleFocus() {
      setIsTyping(true);
   }

   function handleBlur() {
      setIsTyping(false);
   }

   return (
      <div className={`${className} flex`}>
         <button className='cursor-pointer text-lg'>
            {isTyping ? <CircleIcon size='15px' /> : <PlusIcon size='16px' />}
         </button>

         <form
            className='flex items-center relative h-[2.9rem] w-full z-10 rounded-md overflow-hidden text-sm text-blue-700 gap-2'
            onSubmit={handleSubmit}
         >
            <input
               type='text'
               value={stepInput}
               onChange={(e) => setStepInput(e.target.value)}
               onFocus={handleFocus}
               onBlur={handleBlur}
               className={`text-sm font-light outline-none w-full h-full rounded-sm py-2 px-1 text-start hover:bg-accent-50 ${
                  isTyping ? 'placeholder-gray-500' : 'placeholder-gray-800'
               }`}
               placeholder={isTyping ? `Add next step` : 'Add step'}
            />
         </form>
      </div>
   );
}
