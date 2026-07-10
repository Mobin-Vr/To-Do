"use client";
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
  const [shouldRender, setShouldRender] = useState(isModalOpen);

  // Defer setShouldRender to avoid React 19 synchronous setState warning
  useEffect(() => {
    if (isModalOpen) {
      queueMicrotask(() => setShouldRender(true));
    }
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, x: isCenteredModal ? 0 : justify },
    visible: { opacity: 1, scale: 1, x: justify },
    exit: { opacity: 0, scale: 0.8, x: isCenteredModal ? 0 : justify },
  };

  const modalVariantsWithTranslate = {
    ...modalVariants,
    hidden: {
      ...modalVariants.hidden,
      x:
        isCenteredModal && window.innerWidth >= 768
          ? justify
          : isCenteredModal
            ? "0"
            : justify,
    },
    visible: {
      ...modalVariants.visible,
      x:
        isCenteredModal && window.innerWidth >= 768
          ? "10rem"
          : isCenteredModal
            ? "0"
            : justify,
    },
    exit: {
      ...modalVariants.exit,
      x:
        isCenteredModal && window.innerWidth >= 768
          ? justify
          : isCenteredModal
            ? "0"
            : justify,
    },
  };

  if (!shouldRender) return null;

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
