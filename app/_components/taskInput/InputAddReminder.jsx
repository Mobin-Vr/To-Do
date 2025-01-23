import { ClockIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import AddReminderModal from '../EditSidebar/remiderBoxModals/AddReminderModal';
import ModalTemplate from '../ModalTemplate';
import InputBtnTempl from './InputBtnTempl';
import ModalTemplateCloseAble from '../ModalTemplateCloseAble';
import DateTimePickerModal from '../EditSidebar/remiderBoxModals/DateTimePickerModal';

export default function InputAddReminder({ setTaskReminder, className }) {
   const AddReminder = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   const toggleModalDatePicker = () =>
      setIsDatePickerModalOpen(!isDatePickerModalOpen);

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
               toggleModalDatePicker={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplate>

         <ModalTemplateCloseAble
            isModalOpen={isDatePickerModalOpen}
            toggleModal={toggleModalDatePicker}
            className='bottom-[5.3rem] right-6 w-auto text-xs font-normal'
         >
            <DateTimePickerModal
               updateReminder={setTaskReminder}
               toggleModal={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplateCloseAble>
      </div>
   );
}
