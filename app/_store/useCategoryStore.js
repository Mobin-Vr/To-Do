import { produce } from "immer";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  addManyCategoriesAction,
  deleteManyCategoriesAction,
  updateManyCategoriesAction,
} from "../_lib/Actions";
import { TASK_SYNC_FAIL_TOAST_MSG } from "../_lib/configs";
import { logger } from "../_lib/logger";
import useSyncStore from "./useSyncStore";
import useTaskStore from "./useTaskStore";

const initialState = {
  categoriesList: null,
};

const useCategoryStore = create(
  devtools(
    (set, get) => ({
      // State
      categoriesList: initialState.categoriesList,

      // # Add category
      addCategoryToStore: async (category) => {
        try {
          set(
            produce((state) => {
              const existingNames = state.categoriesList.map(
                (cat) => cat.category_title,
              );
              const untitledRegex = /^Untitled list(?: \((\d+)\))?$/;
              const usedNumbers = existingNames
                .map((name) => {
                  const match = name.match(untitledRegex);
                  return match ? parseInt(match[1] || "0", 10) : null;
                })
                .filter((num) => num !== null);

              let nextNumber = 0;
              while (usedNumbers.includes(nextNumber)) {
                nextNumber++;
              }

              const newName =
                nextNumber === 0
                  ? "Untitled list"
                  : `Untitled list (${nextNumber})`;

              category.category_title = newName;
              state.categoriesList.push(category);
            }),
          );

          const { offlineLogMode, conectionStatus } = useSyncStore.getState();
          if (offlineLogMode) {
            useSyncStore
              .getState()
              .logCategoryChange(
                "add-category",
                category.category_id,
                category,
              );
          }

          if (conectionStatus.isOnline)
            await addManyCategoriesAction([category]);
        } catch (error) {
          logger.error("Error adding category: ", error);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore
            .getState()
            .pushErrorLog("addCategoryToStore", error.message);
        }
      },

      // # Delete category
      deleteCategoryFromStore: async (id) => {
        try {
          // Capture category before deletion
          const category = get().categoriesList.find(
            (cat) => cat.category_id === id,
          );

          set(
            produce((state) => {
              state.categoriesList = state.categoriesList.filter(
                (cat) => cat.category_id !== id,
              );
            }),
          );

          // Remove associated tasks from task store
          useTaskStore.getState().removeTasksByCategoryId(id);

          const { offlineLogMode, conectionStatus } = useSyncStore.getState();
          if (offlineLogMode && category) {
            useSyncStore
              .getState()
              .logCategoryChange("delete-category", id, category);
          }

          if (conectionStatus.isOnline) await deleteManyCategoriesAction([id]);
        } catch (error) {
          logger.error("Error deleting category:", error);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore
            .getState()
            .pushErrorLog("deleteCategoryFromStore", error.message);
        }
      },

      // # Update category
      updateCategoryInStore: async (id, updatedFields) => {
        try {
          set(
            produce((state) => {
              const category = state.categoriesList.find(
                (cat) => cat.category_id === id,
              );
              if (category) {
                Object.assign(category, updatedFields);
              }
            }),
          );

          const { offlineLogMode, conectionStatus } = useSyncStore.getState();
          if (offlineLogMode) {
            const category = get().categoriesList.find(
              (cat) => cat.category_id === id,
            );
            useSyncStore
              .getState()
              .logCategoryChange("update-category", id, category);
          }

          if (conectionStatus.isOnline) {
            const category = get().categoriesList.find(
              (cat) => cat.category_id === id,
            );
            await updateManyCategoriesAction(
              [category],
              [category.category_id],
            );
          }
        } catch (error) {
          logger.error("Error updating category: ", error);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore
            .getState()
            .pushErrorLog("updateCategoryInStore", error.message);
        }
      },

      // # Update category name from realtime
      updateCategoryNameFromRealTime: (categoryId, newName) => {
        set(
          produce((state) => {
            const category = state.categoriesList.find(
              (cat) => cat.category_id === categoryId,
            );
            if (category) category.category_title = newName;
          }),
        );
      },

      // # Get categories list
      getCategoriesList: () => {
        return get().categoriesList;
      },

      // # New helper: Set category invitation flag
      setCategoryInvitationFlag: (categoryId, bool) => {
        set(
          produce((state) => {
            const theCat = state.categoriesList.find(
              (cat) => cat.category_id === categoryId,
            );
            if (theCat) theCat.has_category_invitation = bool;
          }),
        );
      },

      // # New helper: Add category to list
      addCategoryToList: (category) => {
        set(
          produce((state) => {
            state.categoriesList.push(category);
          }),
        );
      },

      // # New helper: Remove category by id
      removeCategoryById: (categoryId) => {
        set(
          produce((state) => {
            state.categoriesList = state.categoriesList.filter(
              (cat) => cat.category_id !== categoryId,
            );
          }),
        );
      },

      // # New helper: Set categories list (for fetchDataOnMount)
      setCategoriesList: (categories) => {
        set(
          produce((state) => {
            state.categoriesList = categories;
          }),
        );
      },

      resetStore: () => set(initialState),
    }),
    { name: "Category Store" },
  ),
);

export default useCategoryStore;
