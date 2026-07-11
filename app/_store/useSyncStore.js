import { produce } from "immer";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import {
  addManyTasksAction,
  deleteManyTasksAction,
  updateManyTasksAction,
  addManyCategoriesAction,
  deleteManyCategoriesAction,
  updateManyCategoriesAction,
  addManyErrorLogAction,
} from "@/app/_lib/Actions";

import { TASK_SYNC_FAIL_TOAST_MSG } from "@/app/_lib/configs";
import { logger } from "@/app/_lib/logger";

const initialState = {
  isSyncing: false,
  offlineLogMode: false,
  conectionStatus: {},
  changeLog: [],
  errorLog: [],
};

const useSyncStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        isSyncing: initialState.isSyncing,
        offlineLogMode: initialState.offlineLogMode,
        conectionStatus: initialState.conectionStatus,
        changeLog: initialState.changeLog,
        errorLog: initialState.errorLog,

        // # Update connection status
        updateConnectionStatus: (conectionStatus) => {
          set(
            produce((state) => {
              state.conectionStatus = conectionStatus;
            }),
          );
        },

        // # Toggle offline log mode
        toggleOfflineLogMode: (bool) => {
          set(
            produce((state) => {
              state.offlineLogMode = bool;
            }),
          );
        },

        // # Toggle isSyncing
        toggleIsSyncing: (bool) => {
          set(
            produce((state) => {
              state.isSyncing = bool;
            }),
          );
        },

        // # Clear changeLog
        clearLog: () => {
          set(
            produce((state) => {
              state.changeLog = [];
            }),
          );
        },

        // # Get connection status
        getConectionStatus: () => {
          return get().conectionStatus;
        },

        // # Log a task change (coalescing logic from original store)
        logTaskChange: (type, id, task) => {
          set(
            produce((state) => {
              if (type === "add-task") {
                state.changeLog.push({ type: "add-task", id, task });
                return;
              }

              const isAlreadyAddTaskInChangeLog = state.changeLog.some(
                (log) => log.id === id && log.type === "add-task",
              );

              if (isAlreadyAddTaskInChangeLog) {
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== id,
                );
                // No need to re‑log delete‑task – it cancels the local add
              } else {
                // Task exists in DB, so we log the actual operation
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== id,
                );
                state.changeLog.push({ type, id, task });
              }
            }),
          );
        },

        // # Log a category change (coalescing logic)
        logCategoryChange: (type, id, category) => {
          set(
            produce((state) => {
              if (type === "add-category") {
                state.changeLog.push({ type: "add-category", id, category });
                return;
              }

              const isAlreadyAddCategoryInChangeLog = state.changeLog.some(
                (log) => log.id === id && log.type === "add-category",
              );

              if (isAlreadyAddCategoryInChangeLog) {
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== id,
                );
              } else {
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== id,
                );
                state.changeLog.push({ type, id, category });
              }
            }),
          );
        },

        // # Centralized error logging
        pushErrorLog: async (method, message) => {
          const newError = { method, message };
          set(
            produce((state) => {
              const isDuplicate = state.errorLog.some(
                (err) =>
                  err.method === newError.method &&
                  err.message === newError.message,
              );
              if (!isDuplicate) state.errorLog.push(newError);
            }),
          );
          if (get().conectionStatus.isOnline) {
            await addManyErrorLogAction([newError]);
          }
        },

        // # Sync change log
        syncChangeLog: async () => {
          const changeLog = get().changeLog;
          const errorLog = get().errorLog;

          const groupedChanges = {
            "add-task": [],
            "delete-task": [],
            "update-task": [],
            "add-category": [],
            "delete-category": [],
            "update-category": [],
          };

          changeLog.forEach((log) => {
            if (groupedChanges[log.type]) {
              groupedChanges[log.type].push(log.task || log.category);
            }
          });

          try {
            get().toggleIsSyncing(true);

            if (groupedChanges["add-task"].length)
              await addManyTasksAction(groupedChanges["add-task"]);
            if (groupedChanges["update-task"].length)
              await updateManyTasksAction(
                groupedChanges["update-task"],
                groupedChanges["update-task"].map((task) => task.task_id),
              );
            if (groupedChanges["delete-task"].length)
              await deleteManyTasksAction(
                groupedChanges["delete-task"].map((task) => task.task_id),
              );
            if (groupedChanges["add-category"].length)
              await addManyCategoriesAction(groupedChanges["add-category"]);
            if (groupedChanges["update-category"].length)
              await updateManyCategoriesAction(
                groupedChanges["update-category"],
                groupedChanges["update-category"].map((cat) => cat.category_id),
              );
            if (groupedChanges["delete-category"].length)
              await deleteManyCategoriesAction(
                groupedChanges["delete-category"].map((cat) => cat.category_id),
              );
            if (errorLog.length) await addManyErrorLogAction(errorLog);

            get().clearLog();
          } catch (error) {
            logger.error("Error syncing and getting data from server:", error);
            toast.error(TASK_SYNC_FAIL_TOAST_MSG);
            await get().pushErrorLog("syncChangeLog", error.message);
          } finally {
            get().toggleIsSyncing(false);
          }
        },

        resetStore: () => {
          set(initialState);
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("sync-store");
          }
        },
      }),
      {
        name: "sync-store",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          changeLog: state.changeLog,
        }),
      },
    ),
    { name: "Sync Store" },
  ),
);

export default useSyncStore;
