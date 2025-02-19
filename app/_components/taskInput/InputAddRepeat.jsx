import { SyncIcon } from "@/public/icons";
import { useRef, useState } from "react";
import InputBtnTempl from "../_ui/InputBtnTempl";
import ModalTemplateCloseAble from "../_ui/ModalTemplateCloseAble";
import AddRepeatModal from "../EditSidebar/remiderBoxModals/AddRepeatModal";

export default function InputAddRepeat({
  setTaskRepeat,
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
        className="bottom-[3rem] right-0 w-44 border border-gray-300 text-xs font-normal shadow-black"
      >
        <AddRepeatModal
          updateDueDate={setTaskDueDate}
          updateRepeat={setTaskRepeat}
          isForTaskInput={true}
          taskDueDate={taskDueDate}
          taskRepeat={taskRepeat}
        />
      </ModalTemplateCloseAble>
    </div>
  );
}
