import Border from '../../_ui/Border';
import AddDue from './AddDue';
import BoxTemplate from '../BoxTemplate';
import AddReminder from './AddReminder';
import AddRepeat from './AddRepeat';

export default function ReminderBox({ task }) {
   return (
      <BoxTemplate className='flex flex-col justify-center py-1'>
         <AddReminder task={task} />
         <Border />

         <AddDue task={task} />
         <Border />

         <AddRepeat task={task} />
      </BoxTemplate>
   );
}
