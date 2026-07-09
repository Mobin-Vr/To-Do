import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  isDeleteModalOpen: false,
  deletingType: "",
  deletingItemName: "",
  deleteCallback: null,
};

const useDeleteModalStore = create(
  devtools(
    (set, get) => ({
      // State
      isDeleteModalOpen: initialState.isDeleteModalOpen,
      deletingType: initialState.deletingType,
      deletingItemName: initialState.deletingItemName,
      deleteCallback: initialState.deleteCallback,

      // Actions
      showDeleteModal: (deletingType, itemName, deleteCallback) => {
        set(
          produce((state) => {
            state.isDeleteModalOpen = true;
            state.deletingType = deletingType;
            state.deletingItemName = itemName;
            state.deleteCallback = deleteCallback;
          }),
        );
      },

      hideDeleteModal: () => {
        set(
          produce((state) => {
            state.isDeleteModalOpen = false;
            state.deletingType = null;
            state.deletingItemName = null;
            state.deleteCallback = null;
          }),
        );
      },

      handleConfirmDelete: () => {
        const callback = get().deleteCallback;
        if (callback) callback();

        set(
          produce((state) => {
            state.isDeleteModalOpen = false;
            state.deletingType = null;
            state.deletingItemName = null;
            state.deleteCallback = null;
          }),
        );
      },

      resetStore: () => set(initialState),
    }),
    { name: "Delete Modal Store" },
  ),
);

export default useDeleteModalStore;