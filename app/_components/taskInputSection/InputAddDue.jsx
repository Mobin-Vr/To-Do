"use client";

import { CalendarIcon } from "@/public/icons/icons";
import { useRef, useState } from "react";
import InputBtnTempl from "@/app/_components/_ui/InputBtnTempl";
import ModalTemplateCloseAble from "@/app/_components/_ui/ModalTemplateCloseAble";
import ModalTemplatePrimary from "@/app/_components/_ui/ModalTemplatePrimary";
import AddDueModal from "@/app/_components/editSidebarSection/reminderBoxModals/AddDueModal";
import DatePickerModal from "@/app/_components/editSidebarSection/reminderBoxModals/DatePickerModal";

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
