"use client";

import useTaskStore from "@/app/taskStore";
import { motion } from "framer-motion";
import Overlay from "./Overlay";
import OrdinaryBtn from "./OrdinaryBtn";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export default function DeleteWarningModal() {
  const {
    isDeleteModalOpen,
    deletingType,
    deletingItemName,
    hideDeleteModal,
    handleConfirmDelete,
  } = useTaskStore(
    useShallow((state) => ({
      isDeleteModalOpen: state.isDeleteModalOpen,
      deletingType: state.deletingType,
      deletingItemName: state.deletingItemName,
      hideDeleteModal: state.hideDeleteModal,
      handleConfirmDelete: state.handleConfirmDelete,
    })),
  );

  useEffect(() => {
    function handleOverlayClick(e) {
      const modal = document.getElementById("delete-modal");

      if (modal && !modal.contains(e.target)) hideDeleteModal();
    }

    document.addEventListener("click", handleOverlayClick);

    // Cleanup listener on component unmount or when modal is closed
    return () => document.removeEventListener("click", handleOverlayClick);
  }, [isDeleteModalOpen, hideDeleteModal]);

  if (!isDeleteModalOpen) return null;

  return (
    <>
      <Overlay isOpen={isDeleteModalOpen} onClick={hideDeleteModal} />

      <motion.div
        id="delete-modal"
        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-100%" }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed left-1/2 top-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
      >
        <h1 className="mb-2 text-2xl font-medium text-gray-900">
          Delete <span className="lowercase">{deletingType}</span>
        </h1>

        <p className="mb-4 text-sm font-light">
          {deletingType === "category"
            ? "All list members will lose access to this list as well."
            : `"${deletingItemName}" will be permanently deleted.`}
        </p>

        <div className="mt-10 flex justify-end gap-2 px-2">
          <OrdinaryBtn
            onClick={handleConfirmDelete}
            text="Delete"
            mode="warn"
            className="confirm-delete w-full text-sm"
          />

          {/* "cancel-delete" class is for handle close sidebar */}
          <OrdinaryBtn
            onClick={hideDeleteModal}
            text="Cancel"
            mode="primary"
            className="cancel-delete w-full text-sm"
          />
        </div>
      </motion.div>
    </>
  );
}
