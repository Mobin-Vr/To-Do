import { DotIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import ModalTemplateCloseAble from '../../_ui/ModalTemplateCloseAble';
import StepActionModal from './StepActionModal';
import StepCompleteBtn from './StepCompleteBtn';
import StepTitleEditor from './StepTitleEditor';

export default function StepItem({ step, task, bgColor }) {
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
               bgColor={bgColor}
            />
            <StepTitleEditor step={step} taskId={task.task_id} />

            <button
               onClick={toggleModal}
               className='transform rotate-90 aspect-square h-7 flex justify-center items-center rounded-md mr-0.5 hover:bg-accent-200'
            >
               <DotIcon size='10px' />
            </button>

            <ModalTemplateCloseAble
               parentRef={stepRef}
               isModalOpen={isModalOpen}
               toggleModal={toggleModal}
               justify='-50%'
               className='left-1/2 top-10 w-56 text-xs font-normal'
            >
               <StepActionModal task={task} step={step} />
            </ModalTemplateCloseAble>
         </li>
      </div>
   );
}
