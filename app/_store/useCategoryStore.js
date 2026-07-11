import { produce } from "immer";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  addManyCategoriesAction,
  deleteManyCategoriesAction,
  updateManyCategoriesAction,
} from "@/app/_lib/Actions";
import { TASK_SYNC_FAIL_TOAST_MSG } from "@/app/_lib/configs";
import { logger } from "@/app/_lib/logger";
import useSyncStore from "./useSyncStore";
import useTaskStore from "./useTaskStore";

const initialState = {
  categoriesList: null, // changed from []
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
              if (!state.categoriesList) state.categoriesList = []; // initialise if null
              const list = state.categoriesList;
              const existingNames = list.map((cat) => cat.category_title);
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
              list.push(category);
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
          const list = get().categoriesList ?? [];
          const category = list.find((cat) => cat.category_id === id);

          set(
            produce((state) => {
              if (state.categoriesList) {
                state.categoriesList = state.categoriesList.filter(
                  (cat) => cat.category_id !== id,
                );
              }
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
              if (!state.categoriesList) return;
              const category = state.categoriesList.find(
                (cat) => cat.category_id === id,
              );
              if (category) {
                Object.assign(category, updatedFields);
              }
            }),
          );

          const list = get().categoriesList ?? [];
          const category = list.find((cat) => cat.category_id === id);
          if (!category) return; // safety check

          const { offlineLogMode, conectionStatus } = useSyncStore.getState();
          if (offlineLogMode) {
            useSyncStore
              .getState()
              .logCategoryChange("update-category", id, category);
          }

          if (conectionStatus.isOnline) {
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
            if (!state.categoriesList) return;
            const category = state.categoriesList.find(
              (cat) => cat.category_id === categoryId,
            );
            if (category) category.category_title = newName;
          }),
        );
      },

      // # New helper: Set category invitation flag
      setCategoryInvitationFlag: (categoryId, bool) => {
        set(
          produce((state) => {
            if (!state.categoriesList) return;
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
            if (!state.categoriesList) state.categoriesList = [];
            state.categoriesList.push(category);
          }),
        );
      },

      // # New helper: Remove category by id
      removeCategoryById: (categoryId) => {
        set(
          produce((state) => {
            if (!state.categoriesList) return;
            state.categoriesList = state.categoriesList.filter(
              (cat) => cat.category_id !== categoryId,
            );
          }),
        );
      },

      // # New helper: Set categories list
      setCategoriesList: (categories) => {
        set(
          produce((state) => {
            state.categoriesList = categories;
          }),
        );
      },

      // #
      getCategoriesList: () => {
        return get().categoriesList ?? [];
      },

      resetStore: () => set(initialState),
    }),
    { name: "Category Store" },
  ),
);

export default useCategoryStore;
