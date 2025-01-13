import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { produce } from 'immer';
import {
   addTask,
   deleteTask,
   getTasks,
   toggleCompleted,
   toggleStarred,
} from './_lib/data-services';

const initialState = {
   isSidebarOpen: false,
   taskList: [],
};

const useTaskStore = create(
   devtools(
      persist(
         (set, get) => ({
            taskList: initialState.taskList,
            isSidebarOpen: initialState.isSidebarOpen,

            // 1. Toggle sidebar
            toggleSidebar: () => {
               set(
                  produce((state) => {
                     state.isSidebarOpen = !state.isSidebarOpen;
                  })
               );
            },

            // 2. Add a task
            addTask: async (task) => {
               set(
                  produce((state) => {
                     state.taskList.push(task);
                  })
               );

               // Synchronizing with the database
               await addTask(task);
            },

            // 3. Delete a task
            deleteTask: async (id) => {
               set(
                  produce((state) => {
                     state.taskList = state.taskList.filter(
                        (task) => task.id !== id
                     );
                  })
               );

               // Synchronizing with the database
               await deleteTask(id);
            },

            // 4. Toggle to completed or uncompleted
            toggleCompleted: async (id) => {
               set(
                  produce((state) => {
                     const task = state.taskList.find((item) => item.id === id);
                     if (task) task.isCompleted = !task.isCompleted;
                  })
               );

               // Synchronizing with the database
               const task = get().taskList.find((item) => item.id === id);
               await toggleCompleted(task);
            },

            // 5. Toggle to Starred or NOT Starred
            toggleStarred: async (id) => {
               set(
                  produce((state) => {
                     const task = state.taskList.find((item) => item.id === id);
                     if (task) task.isStarred = !task.isStarred;
                  })
               );

               // Synchronizing with the database
               const task = get().taskList.find((item) => item.id === id);
               await toggleStarred(task);
            },

            // 6. Fetching tasks from DB and Synchronizing localeStorage with the database
            fetchTasks: async () => {
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
