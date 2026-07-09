import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  sortMethod: "importance",
  sortMethodForShared: "creationDate",
  showSpinner: true,
  isSidebarOpen: false,
  editTitleWhileCreating: false,
};

const useUiStore = create(
  devtools(
    (set, get) => ({
      // State
      sortMethod: initialState.sortMethod,
      sortMethodForShared: initialState.sortMethodForShared,
      showSpinner: initialState.showSpinner,
      isSidebarOpen: initialState.isSidebarOpen,
      editTitleWhileCreating: initialState.editTitleWhileCreating,

      // Actions
      setSortMethod: (sortMethod) => {
        set(
          produce((state) => {
            state.sortMethod = sortMethod;
            state.sortMethodForShared = sortMethod;
          }),
        );
      },

      setShowpinner: (bool) => {
        set(
          produce((state) => {
            state.showSpinner = bool;
          }),
        );
      },

      toggleSidebar: () => {
        set(
          produce((state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
          }),
        );
      },

      toggleTitleFocus: (bool) => {
        set(
          produce((state) => {
            state.editTitleWhileCreating = bool;
          }),
        );
      },

      resetSidebar: () => {
        set(
          produce((state) => {
            state.isSidebarOpen = false;
          }),
        );
      },

      resetStore: () => set(initialState),
    }),
    { name: "Ui Store" },
  ),
);

export default useUiStore;