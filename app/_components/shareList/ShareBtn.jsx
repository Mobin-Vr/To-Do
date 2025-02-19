import { ShareIcon } from "@/public/icons";
import { useState } from "react";
import ModalTemplateOverlay from "../_ui/ModalTemplateOverlay";
import SharedListModal from "./ShareListModal";

export default function ShareBtn({ theCategoryId, bgColor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      {/* Button to toggle modal */}
      <button
        onClick={toggleModal}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center justify-center rounded-md p-1"
        style={{
          backgroundColor: hover ? bgColor.buttonHover : "transparent",
        }}
      >
        <ShareIcon />
      </button>

      <ModalTemplateOverlay
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        className="h-full max-h-[28rem] w-4/6 max-w-80"
      >
        <SharedListModal
          toggleModal={toggleModal}
          theCategoryId={theCategoryId}
        />
      </ModalTemplateOverlay>
    </div>
  );
}
