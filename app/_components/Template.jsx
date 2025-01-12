import AppHeader from './AppHeader';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

export default function Template({ listRef, bgColor }) {
   return (
      <div
         className={`w-full h-full flex flex-col bg-${bgColor}`}
         style={{ backgroundColor: bgColor }}
      >
         <AppHeader bgColor={bgColor} />

         <div className='px-6 my-2 h-full flex-grow overflow-auto'>
            <TaskList listRef={listRef} />
         </div>

         <TaskInput bgColor={bgColor} />
      </div>
   );
}
