import { CalendarIcon } from "@/public/icons/icons";
import { useRef, useState } from "react";
import ModalTemplatePrimary from "../_ui/ModalTemplatePrimary";
import InputBtnTempl from "../_ui/InputBtnTempl";
import ModalTemplateCloseAble from "../_ui/ModalTemplateCloseAble";
import AddDueModal from "../editSidebarSection/reminderBoxModals/AddDueModal";
import DatePickerModal from "../editSidebarSection/reminderBoxModals/DatePickerModal";

export default function InputAddDue({
  setTaskDueDate,
  className,
  InputSelectedDate,
}) {
  const AddDueRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleModalDatePicker = () =>
    setIsDatePickerModalOpen(!isDatePickerModalOpen);

  return (
    <div ref={AddDueRef}>
      <InputBtnTempl
        className={`${className}`}
        icon={<CalendarIcon />}
        onClick={toggleModal}
      />

      <ModalTemplateCloseAble
        parentRef={AddDueRef}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        className="-right-4 bottom-[3rem] w-48 border border-gray-300 text-xs font-normal shadow-black"
      >
        <AddDueModal
          setTaskDueDate={setTaskDueDate}
          toggleModal={toggleModalDatePicker}
          isForTaskInput={true}
        />
      </ModalTemplateCloseAble>

      <ModalTemplatePrimary
        isModalOpen={isDatePickerModalOpen}
        toggleModal={toggleModalDatePicker}
        className="-right-4 bottom-[3rem] w-fit border border-gray-300 text-xs font-normal shadow-black"
      >
        <DatePickerModal
          setTaskDueDate={setTaskDueDate}
          InputSelectedDate={InputSelectedDate}
          toggleModal={toggleModalDatePicker}
          isForTaskInput={true}
        />
      </ModalTemplatePrimary>
    </div>
  );
}
