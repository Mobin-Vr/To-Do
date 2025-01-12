import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { produce } from 'immer';

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

            // Toggle sidebar
            toggleSidebar: () => {
               set(
                  produce((state) => {
                     state.isSidebarOpen = !state.isSidebarOpen;
                  })
               );
            },

            // Add a task
            addTask: (task) => {
               set(
                  produce((state) => {
                     state.taskList.push(task);
                  })
               );
            },

            // Delete a task
            deleteTask: (id) => {
               set(
                  produce((state) => {
                     state.taskList = state.taskList.filter(
                        (task) => task.id !== id
                     );
                  })
               );
            },

            // Toggle to completed or uncompleted
            toggleCompleted: (id) => {
               set(
                  produce((state) => {
                     const task = state.taskList.find((item) => item.id === id);
                     if (task) task.isCompleted = !task.isCompleted;
                  })
               );
            },

            // Toggle to Starred or NOT Starred
            toggleStarred: (id) => {
               set(
                  produce((state) => {
                     const task = state.taskList.find((item) => item.id === id);
                     if (task) task.isStarred = !task.isStarred;
                  })
               );
            },
         }),
         {
            name: 'todoTasks-store', // Key name for storage
            getStorage: () => localStorage, // Use localStorage for persisting the data
         }
      ),
      { name: 'Task Store' } // Redux DevTools name
   )
);

export default useTaskStore;
