import { ShareIcon } from "@/public/icons";
import { useState } from "react";
import ModalTemplatePrimary from "../_ui/ModalTemplatePrimary";
import SharedListModal from "./ShareListModal";
import Overlay from "../_ui/Overlay";

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

      <Overlay isOpen={isModalOpen} onClick={toggleModal} zIndex={30}>
        <ModalTemplatePrimary
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          justify="50%"
          isCenteredModal={true}
          className="h-full max-h-[28rem] w-4/6 max-w-80"
        >
          <SharedListModal
            toggleModal={toggleModal}
            theCategoryId={theCategoryId}
          />
        </ModalTemplatePrimary>
      </Overlay>
    </div>
  );
}
