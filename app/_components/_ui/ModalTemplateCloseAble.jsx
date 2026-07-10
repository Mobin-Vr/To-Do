"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ModalTemplateCloseAble({
  children,
  className,
  isModalOpen,
  toggleModal,
  justify = "0",
}) {
  const modalRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(isModalOpen);

  useEffect(() => {
    if (isModalOpen) {
      const timeout = setTimeout(() => setShouldRender(true), 0);
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      async function handleClickOutside() {
        toggleModal();
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen, toggleModal]);

  // Define animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, x: justify },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {isModalOpen && (
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`absolute z-50 flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white text-sm font-normal text-gray-600 shadow-2xl ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
