import TaskItem from './TaskItem';

export default function TaskGroup({
   tasks,
   listRef,
   bgColor,
   handleToggleSidebar,
   listName,
}) {
   if (tasks.length === 0) return null;

   return (
      <ul className='list-none p-0 flex flex-col gap-0.5'>
         {tasks.map((task) => (
            <TaskItem
               task={task}
               listRef={listRef}
               key={task.task_id}
               bgColor={bgColor}
               handleToggleSidebar={handleToggleSidebar}
               listName={listName}
            />
         ))}
      </ul>
   );
}
