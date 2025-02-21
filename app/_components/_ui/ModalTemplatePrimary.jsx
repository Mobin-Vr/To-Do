import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ModalTemplatePrimary({
  children,
  isModalOpen,
  toggleModal,
  className,
  justify = "0",
}) {
  const modalRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(isModalOpen); // Control rendering in DOM

  useEffect(() => {
    if (isModalOpen) setShouldRender(true); // Render the modal in the DOM when it's open
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      async function handleClickOutside(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          toggleModal();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen, toggleModal]);

  if (!shouldRender) return null; // Remove the modal from DOM after exit animation is complete

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {isModalOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.8, x: justify }}
          animate={{ opacity: 1, scale: 1, x: justify }}
          exit={{ opacity: 0, scale: 0.8, x: justify }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`border-1 absolute z-50 overflow-hidden rounded-md border border-gray-300 bg-white text-sm font-normal text-gray-800 shadow-2xl ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
