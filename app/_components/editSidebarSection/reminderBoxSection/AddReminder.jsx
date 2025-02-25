import { getRelativeDay } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import { format } from "date-fns";
import { useRef, useState } from "react";
import ModalTemplatePrimary from "../../_ui/ModalTemplatePrimary";
import ModalTemplateCloseAble from "../../_ui/ModalTemplateCloseAble";
import BoxBtn from "../BoxBtn";
import AddReminderModal from "../reminderBoxModals/AddReminderModal";
import DateTimePickerModal from "../reminderBoxModals/DateTimePickerModal";
import { useShallow } from "zustand/react/shallow";

export default function AddReminder({ task }) {
  const AddReminder = useRef(null);

  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  const hasReminder = task.task_reminder ? true : false;
  const activeText = `Remind me at ${
    task.task_reminder ? format(task.task_reminder, "HH:mm") : ""
  }`;

  const relativeDay = getRelativeDay(task.task_reminder);
  const weekday = relativeDay ? format(task.task_reminder, "EEE") : relativeDay;

  const removeReminder = () =>
    updateTaskInStore(task.task_id, { task_reminder: null });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleModalDatePicker = () =>
    setIsDatePickerModalOpen(!isDatePickerModalOpen);

  return (
    <div ref={AddReminder} className="">
      <BoxBtn
        text="Remind me"
        activeText={activeText}
        icon="BellIcon"
        weekday={weekday}
        isDateSet={hasReminder}
        toggleModal={toggleModal}
        clearDate={removeReminder}
      />

      <ModalTemplateCloseAble
        parentRef={AddReminder}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        justify="-50%"
        className="left-1/2 w-56 text-xs font-normal"
      >
        <AddReminderModal
          toggleModalDatePicker={toggleModalDatePicker}
          updateTaskInStore={updateTaskInStore}
          task={task}
        />
      </ModalTemplateCloseAble>

      <ModalTemplatePrimary
        isModalOpen={isDatePickerModalOpen}
        toggleModal={toggleModalDatePicker}
        justify="-50%"
        className="bottom-12 left-1/2 w-auto text-xs font-normal"
      >
        <DateTimePickerModal
          updateTaskInStore={updateTaskInStore}
          toggleModal={toggleModalDatePicker}
          task={task}
        />
      </ModalTemplatePrimary>
    </div>
  );
}
