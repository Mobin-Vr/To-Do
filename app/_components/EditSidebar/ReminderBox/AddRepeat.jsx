import { getWeekendForWeekdays, isWeekday } from '@/app/_lib/utils';
import useTaskStore from '@/app/taskStore';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import ModalTemplate from '../../_ui/ModalTemplate';
import BoxBtn from '../BoxBtn';
import AddRepeatModal from '../remiderBoxModals/AddRepeatModal';

export default function AddRepeat({ task }) {
   const repeatRef = useRef(null);
   const { updateRepeat, updateDueDate } = useTaskStore(
      useShallow((state) => ({
         updateRepeat: state.updateRepeat,
         updateDueDate: state.updateDueDate,
      }))
   );
   const [isModalOpen, setIsModalOpen] = useState(false);

   const hasRepeat = task.task_repeat ? true : false;
   const activeText = task.task_repeat;

   const toggleModal = () => setIsModalOpen(!isModalOpen);
   const removeRepeat = () => updateRepeat(task.task_id, null);

   useEffect(() => {
      if (task.task_repeat === 'Weekdays' && !isWeekday(task.task_due_date)) {
         const nearestFridy = getWeekendForWeekdays(task.task_due_date);
         updateDueDate(task.task_id, nearestFridy);
      }
   }, [task.task_repeat]);

   return (
      <div ref={repeatRef} className=''>
         <BoxBtn
            text='Repeat'
            activeText={activeText}
            icon='RefreshCw'
            size='18px'
            toggleModal={toggleModal}
            clearDate={removeRepeat}
            isDateSet={hasRepeat}
         />

         <ModalTemplate
            parentRef={repeatRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='left-1/2 -translate-x-1/2 w-56 text-xs font-normal'
         >
            <AddRepeatModal
               task={task}
               updateRepeat={updateRepeat}
               updateDueDate={updateDueDate} // for some bug fixes of clicking again on weekdays (repeat) and update the due date if its not a weekday
            />
         </ModalTemplate>
      </div>
   );
}
