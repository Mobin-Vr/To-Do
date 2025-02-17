import { BellIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import InputBtnTempl from '../_ui/InputBtnTempl';
import ModalTemplate from '../_ui/ModalTemplate';
import ModalTemplateCloseAble from '../_ui/ModalTemplateCloseAble';
import AddReminderModal from '../EditSidebar/remiderBoxModals/AddReminderModal';
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
            icon={<BellIcon />}
            onClick={toggleModal}
         />

         <ModalTemplateCloseAble
            parentRef={AddReminder}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='bottom-[3rem] -right-3.5 w-auto text-xs font-normal'
         >
            <AddReminderModal
               updateReminder={setTaskReminder}
               toggleModalDatePicker={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplateCloseAble>

         <ModalTemplate
            isModalOpen={isDatePickerModalOpen}
            toggleModal={toggleModalDatePicker}
            className='bottom-[3rem] -right-3.5 w-auto text-xs font-normal'
         >
            <DateTimePickerModal
               updateReminder={setTaskReminder}
               toggleModal={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplate>
      </div>
   );
}
