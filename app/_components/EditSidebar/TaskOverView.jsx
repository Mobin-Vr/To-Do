import CompleteButton from '../CompleteButton';
import StarButton from '../StarButton';
import TaskDescription from '../TaskDescription';
import BoxTemplate from './BoxTemplate';
import Step from './Step';

function TaskOverView({ task }) {
   return (
      <BoxTemplate className='p-3'>
         <div className='flex justify-between items-center mb-2'>
            <div className='flex items-center'>
               {/* Added classes to identify the buttons for click handling */}
               <CompleteButton task={task} className='complete-btn' />
               <TaskDescription task={task} />
            </div>

            {/* Added classes to identify the buttons for click handling */}
            <StarButton task={task} className='star-btn' />
         </div>
         {/* ADD step */}
         <Step className='px-1' />
      </BoxTemplate>
   );
}

export default TaskOverView;
