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
} from "../_lib/Actions";

import {
  getReleventTasks,
  getReleventCategories,
  getOwnerInvitations,
  getJoinedInvitations,
} from "../_lib/read-actions";

import { TASK_SYNC_FAIL_TOAST_MSG } from "../_lib/configs";
import { logger } from "../_lib/logger";
import useCategoryStore from "./useCategoryStore";
import useInvitationStore from "./useInvitationStore";
import useTaskStore from "./useTaskStore";
import useUiStore from "./useUiStore";
import useUserStore from "./useUserStore";

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

              // For delete-task and update-task: check if an "add-task" entry exists
              const isAlreadyAddTaskInChangeLog = state.changeLog.some(
                (log) => log.id === id && log.type === "add-task",
              );

              if (isAlreadyAddTaskInChangeLog) {
                // Remove existing entries for this id
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== id,
                );
                // If it was only local (add-task), deleting means we just remove the log entry
                if (type === "delete-task") {
                  // No need to add a delete-task entry; just removing the add-task is enough
                } else {
                  // update-task on a locally-added task: re-add as add-task
                  state.changeLog.push({ type: "add-task", id, task });
                }
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

        // # Log a category change (coalescing logic from original store)
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
                if (type === "delete-category") {
                  // Just remove the add-category entry, no need to add delete
                } else {
                  state.changeLog.push({ type: "add-category", id, category });
                }
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

            if (groupedChanges["add-task"].length) {
              await addManyTasksAction(groupedChanges["add-task"]);
            }
            if (groupedChanges["update-task"].length) {
              await updateManyTasksAction(
                groupedChanges["update-task"],
                groupedChanges["update-task"].map((task) => task.task_id),
              );
            }
            if (groupedChanges["delete-task"].length) {
              await deleteManyTasksAction(
                groupedChanges["delete-task"].map((task) => task.task_id),
              );
            }
            if (groupedChanges["add-category"].length) {
              await addManyCategoriesAction(groupedChanges["add-category"]);
            }
            if (groupedChanges["update-category"].length) {
              await updateManyCategoriesAction(
                groupedChanges["update-category"],
                groupedChanges["update-category"].map((cat) => cat.category_id),
              );
            }
            if (groupedChanges["delete-category"].length) {
              await deleteManyCategoriesAction(
                groupedChanges["delete-category"].map((cat) => cat.category_id),
              );
            }
            if (errorLog.length) {
              await addManyErrorLogAction(errorLog);
            }

            get().clearLog();
          } catch (error) {
            logger.error("Error syncing and getting data from server:", error);
            toast.error(TASK_SYNC_FAIL_TOAST_MSG);
            await get().pushErrorLog("syncChangeLog", error.message);
          } finally {
            get().toggleIsSyncing(false);
          }
        },

        // # Fetch data on mount
        fetchDataOnMount: async () => {
          try {
            const userId = useUserStore.getState().userState?.user_id;
            if (!userId) return;

            const [
              fetchedTasks,
              fetchedCategories,
              fetchedOwnerInvs,
              fetchedJoinedInvs,
            ] = await Promise.all([
              getReleventTasks(),
              getReleventCategories(),
              getOwnerInvitations(),
              getJoinedInvitations(),
            ]);

            // Remove duplicates
            const seenTaskIds = new Set();
            const uniqueTasks = fetchedTasks.filter((task) => {
              if (!seenTaskIds.has(task.task_id)) {
                seenTaskIds.add(task.task_id);
                return true;
              }
              return false;
            });

            const seenCategoryIds = new Set();
            const uniqueCategories = fetchedCategories.filter((category) => {
              if (!seenCategoryIds.has(category.category_id)) {
                seenCategoryIds.add(category.category_id);
                return true;
              }
              return false;
            });

            const seenOwnerInvIds = new Set();
            const uniqueOwnerInvs = fetchedOwnerInvs.filter((inv) => {
              if (!seenOwnerInvIds.has(inv.invitation_id)) {
                seenOwnerInvIds.add(inv.invitation_id);
                return true;
              }
              return false;
            });

            const seenJoinedInvIds = new Set();
            const uniqueJoinedInvs = fetchedJoinedInvs.filter((inv) => {
              if (!seenJoinedInvIds.has(inv.invitation_id)) {
                seenJoinedInvIds.add(inv.invitation_id);
                return true;
              }
              return false;
            });

            // Filter out duplicates with existing data
            const currentTasks = useTaskStore.getState().tasksList || [];
            const currentCategories =
              useCategoryStore.getState().categoriesList || [];
            const currentInvitations =
              useInvitationStore.getState().invitations || [];
            const currentSharedWithMe =
              useInvitationStore.getState().sharedWithMe || [];

            const nonDuplicateTasks = currentTasks.filter(
              (task) => !uniqueTasks.some((t) => t.task_id === task.task_id),
            );
            const nonDuplicateCategories = currentCategories.filter(
              (category) =>
                !uniqueCategories.some(
                  (c) => c.category_id === category.category_id,
                ),
            );
            const nonDuplicateOwnerInvs = currentInvitations.filter(
              (inv) =>
                !uniqueOwnerInvs.some(
                  (i) => i.invitation_id === inv.invitation_id,
                ),
            );
            const nonDuplicateJoinedInvs = currentSharedWithMe.filter(
              (inv) =>
                !uniqueJoinedInvs.some(
                  (i) => i.invitation_id === inv.invitation_id,
                ),
            );

            // Remove owner from sharedWith
            const updatedOwnerInvs = uniqueOwnerInvs.map((invitation) => ({
              ...invitation,
              sharedWith: invitation.sharedWith.filter(
                (user) => user.user_id !== userId,
              ),
            }));

            // Set data in respective stores
            useTaskStore
              .getState()
              .setTasksList([...nonDuplicateTasks, ...uniqueTasks]);
            useCategoryStore
              .getState()
              .setCategoriesList([
                ...nonDuplicateCategories,
                ...uniqueCategories,
              ]);
            useInvitationStore
              .getState()
              .setInvitations([...nonDuplicateOwnerInvs, ...updatedOwnerInvs]);
            useInvitationStore
              .getState()
              .setSharedWithMe([
                ...nonDuplicateJoinedInvs,
                ...uniqueJoinedInvs,
              ]);

            useUiStore.getState().setShowpinner(false);
          } catch (error) {
            logger.error("Error syncing and getting data from server:", error);
            toast.error(TASK_SYNC_FAIL_TOAST_MSG);
            await get().pushErrorLog("fetchDataOnMount", error.message);
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
