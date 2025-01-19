export default function TaskTitle({ task, className }) {
   return (
      <span
         className={`${className} ${
            task.isCompleted
               ? 'line-through text-gray-800 decoration-gray-500 decoration-slice decoration-1'
               : ''
         }`}
      >
         {task.title}
      </span>
   );
}
