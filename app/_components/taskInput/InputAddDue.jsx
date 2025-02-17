import { CalendarIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import AddDueModal from '../EditSidebar/remiderBoxModals/AddDueModal';
import ModalTemplate from '../_ui/ModalTemplate';
import InputBtnTempl from '../_ui/InputBtnTempl';
import ModalTemplateCloseAble from '../_ui/ModalTemplateCloseAble';
import DatePickerModal from '../EditSidebar/remiderBoxModals/DatePickerModal';

export default function InputAddDue({ setTaskDueDate, className }) {
   const AddDueRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   const toggleModalDatePicker = () =>
      setIsDatePickerModalOpen(!isDatePickerModalOpen);

   return (
      <div ref={AddDueRef}>
         <InputBtnTempl
            className={`${className}`}
            icon={<CalendarIcon />}
            onClick={toggleModal}
         />

         <ModalTemplateCloseAble
            parentRef={AddDueRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='bottom-[3rem] -right-3.5 w-auto text-xs font-normal'
         >
            <AddDueModal
               updateDueDate={setTaskDueDate}
               toggleModal={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplateCloseAble>

         <ModalTemplate
            isModalOpen={isDatePickerModalOpen}
            toggleModal={toggleModalDatePicker}
            className='bottom-[3rem] -right-3.5 w-auto text-xs font-normal'
         >
            <DatePickerModal
               updateDueDate={setTaskDueDate}
               toggleModal={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplate>
      </div>
   );
}
