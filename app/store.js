import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { produce } from 'immer';
import {
   addTask,
   deleteTask,
   getTasks,
   updateTask,
} from './_lib/data-services';

const initialState = {
   isSidebarOpen: false,
   offlineLogMode: false,
   conectionStatus: {}, // {isConected, isOnline, lastOnline}
   userInfo: {},
   taskList: [],
   changeLog: [],
   isSyncing: false,
};

const useTaskStore = create(
   devtools(
      persist(
         (set, get) => ({
            isSidebarOpen: initialState.isSidebarOpen,
            conectionStatus: initialState.conectionStatus,
            userInfo: initialState.userInfo,
            taskList: initialState.taskList,
            changeLog: initialState.changeLog,

            // 1. Toggle sidebar
            toggleSidebar: () => {
               set(
                  produce((state) => {
                     state.isSidebarOpen = !state.isSidebarOpen;
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
                           logTime: new Date().toISOString(),
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
                     const updateTime = new Date().toISOString();

                     // Update the task from LC
                     if (task) {
                        task.isCompleted = !task.isCompleted;
                        task.updatedAt = updateTime;
                     }

                     // Add to change log only if offline.
                     if (state.offlineLogMode) {
                        // Remove if exist a record in log with the same ID and TYPE
                        state.changeLog = state.changeLog.filter(
                           (log) =>
                              !(log.type === 'update' && log.id === task.id)
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
                     const updateTime = new Date().toISOString();

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
                              !(log.type === 'update' && log.id === task.id)
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

            // 6. Fetching tasks from DB and Synchronizing localeStorage with the database
            // LATER is it needed?
            syncLCFromDB: async () => {
               const { data, error } = await getTasks();

               if (error) {
                  console.error(error);
                  throw new Error('Failed to fetch tasks');
               }

               set(
                  produce((state) => {
                     state.taskList = data;
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
