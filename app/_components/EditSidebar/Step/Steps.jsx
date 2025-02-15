import { useRef } from 'react';
import AddStep from './AddStep';
import StepsList from './StepsList';

export default function Steps({ task, bgColor }) {
   const addStepRef = useRef(null); // for managing scroll

   return (
      <>
         <StepsList task={task} bgColor={bgColor} />
         <AddStep task={task} addStepRef={addStepRef} />
      </>
   );
}
