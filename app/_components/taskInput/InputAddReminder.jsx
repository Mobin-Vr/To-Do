import { BellIcon } from "@/public/icons";
import { useRef, useState } from "react";
import InputBtnTempl from "../_ui/InputBtnTempl";
import ModalTemplatePrimary from "../_ui/ModalTemplatePrimary";
import ModalTemplateCloseAble from "../_ui/ModalTemplateCloseAble";
import AddReminderModal from "../EditSidebar/remiderBoxModals/AddReminderModal";
import DateTimePickerModal from "../EditSidebar/remiderBoxModals/DateTimePickerModal";

export default function InputAddReminder({ setTaskReminder, className }) {
  const AddReminder = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleModalDatePicker = () =>
    setIsDatePickerModalOpen(!isDatePickerModalOpen);

  return (
    <div ref={AddReminder}>
      <InputBtnTempl
        className={`${className}`}
        icon={<BellIcon />}
        onClick={toggleModal}
      />

      <ModalTemplateCloseAble
        parentRef={AddReminder}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        className="bottom-[3rem] right-0 w-44 border border-gray-300 text-xs font-normal shadow-black"
      >
        <AddReminderModal
          updateReminder={setTaskReminder}
          toggleModalDatePicker={toggleModalDatePicker}
          isForTaskInput={true}
        />
      </ModalTemplateCloseAble>

      <ModalTemplatePrimary
        isModalOpen={isDatePickerModalOpen}
        toggleModal={toggleModalDatePicker}
        className="bottom-[3rem] right-0 w-fit border border-gray-300 text-xs font-normal shadow-black"
      >
        <DateTimePickerModal
          updateReminder={setTaskReminder}
          toggleModal={toggleModalDatePicker}
          isForTaskInput={true}
        />
      </ModalTemplatePrimary>
    </div>
  );
}
