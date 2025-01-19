import StepItem from './StepsItem';

// export default function StepsList({ listRef, bgColor, task }) {
export default function StepsList({ task }) {
   const steps = task?.steps;
   console.log(steps);

   if (steps?.length === 0) return;

   return (
      <ul className='list-none p-0 flex flex-col gap-0.5'>
         {steps.map((step) => (
            <StepItem
               step={step}
               taskId={task.id}
               key={step.id}
               //  listRef={listRef}
               //  activeTaskId={activeTaskId}
               //  setActiveTaskId={setActiveTaskId}
            />
         ))}
      </ul>
   );
}
