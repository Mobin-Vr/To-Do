import {
   AlphabetIcon,
   StarIcon,
   PickReminderIcon,
   TodayCalendarIcon,
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
            className='border-b border-gray-100 text-gray-800 hover:bg-inherit cursor-default'
         />

         <ModalActionButton
            icon={<StarIcon />}
            label='Importance'
            onClick={() => handleSelect('importance')}
         />

         <ModalActionButton
            icon={<PickReminderIcon size='16px' />}
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
