import useTaskStore from '@/app/taskStore';
import BoxBtn from './BoxBtn';
import BoxTemplate from './BoxTemplate';

function AddToMyDay({ task }) {
   const toggleAddedToMyDay = useTaskStore((state) => state.toggleAddedToMyDay);

   function toggleAdded() {
      // if is added should not be removed by clicking on box btn
      if (!task.is_task_in_myday) toggleAddedToMyDay(task.task_id);
   }

   function clearAdded() {
      toggleAddedToMyDay(task.task_id);
   }

   return (
      <BoxTemplate>
         <BoxBtn
            text='Add to My Day'
            activeText='Added to My Day'
            icon='SunIcon'
            isDateSet={task.is_task_in_myday}
            toggleModal={toggleAdded} // CHANGE the name is not relevent! but its just a click on btn
            clearDate={clearAdded} // reset the box to default with x btn
         />
      </BoxTemplate>
   );
}

export default AddToMyDay;
