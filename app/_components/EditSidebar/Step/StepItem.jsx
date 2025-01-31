/* 
   We used 'closest' instead of 'ref' because 'ref' can sometimes fail to detect clicks, especially if React hasn't updated the DOM yet. 
   'closest' allows us to check if the clicked element is inside a specific DOM element, which is more reliable for handling outside clicks, 
   ensuring the sidebar closes properly when clicked outside, regardless of React's DOM state.
*/

import { DotIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import StepCompleteBtn from './StepCompleteBtn';
import StepTitleEditor from './StepTitleEditor';
import ModalTemplate from '../../_ui/ModalTemplate';
import StepActionModal from './StepActionModal';

export default function StepItem({ step, task }) {
   const stepRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div className='relative'>
         <li
            ref={stepRef}
            className='flex items-center justify-center bg-accent-50 rounded-md overflow-hidden border border-1 border-gray-200'
         >
            <StepCompleteBtn
               taskId={task.task_id}
               step={step}
               className='ml-1'
            />
            <StepTitleEditor step={step} taskId={task.task_id} />

            <button
               onClick={toggleModal}
               className='transform rotate-90 aspect-square h-7 flex justify-center items-center rounded-md mr-0.5 hover:bg-accent-200'
            >
               <DotIcon size='10px' />
            </button>

            <ModalTemplate
               parentRef={stepRef}
               isModalOpen={isModalOpen}
               toggleModal={toggleModal}
               className='top-12 left-1/2 -translate-x-1/2 w-56 text-xs font-normal'
            >
               <StepActionModal task={task} step={step} />
            </ModalTemplate>
         </li>
      </div>
   );
}
