import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { produce } from 'immer';
import {
   addTask,
   deleteTask,
   getTasks,
   updateTask,
} from './_lib/data-services';
import { getDateNowIso } from './_lib/utils';

const initialState = {
   isSidebarOpen: false,
   isEditSidebarOpen: false,
   isSyncing: false,
   offlineLogMode: false,
   conectionStatus: {}, // {isConected, isOnline, lastOnline}
   userInfo: {},
   taskList: [],
   changeLog: [],
   activeTaskId: null,
};

const useTaskStore = create(
   devtools(
      persist(
         (set, get) => ({
            isSidebarOpen: initialState.isSidebarOpen,
            isEditSidebarOpen: initialState.isEditSidebarOpen,
            isSyncing: initialState.isSyncing,
            conectionStatus: initialState.conectionStatus,
            userInfo: initialState.userInfo,
            taskList: initialState.taskList,
            changeLog: initialState.changeLog,
            activeTaskId: initialState.activeTaskId,

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
                     state.taskList.push(task);

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
                     // Delete the task from LC
                     state.taskList = state.taskList.filter(
                        (task) => task.id !== id
                     );

                     const taskToDelete = state.taskList.find(
                        (task) => task.id === id
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

            // 4. Toggle to completed or uncompleted
            toggleCompletedInStore: async (id) => {
               set(
                  produce((state) => {
                     const task = state.taskList.find((item) => item.id === id);
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
               const task = get().taskList.find((item) => item.id === id);
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
            toggleStarredInStore: async (id) => {
               set(
                  produce((state) => {
                     const task = state.taskList.find((item) => item.id === id);
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
               const task = get().taskList.find((item) => item.id === id);
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
                     const task = state.taskList.find((item) => item.id === id);
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
               const task = get().taskList.find((item) => item.id === id);
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
                     const task = state.taskList.find((item) => item.id === id);
                     const updateTime = getDateNowIso();

                     // Update the task reminder
                     if (task) {
                        task.reminder = reminder;
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
               const task = get().taskList.find((item) => item.id === id);
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
                     const task = state.taskList.find((item) => item.id === id);
                     const updateTime = getDateNowIso();

                     // Update the task dueDate
                     if (task) {
                        task.dueDate = dueDate;
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
               const task = get().taskList.find((item) => item.id === id);
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
                     const task = state.taskList.find((item) => item.id === id);
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
               const task = get().taskList.find((item) => item.id === id);
               const onlineStatus = get().conectionStatus.isOnline;

               if (onlineStatus) {
                  await updateTask(
                     { repeat: task.repeat, updatedAt: task.updatedAt },
                     task.id
                  );
               }
            },

            // 6. Fetching tasks from DB and Synchronizing localeStorage with the database
            syncLcWithDb: async () => {
               const tasks = await getTasks();

               set(
                  produce((state) => {
                     state.taskList = tasks;
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

            // 12. Setting active task id
            setActiveTaskId: (id) => {
               set(
                  produce((state) => {
                     state.activeTaskId = id;
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
