import {
   AlphabetIcon,
   StarIcon,
   TimerCalendarIcon,
   TodayCalendarIcon,
} from '@/public/icons';
import { ModalActionButton } from './EditSidebar/remiderBoxModals/ModalActionBtn';

export default function SortMethodModal({ setSortMethod }) {
   // update store (id, dueDate)
   function handleSelect(sortMethod) {
      setSortMethod(sortMethod);
   }

   return (
      <>
         <ModalActionButton
            label='Sort Method'
            className='border-b border-gray-100 text-gray-800 hover:bg-inherit cursor-default'
         />

         <ModalActionButton
            icon={<StarIcon size='16px' />}
            label='Importance'
            onClick={() => handleSelect('importance')}
         />

         <ModalActionButton
            icon={<TimerCalendarIcon size='16px' />}
            label='Due date'
            onClick={() => handleSelect('dueDate')}
         />

         <ModalActionButton
            icon={<TodayCalendarIcon size='16px' />}
            label='Creation date'
            onClick={() => handleSelect('creationDate')}
         />

         <ModalActionButton
            icon={<AlphabetIcon size='16px' />}
            label='Alphabetically'
            onClick={() => handleSelect('alphabet')}
         />
      </>
   );
}
