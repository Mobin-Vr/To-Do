import { CalendarIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import AddDueModal from '../EditSidebar/remiderBoxModals/AddDueModal';
import ModalTemplate from '../ModalTemplate';
import InputBtnTempl from './InputBtnTempl';
import ModalTemplateCloseAble from '../ModalTemplateCloseAble';
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
            icon={<CalendarIcon size='16px' color='#222' />}
            onClick={toggleModal}
         />

         <ModalTemplate
            parentRef={AddDueRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='bottom-[5.3rem] right-6 w-auto text-xs font-normal'
         >
            <AddDueModal
               updateDueDate={setTaskDueDate}
               toggleModal={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplate>

         <ModalTemplateCloseAble
            isModalOpen={isDatePickerModalOpen}
            toggleModal={toggleModalDatePicker}
            className='bottom-[5.3rem] right-6 w-auto text-xs font-normal'
         >
            <DatePickerModal
               updateDueDate={setTaskDueDate}
               toggleModal={toggleModalDatePicker}
               isForTaskInput={true}
            />
         </ModalTemplateCloseAble>
      </div>
   );
}
