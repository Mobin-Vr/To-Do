import { useEffect, useRef, useState } from 'react';
import ModalTemplate from '../../ModalTemplate';
import BoxBtn from '../BoxBtn';
import AddRepeatModal from '../remiderBoxModals/AddRepeatModal';
import useTaskStore from '@/app/store';
import { getWeekendForWeekdays, isWeekday } from '@/app/_lib/utils';
import { useShallow } from 'zustand/react/shallow';

export default function AddRepeat({ task }) {
   const repeatRef = useRef(null);
   const { updateRepeat, updateDueDate } = useTaskStore(
      useShallow((state) => ({
         updateRepeat: state.updateRepeat,
         updateDueDate: state.updateDueDate,
      }))
   );
   const [isModalOpen, setIsModalOpen] = useState(false);

   const hasRepeat = task.repeat ? true : false;
   const activeText = task.repeat;

   const toggleModal = () => setIsModalOpen(!isModalOpen);
   const removeRepeat = () => updateRepeat(task.id, null);

   useEffect(() => {
      if (task.repeat === 'Weekdays' && !isWeekday(task.dueDate)) {
         const nearestFridy = getWeekendForWeekdays(task.dueDate);
         updateDueDate(task.id, nearestFridy);
      }
   }, [task.repeat]);

   return (
      <div ref={repeatRef} className='relative'>
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
            className='top-12 left-1/2 -translate-x-1/2 w-56 text-xs font-normal'
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
