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
   getTasksByInvitation,
   updateCategory,
   updateTask,
} from './_lib/data-services';
import { defaultCategory, getDateNowIso } from './_lib/utils';
import {
   joinInvitationAction,
   createInvitationAction,
   getUsersByInvitationAction,
   removeUserFromInvitationAction,
   setInvitationAccessLimitAction,
   stopSharingInvitationAction,
} from './_lib/invitationActions';
import { redirect } from 'next/navigation';

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
   invitations: [], // each object : {invitationId, categoryId, categoryTitle, ownerId, limitAccess, [sharedWith]}
   sharedWithMe: [], // each object : {invitationId, categoryId, categoryTitle, ownerId, tasks: [{full object of tasks}] }
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
            invitations: initialState.invitations,
            sharedWithMe: initialState.sharedWithMe,

            // # Toggle sidebar
            toggleSidebar: () => {
               set(
                  produce((state) => {
                     state.isSidebarOpen = !state.isSidebarOpen;
                  })
               );
            },

            // # Toggle Edit sidebar
            toggleEditSidebar: () => {
               set(
                  produce((state) => {
                     state.isEditSidebarOpen = !state.isEditSidebarOpen;
                  })
               );
            },

            // # Add a task
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
                           (log) =>
                              !(log.type === 'add' && log.id === task.task_id)
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'add',
                           id: task.task_id,
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

            // # Delete a task
            deleteTaskFromStore: async (id) => {
               set(
                  produce((state) => {
                     const taskToDelete = state.tasksList.find(
                        (task) => task.task_id === id
                     );

                     // Set an active task if the active task is deleted
                     if (state.activeTask.task_id === id) {
                        const remainingTasks = state.tasksList.filter(
                           (task) => task.task_id !== id
                        );
                        state.activeTask =
                           remainingTasks.length > 0
                              ? remainingTasks[0] // Choose the first remaining task as active
                              : {};
                     }

                     // Delete the task from LC
                     state.tasksList = state.tasksList.filter(
                        (task) => task.task_id !== id
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

            // # Delete multiple tasks by category
            deleteTasksByCategory: async (categoryId) => {
               set(
                  produce((state) => {
                     const tasksToDelete = state.tasksList.filter(
                        (task) => task.task_category_id === categoryId
                     );

                     const taskIdsToDelete = tasksToDelete.map(
                        (task) => task.task_id
                     );

                     // Set an active task if the active task is deleted
                     if (taskIdsToDelete.includes(state.activeTask?.task_id)) {
                        const remainingTasks = state.tasksList.filter(
                           (task) => task.task_category_id !== categoryId
                        );
                        state.activeTask =
                           remainingTasks.length > 0
                              ? remainingTasks[0] // Choose the first remaining task as active
                              : {};
                     }

                     // Filter out the tasks to be deleted from the local store
                     state.tasksList = state.tasksList.filter(
                        (task) => task.task_category_id !== categoryId
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

            // # Toggle to completed or uncompleted
            toggleCompleted: async (id) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task from LC
                     if (task) {
                        task.is_task_completed = !task.is_task_completed;
                        task.task_updated_at = updateTime;
                        if (task.is_task_completed)
                           task.task_completed_at = updateTime;

                        if (!task.is_task_completed)
                           task.task_completed_at = null;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-isCompleted' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'update-isCompleted',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
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
                     task.task_id
                  );
               }
            },

            // # Toggle to Starred or NOT Starred
            toggleStarred: async (id) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
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
                                 log.type === 'update-isStarred' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'update-isStarred',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
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
                     task.task_id
                  );
               }
            },

            // # Update task note
            updateNote: async (id, note) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
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
                              !(
                                 log.type === 'update-note' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the chenges log
                        state.changeLog.push({
                           type: 'update-note',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
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
                     task.task_id
                  );
               }
            },

            // # Update task reminder
            updateReminder: async (id, reminder) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
                     const updateTime = getDateNowIso();
                     const isoDate =
                        reminder === null
                           ? null
                           : new Date(reminder).toISOString();

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
                                 log.type === 'update-reminder' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-reminder',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
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
                     task.task_id
                  );
               }
            },

            // # Update task dueDate
            updateDueDate: async (id, dueDate) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
                     const updateTime = getDateNowIso();
                     const isoDate =
                        dueDate === null
                           ? null
                           : new Date(dueDate).toISOString();

                     // Update the task dueDate
                     if (task) {
                        task.task_due_date = isoDate;
                        task.task_updated_at = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-dueDate' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-dueDate',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((task) => task.task_id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     {
                        task_due_date: task.task_due_date,
                        updatedAt: task.task_updated_at,
                     },
                     task.task_id
                  );
               }
            },

            // # Update task repeat
            updateRepeat: async (id, repeat) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
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
                              !(
                                 log.type === 'update-repeat' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-repeat',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
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
                     task.task_id
                  );
               }
            },

            // # Toggle to "is_task_in_myday" or NOT
            toggleAddedToMyDay: async (id) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
                     const updateTime = getDateNowIso();

                     // Update the task from LC
                     if (task) {
                        task.is_task_in_mayday = !task.is_task_in_mayday;
                        task.task_updated_at = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'update-isAddedToMyDay' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-isAddedToMyDay',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
               );

               // Synchronizing with the database
               const task = get().tasksList.find((task) => task.task_id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     {
                        is_task_in_mayday: task.is_task_in_mayday,
                        task_updated_at: task.task_updated_at,
                     },
                     task.task_id
                  );
               }
            },

            // # Update the task title
            updateTitle: async (id, newTitle) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === id
                     );
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
                              !(
                                 log.type === 'update-title' &&
                                 log.id === task.task_id
                              )
                        );

                        // Save the changes log
                        state.changeLog.push({
                           type: 'update-title',
                           id: task.task_id,
                           logTime: updateTime,
                           task,
                        });
                     }
                  })
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
                     task.task_id
                  );
               }
            },

            /////////////////////////////
            /////////////////////////////
            //////// Step ///////////
            /////////////////////////////
            /////////////////////////////

            // # Add a new step to a task's steps
            addStep: async (taskId, newStep) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === taskId
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
               const task = get().tasksList.find(
                  (task) => task.task_id === taskId
               );
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     {
                        task_steps: task.task_steps,
                        task_updated_at: task.task_updated_at,
                     },
                     task.task_id
                  );
               }
            },

            // # Update a specific step of a specific task
            updateStep: async (taskId, stepId, updatedFields) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === taskId
                     );
                     const updateTime = getDateNowIso();

                     if (task && task.task_steps) {
                        const step = task.task_steps.find(
                           (s) => s.step_id === stepId
                        );
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
               const task = get().tasksList.find(
                  (task) => task.task_id === taskId
               );
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     {
                        task_steps: task.task_steps,
                        task_updated_at: task.task_updated_at,
                     },
                     task.task_id
                  );
               }
            },

            // # Remove a specific step from a specific task
            removeStep: async (taskId, stepId) => {
               set(
                  produce((state) => {
                     const task = state.tasksList.find(
                        (task) => task.task_id === taskId
                     );
                     const updateTime = getDateNowIso();

                     if (task && task.task_steps) {
                        // Filter out the step with the given stepId
                        task.task_steps = task.task_steps.filter(
                           (s) => s.step_id !== stepId
                        );
                        task.task_updated_at = updateTime;
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
               const task = get().tasksList.find(
                  (task) => task.task_id === taskId
               );
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     {
                        task_steps: task.task_steps,
                        task_updated_at: task.task_updated_at,
                     },
                     task.task_id
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
                        (cat) => cat.category_title
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
                     category.category_title = newName;

                     // Add the category to the local store
                     state.categoriesList.push(category);

                     // Handle offline log mode
                     if (state.offlineLogMode) {
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(
                                 log.type === 'add-category' &&
                                 log.id === category.category_id
                              )
                        );

                        state.changeLog.push({
                           type: 'add-category',
                           id: category.category_id,
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

            // # Update category
            updateCategoryInStore: async (id, updatedFields) => {
               set(
                  produce((state) => {
                     const category = state.categoriesList.find(
                        (cat) => cat.category_id === id
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

            // # Delete category
            deleteCategoryFromStore: async (id) => {
               set(
                  produce((state) => {
                     state.categoriesList = state.categoriesList.filter(
                        (cat) => cat.category_id !== id
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

            //////////////////////////
            //////////////////////////
            //////// other ///////////
            //////////////////////////
            //////////////////////////

            // # Fetching tasks from DB and Synchronizing localeStorage with the database
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

            // # Update health statuses
            // (receives the status from the HealthStatusSync component, whuch is a component to monitor database and internet connectivity status)
            updateConnectionStatus: (conectionStatus) => {
               set(
                  produce((state) => {
                     state.conectionStatus = conectionStatus;
                  })
               );
            },

            // Set user's info
            setUserInfo: (userInfo) => {
               set(
                  produce((state) => {
                     state.userInfo = userInfo;
                  })
               );
            },

            // Toggle offline log mode
            toggleOfflineLogMode: (bool) => {
               set(
                  produce((state) => {
                     state.offlineLogMode = bool;
                  })
               );
            },

            // # Clear changeLog
            clearLog: () => {
               set(
                  produce((state) => {
                     state.changeLog = initialState.changeLog;
                  })
               );
            },

            // # Toggle isSyncing
            toggleIsSyncing: (bool) => {
               set(
                  produce((state) => {
                     state.isSyncing = bool;
                  })
               );
            },

            // # Set active task (To show in the EditSidebar)
            setActiveTask: (task) => {
               set(
                  produce((state) => {
                     state.activeTask = task;
                  })
               );
            },

            // # Set active task (To show in the EditSidebar)
            setSortMethod: (sortMethod) => {
               set(
                  produce((state) => {
                     state.sortMethod = sortMethod;
                  })
               );
            },

            //////////////////////////////////////
            /////////////////////////////////////
            //////////// INVITATION /////////////
            /////////////////////////////////////
            /////////////////////////////////////

            // # Create invitation
            createInvitationInStore: async (categoryId) => {
               const userInfo = get().userInfo;

               try {
                  const token = await createInvitationAction(
                     categoryId,
                     userInfo.user_id
                  );

                  const baseUrl =
                     process.env.NODE_ENV === 'production'
                        ? `https://${process.env.VERCEL_URL}`
                        : process.env.NEXT_PUBLIC_BASE_URL;

                  const invitationLink = `${baseUrl}/tasks/invite?token=${token}`;

                  set(
                     produce((state) => {
                        state.invitations.push({
                           invitation_id: token,
                           invitation_category_id: categoryId,
                           invitation_owner_id: userInfo.user_id,
                           invitation_limit_access: false,
                           invitation_created_at: new Date().toISOString(),
                           invitation_link: invitationLink, // This is not in the DB "inavtion" table
                           sharedWith: [], // This is not in the DB "inavtion" table
                        });
                     })
                  );

                  return {
                     status: true,
                     message: 'the invation link has been created',
                  }; // this is for some management in "SharedListModal" component
               } catch (error) {
                  return { status: false, message: error.message }; // this is for some management in "SharedListModal" component
                  console.error(error.message);
               }
            },

            // # Remove user
            removeUserFromInvitationStore: async (invitationId, userId) => {
               const owner = get().userInfo;

               try {
                  await removeUserFromInvitationAction(
                     invitationId,
                     userId,
                     owner.user_id
                  );

                  set(
                     produce((state) => {
                        const invitation = state.invitations.find(
                           (inv) => inv.invitation_id === invitationId
                        );

                        if (invitation) {
                           invitation.sharedWith = invitation.sharedWith.filter(
                              (user) => user.user_id !== userId
                           );
                        }
                     })
                  );
               } catch (error) {
                  console.error(error.message);
               }
            },

            // # Set access limit
            setInvitationAccessLimitInStore: async (categoryId) => {
               const owner = get().userInfo;

               const { invitation_limit_access } = get().invitations.find(
                  (inv) => inv.invitation_category_id === categoryId
               );

               const { invitation_id } = get().invitations.find(
                  (inv) => inv.invitation_category_id === categoryId
               );

               try {
                  await setInvitationAccessLimitAction(
                     invitation_id,
                     owner.user_id,
                     !invitation_limit_access
                  );

                  set(
                     produce((state) => {
                        const invitation = state.invitations.find(
                           (inv) => inv.invitation_id === invitation_id
                        );

                        if (invitation) {
                           invitation.invitation_limit_access =
                              !invitation_limit_access;
                        }
                     })
                  );
               } catch (error) {
                  console.error(error.message);
               }
            },

            // # Stop sharing
            stopSharingInvitationInStore: async (categoryId) => {
               const owner = get().userInfo;

               const { invitation_id } = get().invitations.find(
                  (inv) => inv.invitation_category_id === categoryId
               );

               try {
                  await stopSharingInvitationAction(
                     invitation_id,
                     owner.user_id
                  );

                  set(
                     produce((state) => {
                        state.invitations = state.invitations.filter(
                           (inv) => inv.invitation_id !== invitation_id
                        );
                     })
                  );
               } catch (error) {
                  console.error(error.message);
               }
            },

            // # Get list's users
            getUsersByInvitationInStore: async (invitationId) => {
               const owner = get().userInfo;

               try {
                  const users = await getUsersByInvitationAction(
                     invitationId,
                     owner.user_id
                  );

                  set(
                     produce((state) => {
                        const invitation = state.invitations.find(
                           (inv) => inv.invitation_id === invitationId
                        );

                        if (invitation) invitation.sharedWith = users;
                     })
                  );
               } catch (error) {
                  console.error(error.message);
               }
            },

            // # Joining to a list with token
            joinInvitationInStore: async (invitationId) => {
               const userInfo = get().userInfo;

               try {
                  // Request invitation details
                  const { invitation_id, category } =
                     await joinInvitationAction(invitationId, userInfo.user_id);

                  // Request tasks by invitation
                  const tasks = await getTasksByInvitation(
                     invitationId,
                     userInfo.user_id
                  );

                  // Check if the invitation already exists
                  const existingInvitation = get().sharedWithMe.find(
                     (item) => item.invitation_id === invitation_id
                  );

                  if (existingInvitation) {
                     const releventCatId =
                        existingInvitation.invitation_category_id;

                     redirect(`tasks/${releventCatId}`);
                  }

                  // Add new invitation if not existing
                  set(
                     produce((state) => {
                        state.sharedWithMe.push({
                           invitation_id: invitation_id,
                           invitation_category_id: category.category_id,
                           invitation_category_title: category.category_title,
                           invitation_category_owner_id:
                              category.category_owner_id,
                           invitation_tasks: tasks,
                        });

                        // Add tasks and categories to the store
                        state.tasksList.push(...tasks);
                        state.categoriesList.push(category);
                     })
                  );

                  return { status: true, message: 'You have joined now!' };
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
                        (item) => item.task_id === task.task_id
                     );

                     if (!existed) state.tasksList.push(task);
                  })
               );
            },

            // # Update task in taskslist from realtime db
            updateTaskFromRealtime: (updatedTask) => {
               set(
                  produce((state) => {
                     const taskIndex = state.tasksList.findIndex(
                        (item) => item.task_id === updatedTask.task_id
                     );

                     if (taskIndex !== -1)
                        state.tasksList[taskIndex] = updatedTask;
                  })
               );
            },

            // # Delete task from taskslist from realtime db
            deleteTaskFromRealtime: (deletedTask) => {
               set(
                  produce((state) => {
                     state.tasksList = state.tasksList.filter(
                        (task) => task.task_id !== deletedTask.task_id
                     );
                  })
               );
            },

            // # Add joined user to the invation.sharedWith, from realtime db
            addUserFromRealtime: (invitationId, user) => {
               set(
                  produce((state) => {
                     const theInvitation = state.invitations.find(
                        (inv) => inv.invitation_id === invitationId
                     );

                     const existed = theInvitation?.sharedWith.find(
                        (item) => item.user_id === user.user_id
                     );

                     if (!existed) theInvitation.sharedWith.push(user);
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
