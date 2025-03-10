import StepItem from "./StepItem";

// export default function StepsList({ listRef, bgColor, task }) {
export default function StepsList({ task, bgColor }) {
  const steps = task?.task_steps;

  if (!steps || steps.length === 0) return;

  return (
    <ul className={`mb-1 flex list-none flex-col gap-0.5`}>
      {steps.map((step) => (
        <StepItem
          step={step}
          task={task}
          key={step.step_id}
          bgColor={bgColor}
        />
      ))}
    </ul>
  );
}
