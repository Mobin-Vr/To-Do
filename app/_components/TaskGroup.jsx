import TaskItem from './TaskItem';

export default function TaskGroup({
   tasks,
   listRef,
   bgColor,
   activeTaskId,
   setActiveTaskId,
}) {
   return (
      <ul className='list-none p-0 flex flex-col gap-0.5'>
         {tasks.map((task) => (
            <TaskItem
               task={task}
               listRef={listRef}
               key={task.id}
               bgColor={bgColor}
               activeTaskId={activeTaskId}
               setActiveTaskId={setActiveTaskId}
            />
         ))}
      </ul>
   );
}
