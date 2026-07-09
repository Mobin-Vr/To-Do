import { produce } from "immer";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  addManyTasksAction,
  deleteManyTasksAction,
  updateManyTasksAction,
} from "../_lib/Actions";
import { TASK_SYNC_FAIL_TOAST_MSG } from "../_lib/configs";
import { logger } from "../_lib/logger";
import { getDateNowIso } from "../_lib/utils";
import useSyncStore from "./useSyncStore";

const initialState = {
  tasksList: [],
  activeTask: null,
  isEditSidebarOpen: false,
};

const useTaskStore = create(
  devtools(
    (set, get) => ({
      // State
      tasksList: initialState.tasksList,
      activeTask: initialState.activeTask,
      isEditSidebarOpen: initialState.isEditSidebarOpen,

      // # Add a task
      addTaskToStore: async (task) => {
        try {
          set(
            produce((state) => {
              state.tasksList.push(task);
            }),
          );

          const { offlineLogMode, conectionStatus } = useSyncStore.getState();
          if (offlineLogMode) {
            useSyncStore.getState().logTaskChange("add-task", task.task_id, task);
          }

          if (conectionStatus.isOnline) await addManyTasksAction([task]);
        } catch (error) {
          logger.error("Error adding task: ", error.message);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore.getState().pushErrorLog("addTaskToStore", error.message);
        }
      },

      // # Delete a task
      deleteTaskFromStore: async (id) => {
        try {
          const task = get().tasksList.find((t) => t.task_id === id);
          set(
            produce((state) => {
              state.tasksList = state.tasksList.filter(
                (t) => t.task_id !== id,
              );
            }),
          );

          const { offlineLogMode, conectionStatus } = useSyncStore.getState();
          if (offlineLogMode) {
            useSyncStore.getState().logTaskChange("delete-task", id, task);
          }

          if (conectionStatus.isOnline) await deleteManyTasksAction([id]);
        } catch (error) {
          logger.error("Error deleting task: ", error);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore.getState().pushErrorLog("deleteTaskFromStore", error.message);
        }
      },

      // # Update a task
      updateTaskInStore: async (taskId, updatedParts) => {
        try {
          set(
            produce((state) => {
              const task = state.tasksList.find(
                (task) => task.task_id === taskId,
              );
              if (!task) return;

              Object.assign(task, updatedParts, {
                task_updated_at: getDateNowIso(),
              });
            }),
          );

          const task = get().tasksList.find(
            (task) => task.task_id === taskId,
          );
          const { offlineLogMode, conectionStatus } = useSyncStore.getState();
          if (offlineLogMode) {
            useSyncStore.getState().logTaskChange("update-task", taskId, task);
          }

          if (conectionStatus.isOnline)
            await updateManyTasksAction([task], [task.task_id]);
        } catch (error) {
          logger.error("Error updating task: ", error);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore.getState().pushErrorLog("updateTaskInStore", error.message);
        }
      },

      // # Real-time: add task
      addTaskFromRealtime: (task) => {
        set(
          produce((state) => {
            const existed = state.tasksList.find(
              (item) => item.task_id === task.task_id,
            );
            if (!existed) state.tasksList.push(task);
          }),
        );
      },

      // # Real-time: update task
      updateTaskFromRealtime: (updatedTask) => {
        set(
          produce((state) => {
            const existedTask = state.tasksList.find(
              (item) => item.task_id === updatedTask.task_id,
            );
            if (existedTask) Object.assign(existedTask, updatedTask);
          }),
        );
      },

      // # Real-time: delete task
      deleteTaskFromRealtime: (deletedTask) => {
        set(
          produce((state) => {
            state.tasksList = state.tasksList.filter(
              (task) => task.task_id !== deletedTask.task_id,
            );
          }),
        );
      },

      // # Get task list
      getTaskList: () => {
        const tasksList = get().tasksList;
        return tasksList.length > 0 ? tasksList : null;
      },

      // # Set active task
      setActiveTask: (task) => {
        set(
          produce((state) => {
            state.activeTask = task;
          }),
        );
      },

      // # Handle active task sidebar
      handleActiveTaskSidebar: (selectedTask, e) => {
        if (
          e?.target?.closest(".complete-btn") ||
          e?.target?.closest(".star-btn")
        )
          return;

        const { isEditSidebarOpen, activeTask } = get();
        const isSameTask = selectedTask?.task_id === activeTask?.task_id;

        if (!isEditSidebarOpen) {
          set(
            produce((state) => {
              state.activeTask = selectedTask;
              state.isEditSidebarOpen = true;
            }),
          );
        } else if (isSameTask) {
          set(
            produce((state) => {
              state.isEditSidebarOpen = false;
              state.activeTask = null;
            }),
          );
        } else {
          set(
            produce((state) => {
              state.activeTask = selectedTask;
            }),
          );
        }
      },

      // # Toggle edit sidebar
      toggleEditSidebar: () => {
        set(
          produce((state) => {
            state.isEditSidebarOpen = !state.isEditSidebarOpen;
          }),
        );
      },

      // # New helper: Remove tasks by category id
      removeTasksByCategoryId: (categoryId) => {
        set(
          produce((state) => {
            state.tasksList = state.tasksList.filter(
              (task) => task.task_category_id !== categoryId,
            );
          }),
        );
      },

      // # New helper: Remove tasks by owner id
      removeTasksByOwnerId: (ownerId) => {
        set(
          produce((state) => {
            state.tasksList = state.tasksList.filter(
              (task) => task.task_owner_id !== ownerId,
            );
          }),
        );
      },

      // # New helper: Add tasks in bulk
      addTasksBulk: (tasks) => {
        set(
          produce((state) => {
            state.tasksList.push(...tasks);
          }),
        );
      },

      // # New helper: Reset active task (for resetOnReload)
      resetActiveTask: () => {
        set(
          produce((state) => {
            state.isEditSidebarOpen = false;
            state.activeTask = null;
          }),
        );
      },

      // # New helper: Set tasks list (for fetchDataOnMount)
      setTasksList: (tasks) => {
        set(
          produce((state) => {
            state.tasksList = tasks;
          }),
        );
      },

      resetStore: () => set(initialState),
    }),
    { name: "Task Store" },
  ),
);

export default useTaskStore;