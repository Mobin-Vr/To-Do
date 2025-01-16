import { CalendarIcon, ClockIcon, RepeatIcon } from '@/public/icons';
import BoxTemplate from './BoxTemplate';
import DetailsBtn from './DetailsBtn';

export default function ReminderSection() {
   return (
      <BoxTemplate className='flex flex-col justify-center'>
         <DetailsBtn text='Remind me'>
            <ClockIcon size='18px' />
         </DetailsBtn>

         <span className='h-[0.01rem] w-[91%] bg-gray-200 m-auto my-0.5'></span>

         <DetailsBtn text='Add due date'>
            <CalendarIcon size='18px' />
         </DetailsBtn>

         <span className='h-[0.01rem] w-[91%] bg-gray-200 m-auto  my-0.5'></span>

         <DetailsBtn text='Repeat'>
            <RepeatIcon size='17px' />
         </DetailsBtn>
      </BoxTemplate>
   );
}
