import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  createInvitationAction,
  getRelevantTasksAction,
  getUsersByInvitationAction,
  joinInvitationAction,
  removeUserFromInvitationAction,
  setInvitationAccessLimitAction,
  stopSharingInvitationAction,
} from "./_lib/Actions";
import { defaultCategory } from "./_lib/configs";
import {
  addCategory,
  addTask,
  deleteCategory,
  deleteTask,
  getCategories,
  updateCategory,
  updateTask,
} from "./_lib/data-services";
import { delay, getDateNowIso } from "./_lib/utils";

const initialState = {
  sortMethod: "importance",
  sortMethodForShared: "creationDate",
  isSidebarOpen: false,
  isEditSidebarOpen: false,
  isSyncing: false,
  offlineLogMode: false,
  editTitleWhileCreating: false, // Auto-focus the textarea for renaming only when creating a new list.
  activeTask: {},
  conectionStatus: {}, // {isConected, isOnline, lastOnline}
  changeLog: [],
  userState: {},
  tasksList: [],
  categoriesList: [defaultCategory], // we can push more
  invitations: [], // this is just for owner: each object : {invitationId, categoryId, categoryTitle, ownerId, limitAccess, [sharedWith]}
  sharedWithMe: [], // this is for the second user: each object : {invitationId, categoryId, categoryTitle, ownerId, tasks: [{full object of tasks}] }

  // Delete modal:
  isDeleteModalOpen: false,
  deletingType: "", // task, category, step
  deletingItemName: "",
  deleteCallback: null,
};

const useTaskStore = create(
  devtools(
    persist(
      (set, get) => ({
        sortMethod: initialState.sortMethod,
        sortMethodForShared: initialState.sortMethodForShared,
        isSidebarOpen: initialState.isSidebarOpen,
        isEditSidebarOpen: initialState.isEditSidebarOpen,
        isSyncing: initialState.isSyncing,
        offlineLogMode: initialState.offlineLogMode,
        editTitleWhileCreating: initialState.editTitleWhileCreating,
        activeTask: initialState.activeTask,
        conectionStatus: initialState.conectionStatus,
        changeLog: initialState.changeLog,
        userState: initialState.userState,
        tasksList: initialState.tasksList,
        categoriesList: initialState.categoriesList,
        invitations: initialState.invitations,
        sharedWithMe: initialState.sharedWithMe,
        isDeleteModalOpen: initialState.isDeleteModalOpen,
        deletingType: initialState.deletingType,
        deletingItemName: initialState.deletingItemName,
        deleteCallback: initialState.deleteCallback,

        // # Toggle sidebar
        toggleSidebar: () => {
          set(
            produce((state) => {
              state.isSidebarOpen = !state.isSidebarOpen;
            }),
          );
        },

        // # Toggle Edit sidebar
        toggleEditSidebar: () => {
          set(
            produce((state) => {
              state.isEditSidebarOpen = !state.isEditSidebarOpen;
            }),
          );
        },

        // # Toggle Edit sidebar
        handleActiveTaskSidebar: async (selectedTask, e) => {
          if (
            e?.target?.closest(".complete-btn") ||
            e?.target?.closest(".star-btn")
          )
            return;

          const { isEditSidebarOpen, activeTask, tasksList } = get();
          const cond = selectedTask?.task_id === activeTask?.task_id;

          set(
            produce((state) => {
              if (!isEditSidebarOpen) {
                state.activeTask = selectedTask;
                state.isEditSidebarOpen = true;
              } else if (isEditSidebarOpen && cond) {
                state.isEditSidebarOpen = false;
                state.activeTask = tasksList[0] || null;
              } else if (isEditSidebarOpen && !cond) {
                state.isEditSidebarOpen = false;
              }
            }),
          );

          if (isEditSidebarOpen && !cond) {
            await delay(200);
            set(
              produce((state) => {
                state.activeTask = selectedTask;
                state.isEditSidebarOpen = true;
              }),
            );
          }
        },

        // # Add a task
        addTaskToStore: async (task) => {
          set(
            produce((state) => {
              // Add the task to LC
              state.tasksList.push(task);

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) => !(log.type === "add" && log.id === task.task_id),
                );

                // Save the chenges log
                state.changeLog.push({
                  type: "add",
                  id: task.task_id,
                  logTime: task.createdAt,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const onlineStatus = get().conectionStatus.isOnline;
          if (onlineStatus) await addTask(task);
        },

        // # Delete a task
        deleteTaskFromStore: async (id) => {
          set(
            produce((state) => {
              const taskToDelete = state.tasksList.find(
                (task) => task.task_id === id,
              );

              // Delete the task from LC
              state.tasksList = state.tasksList.filter(
                (task) => task.task_id !== id,
              );

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(log.type === "delete" && log.id === taskToDelete.id),
                );

                // Save the chenges log
                state.changeLog.push({
                  type: "delete",
                  id: taskToDelete.id,
                  logTime: getDateNowIso(),
                  task: taskToDelete,
                });
              }
            }),
          );

          // Synchronizing with the database
          const onlineStatus = get().conectionStatus.isOnline;
          if (onlineStatus) await deleteTask(id);
        },

        // # Toggle to completed or uncompleted
        toggleCompleted: async (id) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);
              const updateTime = getDateNowIso();

              // Update the task from LC
              if (task) {
                task.is_task_completed = !task.is_task_completed;
                task.task_updated_at = updateTime;
                if (task.is_task_completed) task.task_completed_at = updateTime;

                if (!task.is_task_completed) task.task_completed_at = null;
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(
                      log.type === "update-isCompleted" &&
                      log.id === task.task_id
                    ),
                );

                // Save the chenges log
                state.changeLog.push({
                  type: "update-isCompleted",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                is_task_completed: task.is_task_completed,
                task_updated_at: task.task_updated_at,
                task_completed_at: task.task_completed_at,
              },
              task.task_id,
            );
          }
        },

        // # Toggle to Starred or NOT Starred
        toggleStarred: async (id) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);
              const updateTime = getDateNowIso();

              // Update the task from LC
              if (task) {
                task.is_task_starred = !task.is_task_starred;
                task.task_updated_at = updateTime;
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(
                      log.type === "update-isStarred" && log.id === task.task_id
                    ),
                );

                // Save the chenges log
                state.changeLog.push({
                  type: "update-isStarred",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                is_task_starred: task.is_task_starred,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Update task note
        updateNote: async (id, note) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);
              const updateTime = getDateNowIso();

              // Update the task from LC
              if (task) {
                task.task_note = note;
                task.task_updated_at = updateTime;
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(log.type === "update-note" && log.id === task.task_id),
                );

                // Save the chenges log
                state.changeLog.push({
                  type: "update-note",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_note: task.task_note,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Update task reminder
        updateReminder: async (id, reminder) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);

              const updateTime = getDateNowIso();
              const isoDate =
                reminder === null ? null : new Date(reminder).toISOString();

              // Update the task reminder
              if (task) {
                task.task_reminder = isoDate;
                task.task_updated_at = updateTime;
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(
                      log.type === "update-reminder" && log.id === task.task_id
                    ),
                );

                // Save the changes log
                state.changeLog.push({
                  type: "update-reminder",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_reminder: task.task_reminder,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Update task dueDate
        updateDueDate: async (id, dueDate) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);

              const updateTime = getDateNowIso();
              const isoDate =
                dueDate === null ? null : new Date(dueDate).toISOString();

              // Update the task dueDate
              if (task) {
                task.task_due_date = isoDate;
                task.task_updated_at = updateTime;

                if (isoDate === null) task.task_repeat = null; // Set repeat to null as, well when the due date becomes null.
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(log.type === "update-dueDate" && log.id === task.task_id),
                );

                // Save the changes log
                state.changeLog.push({
                  type: "update-dueDate",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_due_date: task.task_due_date,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Update task repeat
        updateRepeat: async (id, repeat) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);
              const updateTime = getDateNowIso();

              // Update the task repeat
              if (task) {
                task.task_repeat = repeat;
                task.task_updated_at = updateTime;
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(log.type === "update-repeat" && log.id === task.task_id),
                );

                // Save the changes log
                state.changeLog.push({
                  type: "update-repeat",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_repeat: task.task_repeat,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Toggle to "is_task_in_myday" or NOT
        toggleAddedToMyDay: async (id) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);

              const updateTime = getDateNowIso();

              // Update the task from LC
              if (task) {
                task.is_task_in_myday = !task.is_task_in_myday;
                task.task_updated_at = updateTime;
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(
                      log.type === "update-isAddedToMyDay" &&
                      log.id === task.task_id
                    ),
                );

                // Save the changes log
                state.changeLog.push({
                  type: "update-isAddedToMyDay",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                is_task_in_myday: task.is_task_in_myday,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Update the task title
        updateTitle: async (id, newTitle) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);
              const updateTime = getDateNowIso();

              // Update the task from LC
              if (task) {
                task.task_title = newTitle;
                task.task_updated_at = updateTime;
              }

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if there is a record in log with the same ID and TYPE
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(log.type === "update-title" && log.id === task.task_id),
                );

                // Save the changes log
                state.changeLog.push({
                  type: "update-title",
                  id: task.task_id,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === id);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_title: task.task_title,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Get the last tasklist
        getTaskList: () => {
          const tasksList = get().tasksList;

          return tasksList.length > 0 ? tasksList : null;
        },

        // # Get the last tasklist
        getConectionStatus: () => {
          return get().conectionStatus;
        },

        /////////////////////////////
        /////////////////////////////
        /////////// Step ////////////
        /////////////////////////////
        /////////////////////////////

        // # Add a new step to a task's steps
        addStep: async (taskId, newStep) => {
          set(
            produce((state) => {
              const task = state.tasksList.find(
                (task) => task.task_id === taskId,
              );
              const updateTime = getDateNowIso();

              // Update the task locally
              if (task) {
                if (!task.task_steps) task.task_steps = []; // Initialize steps if not present
                task.task_steps.push(newStep);
                task.task_updated_at = updateTime;
              }

              // Add to change log only if offline
              if (state.offlineLogMode) {
                state.changeLog = state.changeLog.filter(
                  (log) => !(log.type === "update-steps" && log.id === taskId),
                );

                // Save the changes log
                state.changeLog.push({
                  type: "update-steps",
                  id: taskId,
                  logTime: updateTime,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === taskId);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_steps: task.task_steps,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Update a specific step of a specific task
        updateStep: async (taskId, stepId, updatedFields) => {
          set(
            produce((state) => {
              const task = state.tasksList.find(
                (task) => task.task_id === taskId,
              );
              const updateTime = getDateNowIso();

              if (task && task.task_steps) {
                const step = task.task_steps.find((s) => s.step_id === stepId);

                if (step) {
                  // Update only the provided fields
                  Object.assign(step, updatedFields);
                  task.task_updated_at = updateTime;
                }
              }

              // Handle offline mode
              if (state.offlineLogMode) {
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(
                      log.type === "update-steps" &&
                      log.id === taskId &&
                      log.stepId === stepId
                    ),
                );

                // Save changes in the change log
                state.changeLog.push({
                  type: "update-steps",
                  id: taskId,
                  stepId,
                  logTime: updateTime,
                  updatedFields,
                });
              }
            }),
          );

          // Sync with the database
          const task = get().tasksList.find((task) => task.task_id === taskId);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_steps: task.task_steps,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        // # Remove a specific step from a specific task
        removeStep: async (taskId, stepId) => {
          set(
            produce((state) => {
              const task = state.tasksList.find(
                (task) => task.task_id === taskId,
              );
              const updateTime = getDateNowIso();

              if (task && task.task_steps) {
                // Filter out the step with the given stepId
                task.task_steps = task.task_steps.filter(
                  (s) => s.step_id !== stepId,
                );
                task.task_updated_at = updateTime;
              }

              // Handle offline mode
              if (state.offlineLogMode) {
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(
                      log.type === "delete-step" &&
                      log.id === taskId &&
                      log.stepId === stepId
                    ),
                );

                // Save deletion in the change log
                state.changeLog.push({
                  type: "delete-step",
                  id: taskId,
                  stepId,
                  logTime: updateTime,
                });
              }
            }),
          );

          // Sync with the database
          const task = get().tasksList.find((task) => task.task_id === taskId);
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateTask(
              {
                task_steps: task.task_steps,
                task_updated_at: task.task_updated_at,
              },
              task.task_id,
            );
          }
        },

        /////////////////////////////
        /////////////////////////////
        //////// Category ///////////
        /////////////////////////////
        /////////////////////////////

        // # Add category
        addCategoryToStore: async (category) => {
          set(
            produce((state) => {
              // Extract existing category names
              const existingNames = state.categoriesList.map(
                (cat) => cat.category_title,
              );

              // Match names with the pattern "Untitled list" or "Untitled list (n)"
              const untitledRegex = /^Untitled list(?: \((\d+)\))?$/;
              const usedNumbers = existingNames
                .map((name) => {
                  const match = name.match(untitledRegex);
                  return match ? parseInt(match[1] || "0", 10) : null;
                })
                .filter((num) => num !== null);

              // Determine the smallest available number
              let nextNumber = 0;
              while (usedNumbers.includes(nextNumber)) {
                nextNumber++;
              }

              // Generate the name based on the smallest available number
              const newName =
                nextNumber === 0
                  ? "Untitled list"
                  : `Untitled list (${nextNumber})`;

              // Assign the generated name
              category.category_title = newName;

              // Add the category to the local store
              state.categoriesList.push(category);

              // Handle offline log mode
              if (state.offlineLogMode) {
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    !(
                      log.type === "add-category" &&
                      log.id === category.category_id
                    ),
                );

                state.changeLog.push({
                  type: "add-category",
                  id: category.category_id,
                  logTime: getDateNowIso(),
                  category,
                });
              }
            }),
          );

          // Sync with the server if online
          const onlineStatus = get().conectionStatus.isOnline;
          if (onlineStatus) {
            await addCategory(category);
          }
        },

        // # Update category
        updateCategoryInStore: async (id, updatedFields) => {
          set(
            produce((state) => {
              const category = state.categoriesList.find(
                (cat) => cat.category_id === id,
              );
              const updateTime = getDateNowIso();

              if (category) {
                Object.assign(category, updatedFields);
                category.updatedAt = updateTime;
              }

              if (state.offlineLogMode) {
                state.changeLog = state.changeLog.filter(
                  (log) => !(log.type === "update-category" && log.id === id),
                );

                state.changeLog.push({
                  type: "update-category",
                  id,
                  logTime: updateTime,
                  updatedFields,
                });
              }
            }),
          );

          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) {
            await updateCategory(updatedFields, id);
          }
        },

        // # Delete category
        deleteCategoryFromStore: async (id) => {
          set(
            produce((state) => {
              // Remove the category from the list
              state.categoriesList = state.categoriesList.filter(
                (cat) => cat.category_id !== id,
              );

              // Filter out tasks related to the deleted category
              const tasksToDelete = state.tasksList.filter(
                (task) => task.task_category_id === id,
              );

              state.tasksList = state.tasksList.filter(
                (task) => task.task_category_id !== id,
              );

              // Add changes to the offline log if offline mode is enabled
              if (state.offlineLogMode) {
                // Remove existing logs related to this category
                state.changeLog = state.changeLog.filter(
                  (log) =>
                    log.id !== id ||
                    !["delete-category", "delete-by-category"].includes(
                      log.type,
                    ),
                );

                // Save category deletion log
                state.changeLog.push({
                  type: "delete-category",
                  id,
                  logTime: getDateNowIso(),
                });

                // Save task deletion log if there are deleted tasks
                if (tasksToDelete.length > 0) {
                  state.changeLog.push({
                    type: "delete-by-category",
                    id,
                    logTime: getDateNowIso(),
                    task: tasksToDelete,
                  });
                }
              }
            }),
          );

          // Synchronize with the database if online
          if (get().conectionStatus.isOnline) {
            await deleteCategory(id); // Delete multiple tasks by category only from the store. Tasks in the database will be deleted automatically due to cascading when the category is deleted, so there is no need.
          }
        },

        // Toggles the focus state for the title when creating a new list.
        toggleTitleFocus: (bool) =>
          set(
            produce((state) => {
              state.editTitleWhileCreating = bool;
            }),
          ),

        //////////////////////////
        //////////////////////////
        //////// other ///////////
        //////////////////////////
        //////////////////////////

        // # Fetching tasks from DB and Synchronizing localeStorage with the database
        syncLcWithDb: async () => {
          const userId = get().userState.user_id;

          // This will get all relevent tasks on every reload (shared + owned)
          const tasks = await getRelevantTasksAction(userId);

          const categories = await getCategories(userId);

          //  Filter out tasks that already exist in the tasksList
          const newTasks = tasks.filter(
            (task) => !get().tasksList.some((t) => t.task_id === task.task_id),
          );

          // Filter out categories that already exist in the categoriesList
          const newCategories = categories.filter(
            (category) =>
              !get().categoriesList.some(
                (c) => c.category_id === category.category_id,
              ),
          );

          set(
            produce((state) => {
              //  Add only the new tasks and categories to the lists
              state.tasksList.push(...newTasks);
              state.categoriesList.push(...newCategories);
            }),
          );
        },

        // # Update health statuses
        // (receives the status from the HealthStatusSync component, whuch is a component to monitor database and internet connectivity status)
        updateConnectionStatus: (conectionStatus) => {
          set(
            produce((state) => {
              state.conectionStatus = conectionStatus;
            }),
          );
        },

        // Set user's info
        setuserState: (userState) => {
          set(
            produce((state) => {
              state.userState = userState;
            }),
          );
        },

        // Toggle offline log mode
        toggleOfflineLogMode: (bool) => {
          set(
            produce((state) => {
              state.offlineLogMode = bool;
            }),
          );
        },

        // # Clear changeLog
        clearLog: () => {
          set(
            produce((state) => {
              state.changeLog = initialState.changeLog;
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

        // # Set active task (To show in the EditSidebar)
        setActiveTask: (task) => {
          set(
            produce((state) => {
              state.activeTask = task;
            }),
          );
        },

        // # Set active task (To show in the EditSidebar)
        setSortMethod: (sortMethod) => {
          set(
            produce((state) => {
              state.sortMethod = sortMethod;
              state.sortMethodForShared = sortMethod;
            }),
          );
        },

        getUserState: () => {
          return get().userState;
        },

        getCategoriesList: () => {
          return get().categoriesList;
        },

        //////////////////////////////////////
        /////////////////////////////////////
        //////////// INVITATION /////////////
        /////////////////////////////////////
        /////////////////////////////////////

        // # Create invitation
        createInvitationInStore: async (categoryId) => {
          const userState = get().userState;

          try {
            const token = await createInvitationAction(
              categoryId,
              userState.user_id,
            );

            const baseUrl =
              process.env.NODE_ENV === "production"
                ? `https://${process.env.VERCEL_URL}`
                : process.env.NEXT_PUBLIC_BASE_URL;

            const invitationLink = `${baseUrl}/tasks/invite?token=${token}`;

            set(
              produce((state) => {
                const theCat = state.categoriesList.find(
                  (cat) => cat.category_id === categoryId,
                );

                if (theCat) theCat.has_category_invitation = true;

                state.invitations.push({
                  invitation_id: token,
                  invitation_category_id: categoryId,
                  invitation_owner_id: userState.user_id,
                  invitation_limit_access: false,
                  invitation_created_at: new Date().toISOString(),
                  invitation_link: invitationLink, // This is not in the DB "inavtion" table
                  sharedWith: [], // This is not in the DB "inavtion" table
                });
              }),
            );

            return {
              status: true,
              message: "the invation link has been created",
            }; // this is for some management in "SharedListModal" component
          } catch (error) {
            return { status: false, message: error.message }; // this is for some management in "SharedListModal" component
            console.error(error.message);
          }
        },

        // # Remove user
        removeUserFromInvitationStore: async (invitationId, userId) => {
          const owner = get().userState;

          try {
            await removeUserFromInvitationAction(
              invitationId,
              userId,
              owner.user_id,
            );

            set(
              produce((state) => {
                const invitation = state.invitations.find(
                  (inv) => inv.invitation_id === invitationId,
                );

                if (invitation) {
                  invitation.sharedWith = invitation?.sharedWith.filter(
                    (user) => user.user_id !== userId,
                  );
                }
              }),
            );
          } catch (error) {
            console.error(error.message);
          }
        },

        // # Set access limit
        setInvitationAccessLimitInStore: async (categoryId) => {
          const owner = get().userState;

          const { invitation_limit_access } = get().invitations.find(
            (inv) => inv.invitation_category_id === categoryId,
          );

          const { invitation_id } = get().invitations.find(
            (inv) => inv.invitation_category_id === categoryId,
          );

          try {
            await setInvitationAccessLimitAction(
              invitation_id,
              owner.user_id,
              !invitation_limit_access,
            );

            set(
              produce((state) => {
                const invitation = state.invitations.find(
                  (inv) => inv.invitation_id === invitation_id,
                );

                if (invitation) {
                  invitation.invitation_limit_access = !invitation_limit_access;
                }
              }),
            );
          } catch (error) {
            console.error(error.message);
          }
        },

        // # Stop sharing
        stopSharingInvitationInStore: async (categoryId) => {
          const owner = get().userState;

          const { invitation_id } = get().invitations.find(
            (inv) => inv.invitation_category_id === categoryId,
          );

          try {
            await stopSharingInvitationAction(invitation_id, owner.user_id);

            set(
              produce((state) => {
                const theCat = state.categoriesList.find(
                  (cat) => cat.category_id === categoryId,
                );

                if (theCat) theCat.has_category_invitation = false;

                state.invitations = state.invitations.filter(
                  (inv) => inv.invitation_id !== invitation_id,
                );
              }),
            );
          } catch (error) {
            console.error(error.message);
          }
        },

        // # Get list's users
        getUsersByInvitationInStore: async (invitationId) => {
          const owner = get().userState;

          try {
            const users = await getUsersByInvitationAction(
              invitationId,
              owner.user_id,
            );

            set(
              produce((state) => {
                const invitation = state.invitations.find(
                  (inv) => inv.invitation_id === invitationId,
                );

                if (invitation) invitation.sharedWith = users;
              }),
            );
          } catch (error) {
            console.error(error.message);
          }
        },

        // # Joining to a list with token
        joinInvitationInStore: async (invitationId) => {
          const userState = get().userState;

          try {
            // Check if the invitation already exists
            const existingInvitation = get().sharedWithMe.find(
              (item) => item.invitation_id === invitationId,
            );

            if (existingInvitation) {
              return {
                status: true,
                categoryId: existingInvitation.invitation_category_id,
              };
            }

            // Request invitation details and relevent tasks
            const { category, tasks } = await joinInvitationAction(
              invitationId,
              userState.user_id,
            );

            // Add new invitation if not existing
            set(
              produce((state) => {
                state.sharedWithMe.push({
                  invitation_id: invitationId,
                  invitation_category_id: category.category_id,
                  invitation_category_owner_id: category.category_owner_id,
                  invitation_tasks: tasks,
                });

                // Add tasks and categories to the store
                state.tasksList.push(...tasks);
                state.categoriesList.push(category);
              }),
            );

            return { status: true, categoryId: category.category_id };
          } catch (error) {
            console.error(error.message);
            return { status: false, message: error.message };
          }
        },

        // # Get the last shared item from the sharedWithMe list
        getSharedWithMe: () => {
          const sharedList = get().sharedWithMe;

          return sharedList.length > 0 ? sharedList : null;
        },

        // # Get the last invitations object
        getInvitations: () => {
          const invitations = get().invitations;

          return invitations.length > 0 ? invitations : null;
        },

        /////////////////////////////
        /////////////////////////////
        //////// Real time /////////
        /////////////////////////////
        /////////////////////////////

        // # Add task to taskslist from realtime db
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

        // # Update task in taskslist from realtime db
        updateTaskFromRealtime: (updatedTask) => {
          set(
            produce((state) => {
              const taskIndex = state.tasksList.findIndex(
                (item) => item.task_id === updatedTask.task_id,
              );

              if (taskIndex !== -1) state.tasksList[taskIndex] = updatedTask;
            }),
          );
        },

        // # Delete task from taskslist from realtime db
        deleteTaskFromRealtime: (deletedTask) => {
          set(
            produce((state) => {
              state.tasksList = state.tasksList.filter(
                (task) => task.task_id !== deletedTask.task_id,
              );
            }),
          );
        },

        // # Add joined user to the invation.sharedWith, from realtime db
        addUserFromRealtime: (invitationId, user) => {
          set(
            produce((state) => {
              const theInvitation = state.invitations.find(
                (inv) => inv.invitation_id === invitationId,
              );

              const existed = theInvitation?.sharedWith.find(
                (item) => item.user_id === user.user_id,
              );

              if (!existed) theInvitation?.sharedWith.push(user);
            }),
          );
        },

        // Function to remove the user when the requester is the owner
        removeUserWhenOwner: (invitationId, userId) => {
          set(
            produce((state) => {
              // Find the invitation by invitationId
              const invitation = state.invitations.find(
                (inv) => inv.invitation_id === invitationId,
              );

              if (invitation) {
                // Remove the user from the sharedWith list
                invitation.sharedWith = invitation.sharedWith.filter(
                  (item) => item.user_id !== userId,
                );

                // Remove the user's tasks from tasksList
                state.tasksList = state.tasksList.filter(
                  (task) => task.task_owner_id !== userId,
                );
              }
            }),
          );
        },

        // Function to remove the user when the requester is not the owner
        removeUserWhenNotOwner: (invitationId) => {
          set(
            produce((state) => {
              const theSharedCat = state.sharedWithMe.find(
                (l) => l.invitation_id === invitationId,
              );

              if (theSharedCat) {
                // Remove the category's tasks from tasksList
                state.tasksList = state.tasksList.filter(
                  (task) =>
                    task.task_category_id !==
                    theSharedCat.invitation_category_id,
                );

                // Remove the category from categoriesList
                state.categoriesList = state.categoriesList.filter(
                  (cat) =>
                    cat.category_id !== theSharedCat.invitation_category_id,
                );

                // Remove the entire invitation object from sharedWithMe
                state.sharedWithMe = state.sharedWithMe.filter(
                  (sharedItem) => sharedItem.invitation_id !== invitationId,
                );
              }
            }),
          );
        },

        // update category name for none owner collborators
        updateCategoryNameFromRealTime: (categoryId, newName) =>
          set(
            produce((state) => {
              const category = state.categoriesList.find(
                (cat) => cat.category_id === categoryId,
              );

              const sharedCategory = state.sharedWithMe.find(
                (list) => list.invitation_category_id === categoryId,
              );

              if (sharedCategory) sharedCategory.category_title = newName;

              if (category) category.category_title = newName;
            }),
          ),

        //////////////////////////
        //////////////////////////
        ////// Delete Modal //////
        //////////////////////////
        //////////////////////////

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
      }),
      {
        name: "Todo Store", // Key name for storage
        getStorage: () => localStorage, // Use localStorage for persisting the data
      },
    ),
    { name: "Todo Store" }, // Redux DevTools name
  ),
);

export default useTaskStore;
