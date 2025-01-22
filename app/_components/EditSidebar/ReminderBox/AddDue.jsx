import { getRelativeDay } from '@/app/_lib/utils';
import useTaskStore from '@/app/store';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import ModalTemplateCloseAble from '../../ModalTemplateCloseAble';
import BoxBtn from '../BoxBtn';
import AddDueModal from '../remiderBoxModals/AddDueModal';
import ModalTemplate from '../../ModalTemplate';
import DatePickerModal from '../remiderBoxModals/DatePickerModal';

export default function AddDue({ task }) {
   const AddDueRef = useRef(null);
   const updateDueDate = useTaskStore((state) => state.updateDueDate);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

   const hasDueDate = task.dueDate ? true : false;
   const relativeDay = getRelativeDay(task.dueDate);
   const activeText = `Due ${
      relativeDay ? relativeDay : format(task.dueDate, 'MMM, dd')
   }`;

   const toggleModal = () => setIsModalOpen(!isModalOpen);
   const toggleModalDatePicker = () =>
      setIsDatePickerModalOpen(!isDatePickerModalOpen);
   const removeDueDate = () => updateDueDate(task.id, null);

   return (
      <div ref={AddDueRef} className='relative'>
         <BoxBtn
            text='Add due date'
            activeText={activeText}
            icon='CalendarIcon'
            size='18px'
            isDateSet={hasDueDate}
            toggleModal={toggleModal}
            clearDate={removeDueDate}
         />

         <ModalTemplate
            parentRef={AddDueRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='top-12 left-1/2 -translate-x-1/2 w-56 text-xs font-normal'
         >
            <AddDueModal
               toggleModal={toggleModalDatePicker}
               updateDueDate={updateDueDate}
               task={task}
            />
         </ModalTemplate>

         <ModalTemplateCloseAble
            parentRef={AddDueRef}
            isModalOpen={isDatePickerModalOpen}
            toggleModal={toggleModalDatePicker}
            className='top-12 left-1/2 -translate-x-1/2 w-auto text-xs font-normal'
         >
            <DatePickerModal
               updateDueDate={updateDueDate}
               toggleModal={toggleModalDatePicker}
               task={task}
            />
         </ModalTemplateCloseAble>
      </div>
   );
}
