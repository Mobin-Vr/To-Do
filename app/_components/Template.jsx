import AppHeader from './AppHeader';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

export default function Template({ listRef, listConfig }) {
   return (
      <div
         className='w-full h-full flex flex-col'
         style={{ backgroundColor: listConfig.bgColor[0] }}
      >
         <AppHeader
            className='px-6 sm:px-10 sticky top-0 h-36 z-10'
            listConfig={listConfig}
         />

         <div className='px-6 sm:px-10 my-2 h-full flex-grow overflow-auto'>
            <TaskList listRef={listRef} bgColor={listConfig.bgColor} />
         </div>

         <TaskInput
            className='px-6 sm:px-10 z-10 h-[5.5rem] w-full sticky bottom-0'
            bgColor={listConfig.bgColor}
         />
      </div>
   );
}
