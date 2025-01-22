import { ClockIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import AddReminderModal from '../EditSidebar/remiderBoxModals/AddReminderModal';
import ModalTemplate from '../ModalTemplate';
import InputBtnTempl from './InputBtnTempl';

export default function InputAddReminder({ setTaskReminder, className }) {
   const AddReminder = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div ref={AddReminder}>
         <InputBtnTempl
            className={`${className}`}
            icon={<ClockIcon size='16px' color='#222' />}
            onClick={toggleModal}
         />

         <ModalTemplate
            parentRef={AddReminder}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='bottom-[5.3rem] right-6 w-auto text-xs font-normal'
         >
            <AddReminderModal
               updateReminder={setTaskReminder}
               isForTaskInput={true}
            />
         </ModalTemplate>
      </div>
   );
}
