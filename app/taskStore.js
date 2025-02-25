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
  addManyCategories,
  addManyTasks,
  deleteManyCategories,
  deleteManyTasks,
  getCategories,
  updateManyCategories,
  updateManyTasks,
} from "./_lib/data-services";
import { delay, getDateNowIso } from "./_lib/utils";

const useTaskStore = create(
  devtools(
    persist(
      (set, get) => ({
        // Sorting and Display
        sortMethod: "importance", // Default sorting method for tasks
        sortMethodForShared: "creationDate", // Default sorting method for shared lists
        showSpinner: true, // Show spinner during initial data loading

        // UI State
        isSidebarOpen: false, // Sidebar open/close state
        isEditSidebarOpen: false, // Edit sidebar open/close state
        editTitleWhileCreating: false, // Auto-focus title when creating a new list

        // Sync and Connection State
        isSyncing: false, // Synchronization status
        offlineLogMode: false, // Enables offline logging mode
        conectionStatus: {}, // Connection details: {isConnected, isOnline, lastOnline}
        changeLog: [], // Stores changes for offline mode

        // User and Tasks Data
        userState: {}, // Current user information
        tasksList: [], // List of tasks
        activeTask: {}, // Currently active task
        categoriesList: [defaultCategory], // List of categories

        // Sharing and Invitations
        invitations: [], // List of invitations sent to others
        sharedWithMe: [], // Tasks and categories shared with the user

        // Delete Modal Management
        isDeleteModalOpen: false, // Delete modal open/close state
        deletingType: "", // Type of the item being deleted (task, category, step)
        deletingItemName: "", // Name of the item being deleted
        deleteCallback: null, // Callback function for deletion

        /////////////////////////////
        /////////////////////////////
        /////////// Task ////////////
        /////////////////////////////
        /////////////////////////////

        // # Add a task
        addTaskToStore: async (task) => {
          set(
            produce((state) => {
              // Add the task to LC
              state.tasksList.push(task);

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist log with the same ID
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== task.task_id,
                );

                // Save the chenges log
                state.changeLog.push({
                  type: "add-task",
                  id: task.task_id,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) await addManyTasks([task]);
        },

        // # Delete a task
        deleteTaskFromStore: async (id) => {
          set(
            produce((state) => {
              const task = state.tasksList.find((task) => task.task_id === id);

              // Delete the task from LC
              state.tasksList = state.tasksList.filter(
                (t) => t.task_id !== task.task_id,
              );

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== task.task_id,
                );

                // Save the chenges log
                state.changeLog.push({
                  type: "delete-task",
                  id: task.task_id,
                  task,
                });
              }
            }),
          );

          // Synchronizing with the database
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) await deleteManyTasks([id]);
        },

        // # Update a task
        updateTaskInStore: async (taskId, updatedParts) => {
          const t = get().tasksList.find((task) => task.task_id === taskId);
          console.log("task A: ", t);

          set(
            produce((state) => {
              const task = state.tasksList.find(
                (task) => task.task_id === taskId,
              );

              if (!task) return;

              // Update the task
              Object.assign(task, updatedParts, {
                task_updated_at: getDateNowIso(),
              });

              // Add to change log only if offline.
              if (state.offlineLogMode) {
                // Remove if exist a record in log with the same ID
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== taskId,
                );

                // Save the changes logs
                state.changeLog.push({ type: "update-task", id: taskId, task });
              }
            }),
          );

          // Synchronizing with the database
          const task = get().tasksList.find((task) => task.task_id === taskId);
          const onlineStatus = get().conectionStatus.isOnline;

          console.log("task B: ", task);

          if (onlineStatus) await updateManyTasks([task], [task.task_id]);
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
                  (log) => log.id !== category.category_id,
                );

                state.changeLog.push({
                  type: "add-category",
                  id: category.category_id,
                  category,
                });
              }
            }),
          );

          // Sync with the server if online
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) await addManyCategories([category]);
        },

        // # Delete category
        deleteCategoryFromStore: async (id) => {
          set(
            produce((state) => {
              const category = state.categoriesList.find(
                (cat) => cat.category_id !== id,
              );

              // Remove the category from the list
              state.categoriesList = state.categoriesList.filter(
                (cat) => cat.category_id !== id,
              );

              // Remove also the category's relevent tasks from the tasksList
              state.tasksList = state.tasksList.filter(
                (task) => task.task_category_id !== id,
              );

              // Add changes to the offline log if offline mode is enabled
              if (state.offlineLogMode) {
                // Remove existing logs related to this category
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== category.category_id,
                );

                // Save category deletion log
                state.changeLog.push({
                  type: "delete-category",
                  id: category.category_id,
                  category,
                });
              }
            }),
          );

          // Synchronize with the database if online
          const onlineStatus = get().conectionStatus.isOnline;

          if (onlineStatus) await deleteManyCategories([id]); // NOTE Delete multiple tasks by category only from the store. Tasks in the database will be deleted automatically due to cascading when the category is deleted, so there is no need. Also we dont need to record deleted task in cahnge log.
        },

        // # Update category
        updateCategoryInStore: async (id, updatedFields) => {
          set(
            produce((state) => {
              const category = state.categoriesList.find(
                (cat) => cat.category_id === id,
              );

              if (category) {
                Object.assign(category, updatedFields);
              }

              if (state.offlineLogMode) {
                state.changeLog = state.changeLog.filter(
                  (log) => log.id !== category.category_id,
                );

                state.changeLog.push({
                  type: "update-category",
                  id: category.category_id,
                  category,
                });
              }
            }),
          );

          const onlineStatus = get().conectionStatus.isOnline;
          const category = get().categoriesList.find(
            (cat) => cat.category_id === id,
          );

          if (onlineStatus)
            await updateManyCategories([category], [category.category_id]);
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

        //////////////////////////
        //////////////////////////
        //////// other ///////////
        //////////////////////////
        //////////////////////////

        // # Fetching tasks from DB and Synchronizing localeStorage with the database
        syncLcWithDb: async () => {
          const userId = get().userState.user_id;

          if (!userId) return;

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

          get().setShowpinnerFalse(); // turn off the spinner after loadind data
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

        // # Set active task (To show in the EditSidebar)  LATER do we need to this?
        setActiveTask: (task) => {
          set(
            produce((state) => {
              state.activeTask = task;
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

        // # Set user's info
        setUserState: (userState) => {
          set(
            produce((state) => {
              state.userState = userState;
            }),
          );

          get().syncLcWithDb();
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

        // # show spinner on mount
        setShowpinnerFalse: () => {
          set(
            produce((state) => {
              state.showSpinner = false;
            }),
          );
        },

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

        // # Toggles the focus state for the title when creating a new list.
        toggleTitleFocus: (bool) =>
          set(
            produce((state) => {
              state.editTitleWhileCreating = bool;
            }),
          ),

        getTaskList: () => {
          const tasksList = get().tasksList;
          return tasksList.length > 0 ? tasksList : null;
        },

        getConectionStatus: () => {
          return get().conectionStatus;
        },

        getUserState: () => {
          return get().userState;
        },

        getCategoriesList: () => {
          return get().categoriesList;
        },
      }),
      {
        name: "Todo Store", // Key name for storage
        getStorage: () => sessionStorage, // Use localStorage for persisting the data
      },
    ),
    { name: "Todo Store" }, // Redux DevTools name
  ),
);

export default useTaskStore;
