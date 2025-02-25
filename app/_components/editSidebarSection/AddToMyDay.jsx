import useTaskStore from "@/app/taskStore";
import BoxBtn from "./BoxBtn";
import BoxTemplate from "./BoxTemplate";
import { useShallow } from "zustand/react/shallow";

function AddToMyDay({ task }) {
  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );

  function toggleAdded() {
    // if is added should not be removed by clicking on box btn
    if (!task.is_task_in_myday)
      updateTaskInStore(task.task_id, {
        is_task_in_myday: !task.is_task_in_myday,
      });
  }

  function clearAdded() {
    updateTaskInStore(task.task_id, {
      is_task_in_myday: !task.is_task_in_myday,
    });
  }

  return (
    <BoxTemplate>
      <BoxBtn
        text="Add to My Day"
        activeText="Added to My Day"
        icon="SunIcon"
        isDateSet={task.is_task_in_myday}
        toggleModal={toggleAdded} // CHANGE the name is not relevent! but its just a click on btn
        clearDate={clearAdded} // reset the box to default with x btn
      />
    </BoxTemplate>
  );
}

export default AddToMyDay;
