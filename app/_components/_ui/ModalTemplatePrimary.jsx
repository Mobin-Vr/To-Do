import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ModalTemplatePrimary({
  children,
  isModalOpen,
  toggleModal,
  className,
  justify = "0",
  isCenteredModal = false,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, x: isCenteredModal ? 0 : justify },
    visible: { opacity: 1, scale: 1, x: justify },
    exit: { opacity: 0, scale: 0.8, x: isCenteredModal ? 0 : justify },
  };

  // Define variants with translate-x on large screens
  const modalVariantsWithTranslate = {
    ...modalVariants,
    visible: {
      ...modalVariants.visible,
      x:
        isCenteredModal && window.innerWidth >= 768
          ? "10rem" // Half of the max-width of the sidebar
          : isCenteredModal
            ? "0"
            : justify,
    },
  };

  if (!shouldRender) return null; // Remove the modal from DOM after exit animation is complete

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {isModalOpen && (
        <motion.div
          ref={modalRef}
          variants={modalVariantsWithTranslate}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`border-1 absolute z-50 overflow-hidden rounded-md border border-gray-300 bg-white text-sm font-normal text-gray-800 shadow-2xl ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
