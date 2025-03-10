import { SyncIcon } from "@/public/icons/icons";
import { useRef, useState } from "react";
import InputBtnTempl from "../_ui/InputBtnTempl";
import ModalTemplateCloseAble from "../_ui/ModalTemplateCloseAble";
import AddRepeatModal from "../editSidebarSection/reminderBoxModals/AddRepeatModal";

export default function InputAddRepeat({
  setTaskRepeat,
  selectedRepeat,
  setTaskDueDate,
  taskDueDate,
  taskRepeat,
  className,
}) {
  const AddRepeatRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div ref={AddRepeatRef}>
      <InputBtnTempl
        className={`${className}`}
        icon={<SyncIcon />}
        onClick={toggleModal}
      />

      <ModalTemplateCloseAble
        parentRef={AddRepeatRef}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        className="-right-4 bottom-[3rem] w-48 border border-gray-300 text-xs font-normal shadow-black"
      >
        <AddRepeatModal
          setTaskDueDate={setTaskDueDate}
          setTaskRepeat={setTaskRepeat}
          selectedRepeat={selectedRepeat}
          isForTaskInput={true}
          taskDueDate={taskDueDate}
          taskRepeat={taskRepeat}
        />
      </ModalTemplateCloseAble>
    </div>
  );
}
