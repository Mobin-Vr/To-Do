import {
   AlphabetIcon,
   StarIcon,
   PickReminderIcon,
   TodayCalendarIcon,
   CalendarIcon,
   SortIcon,
   CreationDateIcon,
} from '@/public/icons';
import { ModalActionButton } from '../EditSidebar/remiderBoxModals/ModalActionBtn';

export default function SortMethodModal({ setSortMethod }) {
   // update store (id, dueDate)
   function handleSelect(sortMethod) {
      setSortMethod(sortMethod);
   }

   return (
      <>
         <ModalActionButton
            label='Sort by'
            className='border-b border-gray-100 text-gray-800 hover:bg-inherit cursor-default font-semibold'
         />

         <ModalActionButton
            icon={<StarIcon />}
            label='Importance'
            onClick={() => handleSelect('importance')}
         />

         <ModalActionButton
            icon={<CalendarIcon />}
            label='Due date'
            onClick={() => handleSelect('dueDate')}
         />

         <ModalActionButton
            icon={<CreationDateIcon />}
            label='Creation date'
            onClick={() => handleSelect('creationDate')}
         />

         <ModalActionButton
            icon={<SortIcon />}
            label='Alphabetically'
            onClick={() => handleSelect('alphabet')}
         />
      </>
   );
}
