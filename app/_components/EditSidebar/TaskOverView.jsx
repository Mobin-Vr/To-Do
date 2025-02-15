import CompleteBtn from '../_ui/CompleteBtn';
import StarBtn from '../_ui/StarBtn';
import BoxTemplate from './BoxTemplate';
import Steps from './step/Steps';
import TaskTitleEditor from './TaskTitleEditor';

function TaskOverView({ task, bgColor }) {
   return (
      <BoxTemplate className='flex flex-col p-3 py-0'>
         <div className='flex justify-between items-start'>
            <CompleteBtn
               task={task}
               className='mt-3 ml-0.5 flex justify-center'
               bgColor={bgColor}
            />

            <TaskTitleEditor
               task={task}
               className='text-xl flex-1 font-medium whitespace-pre-wrap break-words overflow-hidden'
            />

            <StarBtn task={task} className='mt-3 mr-2' bgColor={bgColor} />
         </div>

         <Steps task={task} bgColor={bgColor} />
      </BoxTemplate>
   );
}

export default TaskOverView;
