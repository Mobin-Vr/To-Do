import useTaskStore from '@/app/store';
import BoxBtn from './BoxBtn';
import BoxTemplate from './BoxTemplate';

function AddToMyDay({ task }) {
   const toggleAddedToMyDay = useTaskStore((state) => state.toggleAddedToMyDay);

   function toggleAdded() {
      // if is added should not be removed by clicking on box btn
      if (!task.isAddedToMyDay) toggleAddedToMyDay(task.id);
   }

   function clearAdded() {
      toggleAddedToMyDay(task.id);
   }

   return (
      <BoxTemplate>
         <BoxBtn
            text='Add to My Day'
            activeText='Added to My Day'
            icon='SunIcon'
            size='20px'
            isDateSet={task.isAddedToMyDay}
            toggleModal={toggleAdded} // CHANGE the name is not relevent! but its just a click on btn
            clearDate={clearAdded} // reset the box to default with x btn
         />
      </BoxTemplate>
   );
}

export default AddToMyDay;
