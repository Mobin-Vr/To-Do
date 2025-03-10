import { produce } from "immer";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  addManyCategoriesAction,
  addManyErrorLogAction,
  addManyTasksAction,
  createInvitationAction,
  deleteManyCategoriesAction,
  deleteManyTasksAction,
  getJoinedInvitationsAction,
  getOwnerInvitationsAction,
  getReleventCategoriesAction,
  getReleventTasksAction,
  joinInvitationAction,
  leaveInvitationAction,
  removeUserFromInvitationAction,
  setInvitationLimitAction,
  stopSharingInvitationAction,
  updateManyCategoriesAction,
  updateManyTasksAction,
} from "./_lib/Actions";
import { defaultCategory } from "./_lib/configs";
import { logger } from "./_lib/logger";
import { delay, getDateNowIso } from "./_lib/utils";

const initialState = {
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
  errorLog: [], // {method, message, time}

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
};

const useTaskStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // # Reset state
        resetStore: () => set(initialState),

        /////////////////////////////
        /////////// Task ////////////
        /////////////////////////////

        // # Add a task
        addTaskToStore: async (task) => {
          try {
            set(
              produce((state) => {
                // Add the task to LC
                state.tasksList.push(task);

                // Add to change log only if offline.
                if (state.offlineLogMode) {
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

            if (onlineStatus) await addManyTasksAction([task]);
          } catch (error) {
            logger.error("Error adding task: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "addTaskToStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
          }
        },

        // # Delete a task
        deleteTaskFromStore: async (id) => {
          try {
            set(
              produce((state) => {
                const task = state.tasksList.find(
                  (task) => task.task_id === id,
                );

                // Delete the task from LC
                state.tasksList = state.tasksList.filter(
                  (t) => t.task_id !== task.task_id,
                );

                // Add to change log only if offline.
                if (state.offlineLogMode) {
                  // Checks if a log entry of type "add-task" exists for this specific task
                  const isAlreadyAddTaskInChangeLog = state.changeLog.some(
                    (log) => log.id === task.task_id && log.type === "add-task",
                  );

                  // If this task exists only in the local state, so if we decide to delete it, there's no need to first add it and then delete it. Simply ignore the operation.
                  if (isAlreadyAddTaskInChangeLog) {
                    // Remove if exist a record in log with the same ID
                    state.changeLog = state.changeLog.filter(
                      (log) => log.id !== task.task_id,
                    );
                  }

                  // When deleting a task, there's no need to update or anything to it first; just delete it directly.
                  if (!isAlreadyAddTaskInChangeLog) {
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
                }
              }),
            );

            // Synchronizing with the database
            const onlineStatus = get().conectionStatus.isOnline;

            if (onlineStatus) await deleteManyTasksAction([id]);
          } catch (error) {
            logger.error("Error deleting task: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "deleteTaskFromStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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

                // Update the task
                Object.assign(task, updatedParts, {
                  task_updated_at: getDateNowIso(),
                });

                // Add to change log only if offline.
                if (state.offlineLogMode) {
                  const isAlreadyAddTaskInChangeLog = state.changeLog.some(
                    (log) => log.id === task.task_id && log.type === "add-task",
                  );

                  // If the task was added only in the local state and we want to update it, we should just add the updated task instead of adding it first and then updating it.
                  if (isAlreadyAddTaskInChangeLog) {
                    // Remove if exist a record in log with the same ID
                    state.changeLog = state.changeLog.filter(
                      (log) => log.id !== taskId,
                    );

                    // Save the changes logs
                    state.changeLog.push({
                      type: "add-task",
                      id: taskId,
                      task,
                    });
                  }

                  // If the task hasn't already been added to the log ("add-task"), it means it exists in the database and should be updated.
                  if (!isAlreadyAddTaskInChangeLog) {
                    state.changeLog = state.changeLog.filter(
                      (log) => log.id !== taskId,
                    );

                    // Save the changes logs
                    state.changeLog.push({
                      type: "update-task",
                      id: taskId,
                      task,
                    });
                  }
                }
              }),
            );

            // Synchronizing with the database
            const task = get().tasksList.find(
              (task) => task.task_id === taskId,
            );
            const onlineStatus = get().conectionStatus.isOnline;

            if (onlineStatus)
              await updateManyTasksAction([task], [task.task_id]);
          } catch (error) {
            logger.error("Error updating task: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "updateTaskInStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
          }
        },

        /////////////////////////////
        //////// Category ///////////
        /////////////////////////////

        // # Add category
        addCategoryToStore: async (category) => {
          try {
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

            if (onlineStatus) await addManyCategoriesAction([category]);
          } catch (error) {
            logger.error("Error adding category: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "addCategoryToStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
          }
        },

        // # Delete category
        deleteCategoryFromStore: async (id) => {
          try {
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
                  const isAlreadyAddTaskInChangeLog = state.changeLog.some(
                    (log) =>
                      log.id === category.category_id &&
                      log.type === "add-category",
                  );

                  // If this task exists only in the local state, so if we decide to delete it, there's no need to first add it and then delete it. Simply ignore the operation.
                  if (isAlreadyAddTaskInChangeLog) {
                    // Remove existing logs related to this category
                    state.changeLog = state.changeLog.filter(
                      (log) => log.id !== category.category_id,
                    );
                  }

                  if (!isAlreadyAddTaskInChangeLog) {
                    // When deleting a task, there's no need to update or anything to it first; just delete it directly.

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
                }
              }),
            );

            // Synchronize with the database if online
            const onlineStatus = get().conectionStatus.isOnline;

            if (onlineStatus) await deleteManyCategoriesAction([id]); // NOTE Delete multiple tasks by category only from the store. Tasks in the database will be deleted automatically due to cascading when the category is deleted, so there is no need. Also we dont need to record deleted task in cahnge log.
          } catch (error) {
            logger.error("Error deleting category:", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "deletecategoryFromstore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
          }
        },

        // # Update category
        updateCategoryInStore: async (id, updatedFields) => {
          try {
            set(
              produce((state) => {
                const category = state.categoriesList.find(
                  (cat) => cat.category_id === id,
                );

                if (category) {
                  Object.assign(category, updatedFields);
                }

                if (state.offlineLogMode) {
                  const isAlreadyAddTaskInChangeLog = state.changeLog.some(
                    (log) =>
                      log.id === category.category_id &&
                      log.type === "add-category",
                  );

                  // If the category was added only in the local state and we want to update it, we should just add the updated category instead of adding it first and then updating it.
                  if (isAlreadyAddTaskInChangeLog) {
                    state.changeLog = state.changeLog.filter(
                      (log) => log.id !== category.category_id,
                    );

                    state.changeLog.push({
                      type: "add-category",
                      id: category.category_id,
                      category,
                    });
                  }

                  // If the category hasn't already been added to the log ("add-category"), it means it exists in the database and should be updated.
                  if (!isAlreadyAddTaskInChangeLog) {
                    state.changeLog = state.changeLog.filter(
                      (log) => log.id !== category.category_id,
                    );

                    state.changeLog.push({
                      type: "update-category",
                      id: category.category_id,
                      category,
                    });
                  }
                }
              }),
            );

            const onlineStatus = get().conectionStatus.isOnline;
            const category = get().categoriesList.find(
              (cat) => cat.category_id === id,
            );

            if (onlineStatus)
              await updateManyCategoriesAction(
                [category],
                [category.category_id],
              );
          } catch (error) {
            logger.error("Error updating category: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "updateCategoryInStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
          }
        },

        /////////////////////////////////////
        //////////// INVITATION /////////////
        /////////////////////////////////////

        // # Create invitation
        createInvitationInStore: async (categoryId) => {
          try {
            const userState = get().userState;

            throw new Error("ERR-ERR");

            const token = await createInvitationAction(
              categoryId,
              userState.user_id,
            );

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
                  sharedWith: [], // This is not in the DB "inavtion" table
                });
              }),
            );

            return true; // this is for some management in "SharedListModal" component
          } catch (error) {
            logger.error("Error creating invitation: ", error);

            toast.error(error.message);
            const newError = {
              method: "createInvitationInStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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

            return false; // this is for some management in "SharedListModal" component
          }
        },

        // # Remove user
        removeUserFromInvitationStore: async (invitationId, userId) => {
          try {
            const owner = get().userState;

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
            logger.error("Error removing user from invitation: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "removeUserFromInvitationStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
          }
        },

        // # Set access limit
        setInvitationAccessLimitInStore: async (categoryId) => {
          try {
            const owner = get().userState;

            const { invitation_limit_access } = get().invitations.find(
              (inv) => inv.invitation_category_id === categoryId,
            );

            const { invitation_id } = get().invitations.find(
              (inv) => inv.invitation_category_id === categoryId,
            );

            await setInvitationLimitAction(
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
            logger.error("Error setting limit access for invitation: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "setInvitationAccessLimitInStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
          }
        },

        // # Stop sharing
        stopSharingInvitationInStore: async (categoryId) => {
          try {
            const owner = get().userState;

            const { invitation_id } = get().invitations.find(
              (inv) => inv.invitation_category_id === categoryId,
            );

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
            logger.error("Error stop sharing invitation: ", error);

            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );
            const newError = {
              method: "stopSharingInvitationInStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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
                });

                // Add tasks and categories to the store
                state.tasksList.push(...tasks);
                state.categoriesList.push(category);
              }),
            );

            return { status: true, categoryId: category.category_id };
          } catch (error) {
            logger.error("Error joinning to the invitation: ", error);

            toast.error(error.message);
            const newError = {
              method: "joinInvitationInStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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

            return { status: false, categoryId: null };
          }
        },

        // # Leave invitation
        leaveInvitationFromStore: async (categoryId) => {
          try {
            const user = get().userState;

            const { invitation_id } = get().sharedWithMe.find(
              (inv) => inv.invitation_category_id === categoryId,
            );

            // Remove user from invitation in db
            if (invitation_id) {
              await leaveInvitationAction(invitation_id, user.user_id);
            }

            set(
              produce((state) => {
                // Remove the category from the list
                state.categoriesList = state.categoriesList.filter(
                  (cat) => cat.category_id !== categoryId,
                );

                // Remove also the category's relevent tasks from the tasksList
                state.tasksList = state.tasksList.filter(
                  (task) => task.task_category_id !== categoryId,
                );

                // Remove the category from sharedWithMe
                state.sharedWithMe = state.sharedWithMe.filter(
                  (cat) => cat.invitation_category_id !== categoryId,
                );
              }),
            );

            return { status: true };
          } catch (error) {
            logger.error("Error leaving the invitation: ", error);

            toast.error(error.message);
            const newError = {
              method: "leaveInvitationInStore",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists
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

            return { status: false };
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
        //////// Real time /////////
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
              const existedTask = state.tasksList.find(
                (item) => item.task_id === updatedTask.task_id,
              );

              if (existedTask) Object.assign(existedTask, updatedTask);
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
        ////// Delete Modal //////
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
        //////// other ///////////
        //////////////////////////

        // # Fetching tasks from DB and Synchronizing sessionStorage with the database
        fetchDataOnMount: async () => {
          try {
            const userId = get().userState.user_id;

            if (!userId) return;

            // Fetch all relevant tasks, categories, and invitations (shared + owned)
            const fetchedTasks = await getReleventTasksAction(userId);
            const fetchedCategories = await getReleventCategoriesAction(userId);
            const fetchedOwnerInvs = await getOwnerInvitationsAction(userId);
            const fetchedJoinedInvs = await getJoinedInvitationsAction(userId);

            // Remove duplicate tasks based on task_id
            // eslint-disable-next-line no-undef
            const seenTaskIds = new Set();
            const uniqueTasks = fetchedTasks.filter((task) => {
              if (!seenTaskIds.has(task.task_id)) {
                seenTaskIds.add(task.task_id);
                return true;
              }
              return false;
            });

            // Remove duplicate categories based on category_id
            // eslint-disable-next-line no-undef
            const seenCategoryIds = new Set();
            const uniqueCategories = fetchedCategories.filter((category) => {
              if (!seenCategoryIds.has(category.category_id)) {
                seenCategoryIds.add(category.category_id);
                return true;
              }
              return false;
            });

            // Remove duplicate owner invitations based on invitation_id
            // eslint-disable-next-line no-undef
            const seenOwnerInvIds = new Set();
            const uniqueOwnerInvs = fetchedOwnerInvs.filter((inv) => {
              if (!seenOwnerInvIds.has(inv.invitation_id)) {
                seenOwnerInvIds.add(inv.invitation_id);
                return true;
              }
              return false;
            });

            // Remove duplicate joined invitations based on invitation_id
            // eslint-disable-next-line no-undef
            const seenJoinedInvIds = new Set();
            const uniqueJoinedInvs = fetchedJoinedInvs.filter((inv) => {
              if (!seenJoinedInvIds.has(inv.invitation_id)) {
                seenJoinedInvIds.add(inv.invitation_id);
                return true;
              }
              return false;
            });

            //  Filter out tasks that already exist in the tasksList (no duplicates)
            const nonDuplicateTasks = get().tasksList.filter(
              (task) => !uniqueTasks.some((t) => t.task_id === task.task_id),
            );

            // Filter out categories that already exist in the categoriesList (no duplicates)
            const nonDuplicateCategories = get().categoriesList.filter(
              (category) =>
                !uniqueCategories.some(
                  (c) => c.category_id === category.category_id,
                ),
            );

            // Filter out owner invitations that already exist in the invitations list (no duplicates)
            const nonDuplicateOwnerInvs = get().invitations.filter(
              (inv) =>
                !uniqueOwnerInvs.some(
                  (i) => i.invitation_id === inv.invitation_id,
                ),
            );

            // Filter out joined invitations that already exist in the sharedWithMe list (no duplicates)
            const nonDuplicateJoinedInvs = get().sharedWithMe.filter(
              (inv) =>
                !uniqueJoinedInvs.some(
                  (i) => i.invitation_id === inv.invitation_id,
                ),
            );

            // Remove `owner` from `sharedWith` in all invitations
            const updatedOwnerInvs = uniqueOwnerInvs.map((invitation) => {
              return {
                ...invitation,
                sharedWith: invitation.sharedWith.filter(
                  (user) => user.user_id !== get().userState.user_id,
                ),
              };
            });

            // Update state with non-duplicate tasks, categories, and invitations
            set(
              produce((state) => {
                // Add non-duplicate tasks, categories, owner invitations, and joined invitations
                state.tasksList = [...nonDuplicateTasks, ...uniqueTasks];
                state.categoriesList = [
                  ...nonDuplicateCategories,
                  ...uniqueCategories,
                ];
                state.invitations = [
                  ...nonDuplicateOwnerInvs,
                  ...updatedOwnerInvs,
                ];
                state.sharedWithMe = [
                  ...nonDuplicateJoinedInvs,
                  ...uniqueJoinedInvs,
                ];
              }),
            );

            // Turn off the loading spinner once data has finished loading
            get().setShowpinner(false);
          } catch (error) {
            logger.error("Error syncing and getting data from server:", error);

            // Show a toast error message when the data synchronization fails
            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );

            const newError = {
              method: "fetchDataOnMount",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists in the error log
                const isDuplicate = state.errorLog.some(
                  (err) =>
                    err.method === newError.method &&
                    err.message === newError.message,
                );

                // Add the error if it doesn't already exist in the error log
                if (!isDuplicate) state.errorLog.push(newError);
              }),
            );

            if (get().conectionStatus.isOnline) {
              await addManyErrorLogAction([newError]);
            }
          }
        },

        // # Send change log to DB to save unsaved chenges in local
        syncChangeLog: async () => {
          const changeLog = get().changeLog;
          const errorLog = get().errorLog;

          // Separate change logs by their types
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
            get().toggleIsSyncing(true); // Mark syncing as in progress

            // Run tasks sequentially to prevent conflicts
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

            // Run category operations sequentially
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

            get().clearLog(); // Clear the change log after successful sync
          } catch (error) {
            logger.error("Error syncing and getting data from server:", error);

            // Show a toast error message when the data synchronization fails
            toast.error(
              "Couldn't sync with the server. Will retry once connected.",
            );

            const newError = {
              method: "syncChangeLog",
              message: error.message,
            };

            set(
              produce((state) => {
                // Check if the exact error object already exists in the error log
                const isDuplicate = state.errorLog.some(
                  (err) =>
                    err.method === newError.method &&
                    err.message === newError.message,
                );

                // Add the error if it doesn't already exist in the error log
                if (!isDuplicate) state.errorLog.push(newError);
              }),
            );

            if (get().conectionStatus.isOnline) {
              await addManyErrorLogAction([newError]);
            }
          } finally {
            get().toggleIsSyncing(false); // Mark syncing as complete
          }
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

        // # Set active task (To show in the EditSidebar)
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

          const { isEditSidebarOpen, activeTask } = get();
          const cond = selectedTask?.task_id === activeTask?.task_id;

          set(
            produce((state) => {
              if (!isEditSidebarOpen) {
                state.activeTask = selectedTask;
                state.isEditSidebarOpen = true;
              } else if (isEditSidebarOpen && cond) {
                state.isEditSidebarOpen = false;
                state.activeTask = null;
              } else if (isEditSidebarOpen && !cond) {
                state.isEditSidebarOpen = false;
                state.activeTask = null; // NOTE I currentlly added this. if an error has accured remove this
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

          get().fetchDataOnMount();
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
        setShowpinner: (bool) => {
          set(
            produce((state) => {
              state.showSpinner = bool;
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
        storage: createJSONStorage(() => sessionStorage), // Use localStorage for persisting the data
      },
    ),
    { name: "Todo Store" }, // Redux DevTools name
  ),
);

export default useTaskStore;
