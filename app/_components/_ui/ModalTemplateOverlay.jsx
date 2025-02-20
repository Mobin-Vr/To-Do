import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ModalTemplateOverlay({
  children,
  isModalOpen,
  toggleModal,
  className,
}) {
  const modalRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(isModalOpen); // Control rendering in DOM

  useEffect(() => {
    if (isModalOpen) setShouldRender(true); // Render the modal in the DOM when it's open
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      async function handleClickOutside(e) {
        if (modalRef.current && !modalRef.current.contains(e.target))
          toggleModal();
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  // Define animation variants with media query handling
  const modalVariants = {
    hidden: { opacity: 0, scale: 1, x: "0" },
    visible: { opacity: 1, scale: 1, x: "0", transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 1, x: "0", transition: { duration: 0.2 } },
  };

  const modalVariants2 = {
    hidden: { opacity: 0, scale: 0.8, x: "0" },
    visible: { opacity: 1, scale: 1, x: "0", transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, x: "0", transition: { duration: 0.2 } },
  };

  // Define variants with translate-x on large screens
  const modalVariantsWithTranslate = {
    ...modalVariants2,
    visible: {
      ...modalVariants.visible,
      x: window.innerWidth >= 768 ? "10rem" : "0", // Half of the max-width of the sidebar
    },
  };

  if (!shouldRender) return null; // Remove the modal from DOM after exit animation is complete

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {isModalOpen && (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            ref={modalRef}
            variants={modalVariantsWithTranslate}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`border-1 absolute z-40 transform overflow-hidden rounded-md border border-gray-300 bg-white text-sm font-normal text-gray-800 shadow-2xl ${className}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
