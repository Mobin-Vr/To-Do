import { CalendarIcon, ClockIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import AddReminderModal from '../EditSidebar/remiderBoxModals/AddReminderModal';
import ModalTemplate from '../ModalTemplate';
import InputBtnTempl from './InputBtnTempl';
import AddDueModal from '../EditSidebar/remiderBoxModals/AddDueModal';

export default function InputAddDue({ setTaskDueDate, className }) {
   const AddDueRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div ref={AddDueRef}>
         <InputBtnTempl
            className={`${className}`}
            icon={<CalendarIcon size='16px' color='#222' />}
            onClick={toggleModal}
         />

         <ModalTemplate
            parentRef={AddDueRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='bottom-[5.3rem] right-6 w-auto text-xs font-normal'
         >
            <AddDueModal updateDueDate={setTaskDueDate} isForTaskInput={true} />
         </ModalTemplate>
      </div>
   );
}
