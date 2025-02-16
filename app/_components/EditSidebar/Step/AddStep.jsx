import { generateNewUuid, getDateNowIso } from '@/app/_lib/utils';
import useTaskStore from '@/app/taskStore';
import { CircleIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function AddStep({ task }) {
   const addStep = useTaskStore((state) => state.addStep);

   const [stepInput, setStepInput] = useState('');
   const [isTyping, setIsTyping] = useState(false);

   // const steps = task.task_steps || []; // LATER this or :
   if (!task.task_steps) return;

   function handleSubmit(e) {
      e.preventDefault();
      if (stepInput.trim() === '') return;

      const newStep = {
         step_id: generateNewUuid(),
         step_title: stepInput,
         step_completed_at: null,
         step_created_at: getDateNowIso(),
         is_step_completed: false,
      };

      addStep(task.task_id, newStep);
      setStepInput('');
   }

   function handleFocus() {
      setIsTyping(true);
   }

   function handleBlur() {
      setIsTyping(false);
   }

   return (
      <form
         className='flex items-center relative w-full z-10 rounded-md overflow-hidden text-sm gap-2'
         onSubmit={handleSubmit}
      >
         <span className='cursor-default ml-1.5 text-center'>
            {isTyping ? (
               <CircleIcon size='15px' />
            ) : (
               <PlusIcon color='#1d4ed8' size='15px' />
            )}
         </span>

         <input
            type='text'
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`text-sm font-light bg-inherit outline-none w-full rounded-md text-start hover:bg-sidebar-hover focus:bg-white p-2 pl-0 ${
               isTyping ? 'placeholder-gray-500' : 'placeholder-blue-700'
            }`}
            placeholder={
               task.task_steps.length > 0 ? `Add next step` : 'Add step'
            }
         />
      </form>
   );
}
