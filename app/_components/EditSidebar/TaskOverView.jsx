import CompleteBtn from '../_ui/CompleteBtn';
import StarBtn from '../_ui/StarBtn';
import BoxTemplate from './BoxTemplate';
import Steps from './step/Steps';
import TaskTitleEditor from './TaskTitleEditor';

function TaskOverView({ task }) {
   return (
      <BoxTemplate className='flex flex-col p-3 py-0'>
         <div className='flex justify-between items-start'>
            <CompleteBtn
               task={task}
               className='mt-3 ml-0.5 flex justify-center'
            />

            <TaskTitleEditor
               task={task}
               className='text-xl flex-1 font-medium whitespace-pre-wrap break-words overflow-hidden'
            />

            <StarBtn task={task} className='mt-3 mr-2' />
         </div>

         <Steps task={task} />
      </BoxTemplate>
   );
}

export default TaskOverView;
