import { produce } from 'immer';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
   addCategory,
   addTask,
   deleteCategory,
   deleteManyTask,
   deleteTask,
   getCategories,
   getTasks,
   updateCategory,
   updateTask,
} from './_lib/data-services';
import { defaultCategory, getDateNowIso } from './_lib/utils';

const initialState = {
   isSidebarOpen: false,
   isEditSidebarOpen: false,
   activeTask: {},
   isSyncing: false,
   offlineLogMode: false,
   conectionStatus: {}, // {isConected, isOnline, lastOnline}
   userInfo: {},
   tasksList: [],
   categoriesList: [defaultCategory], // we can push more
   changeLog: [],
   sortMethod: 'importance',
};

const useTaskStore = create(
   devtools(
      persist(
         (set, get) => ({
            isSidebarOpen: initialState.isSidebarOpen,
            isEditSidebarOpen: initialState.isEditSidebarOpen,
            activeTask: initialState.activeTask,
            isSyncing: initialState.isSyncing,
            offlineLogMode: initialState.offlineLogMode,
            conectionStatus: initialState.conectionStatus,
            userInfo: initialState.userInfo,
            tasksList: initialState.tasksList,
            changeLog: initialState.changeLog,
            sortMethod: initialState.sortMethod,
            categoriesList: initialState.categoriesList,

            // 0. Toggle sidebar
            toggleSidebar: () => {
               set(
                  produce((state) => {
                     state.isSidebarOpen = !state.isSidebarOpen;
                  })
               );
            },

            // 1. Toggle Edit sidebar
            toggleEditSidebar: () => {
               set(
                  produce((state) => {
                     state.isEditSidebarOpen = !state.isEditSidebarOpen;
                  })
               );
            },

            // 2. Add a task
            addTaskToStore: async (task) => {
               set(
                  produce((state) => {
                     // Add the task to LC
                     state.tasksList.push(task);
                     state.activeTask = task;

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) => !(log.type === 'add' && log.id === task.id)
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'add',
                           id: task.id,
                           logTime: task.createdAt,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const onlineStatus = get().conectionStatus.isOnline;
               if (onlineStatus) await addTask(task);
            },

            // 3. Delete a task
            deleteTaskFromStore: async (id) => {
               set(
                  produce((state) => {
                     const taskToDelete = state.tasksList.find(
                        (task) => task.id === id
                     );

                     // Set an active task if the active task is deleted
                     if (state.activeTask.id === id) {
                        const remainingTasks = state.tasksList.filter(
                           (task) => task.id !== id
                        );
                        state.activeTask =
                           remainingTasks.length > 0
                              ? remainingTasks[0] // Choose the first remaining task as active
                              : {};
                     }

                     // Delete the task from LC
                     state.tasksList = state.tasksList.filter(
                        (task) => task.id !== id
                     );

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'delete' &&
                                 log.id === taskToDelete.id
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'delete',
                           id: taskToDelete.id,
                           logTime: getDateNowIso(),
                           task: taskToDelete,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const onlineStatus = get().conectionStatus.isOnline;
               if (onlineStatus) await deleteTask(id);
            },

            //  Delete multiple tasks by category
            deleteTasksByCategory: async (categoryId) => {
               set(
                  produce((state) => {
                     const tasksToDelete = state.tasksList.filter(
                        (task) => task.categoryId === categoryId
                     );

                     const taskIdsToDelete = tasksToDelete.map(
                        (task) => task.id
                     );

                     // Set an active task if the active task is deleted
                     if (taskIdsToDelete.includes(state.activeTask.id)) {
                        const remainingTasks = state.tasksList.filter(
                           (task) => task.categoryId !== categoryId
                        );
                        state.activeTask =
                           remainingTasks.length > 0
                              ? remainingTasks[0] // Choose the first remaining task as active
                              : {};
                     }

                     // Filter out the tasks to be deleted from the local store
                     state.tasksList = state.tasksList.filter(
                        (task) => task.categoryId !== categoryId
                     );

                     // Add to change log only if offline
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'delete-by-category' &&
                                 log.id === categoryId
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'delete-by-category',
                           id: categoryId,
                           logTime: getDateNowIso(),
                           task: tasksToDelete,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await deleteManyTask(categoryId); // Call the API method for deleting multiple tasks
               }
            },

            // 4. Toggle to completed or uncompleted
            toggleCompleted: async (id) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task from LC
                     if (task) {
                        task.isCompleted = !task.isCompleted;
                        task.updatedAt = updateTime;
                        if (task.isCompleted) task.completedAt = updateTime;
                        if (!task.isCompleted) task.completedAt = null;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-isCompleted' &&
                                 log.id === task.id
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'update-isCompleted',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     {
                        isCompleted: task.isCompleted,
                        updatedAt: task.updatedAt,
                        completedAt: task.completedAt,
                     },
                     task.id
                  );
               }
            },

            // 5. Toggle to Starred or NOT Starred
            toggleStarred: async (id) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task from LC
                     if (task) {
                        task.isStarred = !task.isStarred;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-isStarred' &&
                                 log.id === task.id
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'update-isStarred',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { isStarred: task.isStarred, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 6. Update task note
            updateNote: async (id, note) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task from LC
                     if (task) {
                        task.note = note;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-note' &&
                                 log.id === task.id
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'update-note',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { note: task.note, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 7. Update task reminder
            updateReminder: async (id, reminder) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();
                     const isoDate =
                        reminder === null
                           ? null
                           : new Date(reminder).toISOString();

                     // Update the task reminder
                     if (task) {
                        task.reminder = isoDate;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-reminder' &&
                                 log.id === task.id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-reminder',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { reminder: task.reminder, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 8. Update task dueDate
            updateDueDate: async (id, dueDate) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();
                     const isoDate =
                        dueDate === null
                           ? null
                           : new Date(dueDate).toISOString();

                     // Update the task dueDate
                     if (task) {
                        task.dueDate = isoDate;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-dueDate' &&
                                 log.id === task.id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-dueDate',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { dueDate: task.dueDate, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 9. Update task repeat
            updateRepeat: async (id, repeat) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task repeat
                     if (task) {
                        task.repeat = repeat;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-repeat' &&
                                 log.id === task.id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-repeat',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { repeat: task.repeat, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 10. Toggle to "isAddedToMyDay" or NOT
            toggleAddedToMyDay: async (id) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task from LC
                     if (task) {
                        task.isAddedToMyDay = !task.isAddedToMyDay;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-isAddedToMyDay' &&
                                 log.id === task.id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-isAddedToMyDay',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     {
                        isAddedToMyDay: task.isAddedToMyDay,
                        updatedAt: task.updatedAt,
                     },
                     task.id
                  );
               }
            },

            // 11. Update the task title
            updateTitle: async (id, newTitle) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task from LC
                     if (task) {
                        task.title = newTitle;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if there is a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-title' &&
                                 log.id === task.id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-title',
                           id: task.id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { title: task.title, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 12. Add a new step to a task's steps
            addStep: async (taskId, newStep) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === taskId
                     );
                     const updateTime = getDateNowIso();

                     // Update the task locally
                     if (task) {
                        if (!task.steps) task.steps = []; // Initialize steps if not present
                        task.steps.push(newStep);
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline
                     if (state.offlineLogMode) {
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-steps' &&
                                 log.id === taskId
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-steps',
                           id: taskId,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((item) => item.id === taskId);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { steps: task.steps, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 13. Update a specific step of a specific task
            updateStep: async (taskId, stepId, updatedFields) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === taskId
                     );
                     const updateTime = getDateNowIso();

                     if (task && task.steps) {
                        const step = task.steps.find((s) => s.id === stepId);
                        if (step) {
                           // Update only the provided fields
                           Object.assign(step, updatedFields);
                           task.updatedAt = updateTime;
                        }
                     }

                     // Handle offline mode
                     if (state.offlineLogMode) {
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-steps' &&
                                 log.id === taskId &&
                                 log.stepId === stepId
                              )
                        );

                        // Save changes in the change log
                        state.changeLog.push({
                           type: 'update-steps',
                           id: taskId,
                           stepId,
                           logTime: updateTime,
                           updatedFields,
                        });
                     }
                  })
               );

               // Sync with the database
               const task = get().tasksList.find((item) => item.id === taskId);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { steps: task.steps, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 14. Remove a specific step from a specific task
            removeStep: async (taskId, stepId) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (item) => item.id === taskId
                     );
                     const updateTime = getDateNowIso();

                     if (task && task.steps) {
                        // Filter out the step with the given stepId
                        task.steps = task.steps.filter((s) => s.id !== stepId);
                        task.updatedAt = updateTime;
                     }

                     // Handle offline mode
                     if (state.offlineLogMode) {
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'delete-step' &&
                                 log.id === taskId &&
                                 log.stepId === stepId
                              )
                        );

                        // Save deletion in the change log
                        state.changeLog.push({
                           type: 'delete-step',
                           id: taskId,
                           stepId,
                           logTime: updateTime,
                        });
                     }
                  })
               );

               // Sync with the database
               const task = get().tasksList.find((item) => item.id === taskId);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { steps: task.steps, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 15. Add category
            addCategoryToStore: async (category) => {
               set(
                  produce((state) => {
                     // Extract existing category names
                     const existingNames = state.categoriesList.map(
                        (cat) => cat.title
                     );

                     // Match names with the pattern "Untitled list" or "Untitled list (n)"
                     const untitledRegex = /^Untitled list(?: \((\d+)\))?$/;
                     const usedNumbers = existingNames
                        .map((name) => {
                           const match = name.match(untitledRegex);
                           return match ? parseInt(match[1] || '0', 10) : null;
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
                           ? 'Untitled list'
                           : `Untitled list (${nextNumber})`;

                     // Assign the generated name
                     category.title = newName;

                     // Add the category to the local store
                     state.categoriesList.push(category);

                     // Handle offline log mode
                     if (state.offlineLogMode) {
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'add-category' &&
                                 log.id === category.id
                              )
                        );

                        state.changeLog.push({
                           type: 'add-category',
                           id: category.id,
                           logTime: getDateNowIso(),
                           category,
                        });
                     }
                  })
               );

               // Sync with the server if online
               const onlineStatus = get().conectionStatus.isOnline;
               if (onlineStatus) {
                  await addCategory(category);
               }
            },

            // 16. Update category
            updateCategoryInStore: async (id, updatedFields) => {
               set(
                  produce((state) => {
                     const category = state.categoriesList.find(
                        (cat) => cat.id === id
                     );
                     const updateTime = getDateNowIso();

                     if (category) {
                        Object.assign(category, updatedFields);
                        category.updatedAt = updateTime;
                     }

                     if (state.offlineLogMode) {
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(log.type === 'update-category' && log.id === id)
                        );

                        state.changeLog.push({
                           type: 'update-category',
                           id,
                           logTime: updateTime,
                           updatedFields,
                        });
                     }
                  })
               );

               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateCategory(updatedFields, id);
               }
            },

            // 17. Delete category
            deleteCategoryFromStore: async (id) => {
               set(
                  produce((state) => {
                     state.categoriesList = state.categoriesList.filter(
                        (cat) => cat.id !== id
                     );

                     if (state.offlineLogMode) {
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(log.type === 'delete-category' && log.id === id)
                        );

                        state.changeLog.push({
                           type: 'delete-category',
                           id,
                           logTime: getDateNowIso(),
                        });
                     }
                  })
               );

               const onlineStatus = get().conectionStatus.isOnline;
               if (onlineStatus) {
                  await deleteCategory(id);
               }
            },

            // 6. Fetching tasks from DB and Synchronizing localeStorage with the database
            syncLcWithDb: async () => {
               const tasks = await getTasks();
               const categories = await getCategories();

               set(
                  produce((state) => {
                     state.tasksList = tasks;
                     state.categoriesList = categories;
                  })
               );
            },

            // 7. Update health statuses
            // (receives the status from the HealthStatusSync component, whuch is a component to monitor database and internet connectivity status)
            updateConnectionStatus: (conectionStatus) => {
               set(
                  produce((state) => {
                     state.conectionStatus = conectionStatus;
                  })
               );
            },

            // 8. Set user's info
            setUserInfo: (userInfo) => {
               set(
                  produce((state) => {
                     state.userInfo = userInfo;
                  })
               );
            },

            // 9. Toggle offline log mode
            toggleOfflineLogMode: (bool) => {
               set(
                  produce((state) => {
                     state.offlineLogMode = bool;
                  })
               );
            },

            // 10. Clear changeLog
            clearLog: () => {
               set(
                  produce((state) => {
                     state.changeLog = initialState.changeLog;
                  })
               );
            },

            // 11. Toggle isSyncing
            toggleIsSyncing: (bool) => {
               set(
                  produce((state) => {
                     state.isSyncing = bool;
                  })
               );
            },

            //12. Set active task (To show in the EditSidebar)
            setActiveTask: (task) => {
               set(
                  produce((state) => {
                     state.activeTask = task;
                  })
               );
            },
            //12. Set active task (To show in the EditSidebar)
            setSortMethod: (sortMethod) => {
               set(
                  produce((state) => {
                     state.sortMethod = sortMethod;
                  })
               );
            },
         }),
         {
            name: 'todo[tasks-store]', // Key name for storage
            getStorage: () => localStorage, // Use localStorage for persisting the data
         }
      ),
      { name: 'Task Store' } // Redux DevTools name
   )
);

export default useTaskStore;
