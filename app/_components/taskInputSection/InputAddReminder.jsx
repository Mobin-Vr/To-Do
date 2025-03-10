import { BellIcon } from "@/public/icons/icons";
import { useRef, useState } from "react";
import InputBtnTempl from "../_ui/InputBtnTempl";
import ModalTemplatePrimary from "../_ui/ModalTemplatePrimary";
import ModalTemplateCloseAble from "../_ui/ModalTemplateCloseAble";
import AddReminderModal from "../editSidebarSection/reminderBoxModals/AddReminderModal";
import DateTimePickerModal from "../editSidebarSection/reminderBoxModals/DateTimePickerModal";

export default function InputAddReminder({
  setTaskReminder,
  className,
  InputSelectedDate,
}) {
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
        className="-right-4 bottom-[3rem] w-48 border border-gray-300 text-xs font-normal shadow-black"
      >
        <AddReminderModal
          setTaskReminder={setTaskReminder}
          toggleModalDatePicker={toggleModalDatePicker}
          isForTaskInput={true}
        />
      </ModalTemplateCloseAble>

      <ModalTemplatePrimary
        isModalOpen={isDatePickerModalOpen}
        toggleModal={toggleModalDatePicker}
        className="-right-4 bottom-[3rem] w-fit border border-gray-300 text-xs font-normal shadow-black"
      >
        <DateTimePickerModal
          setTaskReminder={setTaskReminder}
          toggleModal={toggleModalDatePicker}
          InputSelectedDate={InputSelectedDate}
          isForTaskInput={true}
        />
      </ModalTemplatePrimary>
    </div>
  );
}
