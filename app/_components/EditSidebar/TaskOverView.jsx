import CompleteButton from '../CompleteButton';
import StarButton from '../StarButton';
import AddStep from './Step/AddStep';
import BoxTemplate from './BoxTemplate';
import StepsList from './Step/StepsList';
import TaskTitleEditor from './TaskTitleEditor';

function TaskOverView({ task }) {
   return (
      <BoxTemplate className='flex flex-col p-3 py-0'>
         <div className='flex justify-between items-start'>
            <CompleteButton task={task} className='mt-3' />

            <TaskTitleEditor
               task={task}
               className='text-xl flex flex-col justify-center flex-1 font-medium whitespace-pre-wrap break-words h-fit overflow-hidden w-[95%]'
            />

            <StarButton task={task} className='mt-3' />
         </div>

         <StepsList task={task} />

         <AddStep className='p-1' taskId={task.id} />
      </BoxTemplate>
   );
}

export default TaskOverView;
