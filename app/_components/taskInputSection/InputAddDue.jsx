import { CalendarIcon } from "@/public/icons";
import { useRef, useState } from "react";
import ModalTemplatePrimary from "../_ui/ModalTemplatePrimary";
import InputBtnTempl from "../_ui/InputBtnTempl";
import ModalTemplateCloseAble from "../_ui/ModalTemplateCloseAble";
import AddDueModal from "../editSidebarSection/reminderBoxModals/AddDueModal";
import DatePickerModal from "../editSidebarSection/reminderBoxModals/DatePickerModal";

export default function InputAddDue({ setTaskDueDate, className }) {
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
        className="bottom-[3rem] right-0 w-44 border border-gray-300 text-xs font-normal shadow-black"
      >
        <AddDueModal
          updateDueDate={setTaskDueDate}
          toggleModal={toggleModalDatePicker}
          isForTaskInput={true}
        />
      </ModalTemplateCloseAble>

      <ModalTemplatePrimary
        isModalOpen={isDatePickerModalOpen}
        toggleModal={toggleModalDatePicker}
        className="bottom-[3rem] right-0 w-fit border border-gray-300 text-xs font-normal shadow-black"
      >
        <DatePickerModal
          updateDueDate={setTaskDueDate}
          toggleModal={toggleModalDatePicker}
          isForTaskInput={true}
        />
      </ModalTemplatePrimary>
    </div>
  );
}
