import { getHourMinString } from '@/app/_lib/utils';

export default function TimePicker({
   timeInputRef,
   handleInputClick,
   setTime,
   time,
}) {
   return (
      <div className='flex justify-between bg-blue-700 px-12 mb-2 mx-1 rounded-sm'>
         <span className='text-white text-xs my-auto'>Select Time</span>
         <input
            type='time'
            ref={timeInputRef}
            onClick={handleInputClick}
            onChange={(e) => setTime(e.target.value)}
            value={time ? time : getHourMinString(new Date())}
            className='outline-none border-none p-1.5 text-xl bg-inherit text-white rounded-t-none focus:text-white focus:outline-none focus:ring-none select-none'
         />
      </div>
   );
}
