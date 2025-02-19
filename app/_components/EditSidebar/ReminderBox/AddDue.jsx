import { getRelativeDay } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import { format } from "date-fns";
import { useRef, useState } from "react";
import ModalTemplateCloseAble from "../../_ui/ModalTemplateCloseAble";
import BoxBtn from "../BoxBtn";
import AddDueModal from "../remiderBoxModals/AddDueModal";
import DatePickerModal from "../remiderBoxModals/DatePickerModal";
import ModalTemplatePrimary from "../../_ui/ModalTemplatePrimary";

export default function AddDue({ task }) {
  const AddDueRef = useRef(null);
  const updateDueDate = useTaskStore((state) => state.updateDueDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  const hasDueDate = task.task_due_date ? true : false;
  const relativeDay = task.task_due_date
    ? getRelativeDay(task.task_due_date)
    : "";

  const activeText =
    relativeDay === null
      ? `Due ${format(task.task_due_date, "MMM, dd")}`
      : relativeDay;

  const removeDueDate = () => updateDueDate(task.task_id, null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleModalDatePicker = () =>
    setIsDatePickerModalOpen(!isDatePickerModalOpen);

  return (
    <div ref={AddDueRef} className="">
      <BoxBtn
        text="Add due date"
        activeText={activeText}
        icon="CalendarIcon"
        isDateSet={hasDueDate}
        toggleModal={toggleModal}
        clearDate={removeDueDate}
      />

      <ModalTemplateCloseAble
        parentRef={AddDueRef}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        justify="-50%"
        className="left-1/2 w-56 text-xs font-normal"
      >
        <AddDueModal
          toggleModal={toggleModalDatePicker}
          updateDueDate={updateDueDate}
          task={task}
          d
        />
      </ModalTemplateCloseAble>

      <ModalTemplatePrimary
        isModalOpen={isDatePickerModalOpen}
        toggleModal={toggleModalDatePicker}
        justify="-50%"
        className="bottom-12 left-1/2 w-auto text-xs font-normal"
      >
        <DatePickerModal
          updateDueDate={updateDueDate}
          toggleModal={toggleModalDatePicker}
          task={task}
        />
      </ModalTemplatePrimary>
    </div>
  );
}
