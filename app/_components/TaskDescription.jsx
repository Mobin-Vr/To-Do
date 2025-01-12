export default function TaskDescription({ task }) {
   return (
      <span
         className={`ml-2 text-sm font-normal ${
            task.isCompleted
               ? 'line-through text-gray-800 decoration-gray-500 decoration-slice decoration-1'
               : ''
         }`}
      >
         {task.description}
      </span>
   );
}
