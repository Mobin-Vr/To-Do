import { Calendar } from './calendar';

export default function DatePicker({ date, setDate }) {
   return (
      <Calendar
         mode='single'
         selected={date ? date : new Date().toISOString()}
         onSelect={setDate}
         autoFocus
         classNames={{
            day_today: 'bg-blue-700 text-white',
            day_outside: 'text-gray-400',
            month: 'space-y-7',
         }}
      />
   );
}
