export default function TaskTitle({ task, className }) {
   return (
      <span
         className={`${className} ${
            task.is_task_completed
               ? 'line-through text-gray-800 decoration-gray-500 decoration-slice decoration-1'
               : ''
         }`}
      >
         {task.task_title}
      </span>
   );
}
