import TaskItem from './TaskItem';

export default function TaskGroup({ tasks, listRef, bgColor }) {
   return (
      <ul className='list-none p-0 flex flex-col gap-[0.12rem]'>
         {tasks.map((task) => (
            <TaskItem
               task={task}
               listRef={listRef}
               key={task.id}
               bgColor={bgColor}
            />
         ))}
      </ul>
   );
}
