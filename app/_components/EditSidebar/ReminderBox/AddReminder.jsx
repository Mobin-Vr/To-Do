import { getRelativeDay } from '@/app/_lib/utils';
import useTaskStore from '@/app/store';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import ModalTemplate from '../../_ui/ModalTemplate';
import ModalTemplateCloseAble from '../../_ui/ModalTemplateCloseAble';
import BoxBtn from '../BoxBtn';
import AddReminderModal from '../RemiderBoxModals/AddReminderModal';
import DateTimePickerModal from '../remiderBoxModals/DateTimePickerModal';

export default function AddReminder({ task }) {
   const AddReminder = useRef(null);
   const updateReminder = useTaskStore((state) => state.updateReminder);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

   const hasReminder = task.reminder ? true : false;
   const activeText = `Remind me at ${format(task.reminder, 'HH:mm')}`;

   const relativeDay = getRelativeDay(task.reminder);
   const weekday = relativeDay ? format(task.reminder, 'EEE') : relativeDay;

   const removeReminder = () => updateReminder(task.id, null);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   const toggleModalDatePicker = () =>
      setIsDatePickerModalOpen(!isDatePickerModalOpen);

   return (
      <div ref={AddReminder} className=''>
         <BoxBtn
            text='Remind me'
            activeText={activeText}
            icon='ClockIcon'
            size='18px'
            weekday={weekday}
            isDateSet={hasReminder}
            toggleModal={toggleModal}
            clearDate={removeReminder}
         />

         <ModalTemplate
            parentRef={AddReminder}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='left-1/2 -translate-x-1/2 w-56 text-xs font-normal'
         >
            <AddReminderModal
               toggleModalDatePicker={toggleModalDatePicker}
               updateReminder={updateReminder}
               task={task}
            />
         </ModalTemplate>

         <ModalTemplateCloseAble
            isModalOpen={isDatePickerModalOpen}
            toggleModal={toggleModalDatePicker}
            className='bottom-12 left-1/2 -translate-x-1/2 w-auto text-xs font-normal'
         >
            <DateTimePickerModal
               updateReminder={updateReminder}
               toggleModal={toggleModalDatePicker}
               task={task}
            />
         </ModalTemplateCloseAble>
      </div>
   );
}
