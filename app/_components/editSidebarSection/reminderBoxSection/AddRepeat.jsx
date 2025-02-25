import { getWeekendForWeekdays, isWeekday } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import { useEffect, useRef, useState } from "react";
import ModalTemplateCloseAble from "../../_ui/ModalTemplateCloseAble";
import BoxBtn from "../BoxBtn";
import AddRepeatModal from "../reminderBoxModals/AddRepeatModal";
import { useShallow } from "zustand/react/shallow";

export default function AddRepeat({ task }) {
  const repeatRef = useRef(null);

  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasRepeat = task.task_repeat ? true : false;
  const activeText = task.task_repeat;

  const removeRepeat = () =>
    updateTaskInStore(task.task_id, { task_repeat: null });
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (task.task_repeat === "Weekdays" && !isWeekday(task.task_due_date)) {
      const nearestFridy = getWeekendForWeekdays(task.task_due_date);
      updateTaskInStore(task.task_id, { task_due_date: nearestFridy });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.task_repeat]);

  return (
    <div ref={repeatRef}>
      <BoxBtn
        text="Repeat"
        activeText={activeText}
        icon="SyncIcon"
        toggleModal={toggleModal}
        clearDate={removeRepeat}
        isDateSet={hasRepeat}
      />

      <ModalTemplateCloseAble
        parentRef={repeatRef}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        justify="-50%"
        className="left-1/2 w-56 text-xs font-normal"
      >
        <AddRepeatModal task={task} updateTaskInStore={updateTaskInStore} />
      </ModalTemplateCloseAble>
    </div>
  );
}
