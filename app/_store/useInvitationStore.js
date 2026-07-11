import { produce } from "immer";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createInvitationAction,
  removeUserFromInvitationAction,
  setInvitationLimitAction,
  stopSharingInvitationAction,
  joinInvitationAction,
  leaveInvitationAction,
} from "@/app/_lib/Actions";
import { TASK_SYNC_FAIL_TOAST_MSG } from "@/app/_lib/configs";
import { logger } from "@/app/_lib/logger";
import useTaskStore from "./useTaskStore";
import useCategoryStore from "./useCategoryStore";
import useSyncStore from "./useSyncStore";

const initialState = {
  invitations: [],
  sharedWithMe: [],
};

const useInvitationStore = create(
  devtools(
    (set, get) => ({
      // State
      invitations: initialState.invitations,
      sharedWithMe: initialState.sharedWithMe,

      // # Create invitation
      createInvitationInStore: async (categoryId) => {
        try {
          const token = await createInvitationAction(categoryId);

          set(
            produce((state) => {
              state.invitations.push({
                invitation_id: token,
                invitation_category_id: categoryId,
                invitation_limit_access: false,
                sharedWith: [],
              });
            }),
          );

          useCategoryStore
            .getState()
            .setCategoryInvitationFlag(categoryId, true);
          return true;
        } catch (error) {
          logger.error("Error creating invitation: ", error);
          toast.error(error.message);
          await useSyncStore
            .getState()
            .pushErrorLog("createInvitationInStore", error.message);
          return false;
        }
      },

      // # Remove user from invitation
      removeUserFromInvitationStore: async (invitationId, userId) => {
        try {
          await removeUserFromInvitationAction(invitationId, userId);

          set(
            produce((state) => {
              const invitation = state.invitations.find(
                (inv) => inv.invitation_id === invitationId,
              );
              if (invitation) {
                invitation.sharedWith = invitation.sharedWith.filter(
                  (user) => user.user_id !== userId,
                );
              }
            }),
          );
        } catch (error) {
          logger.error("Error removing user from invitation: ", error);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore
            .getState()
            .pushErrorLog("removeUserFromInvitationStore", error.message);
        }
      },

      // # Set access limit
      setInvitationAccessLimitInStore: async (categoryId) => {
        try {
          const { invitation_limit_access } = get().invitations.find(
            (inv) => inv.invitation_category_id === categoryId,
          );
          const { invitation_id } = get().invitations.find(
            (inv) => inv.invitation_category_id === categoryId,
          );

          await setInvitationLimitAction(
            invitation_id,
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
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore
            .getState()
            .pushErrorLog("setInvitationAccessLimitInStore", error.message);
        }
      },

      // # Stop sharing
      stopSharingInvitationInStore: async (categoryId) => {
        try {
          const { invitation_id } = get().invitations.find(
            (inv) => inv.invitation_category_id === categoryId,
          );

          await stopSharingInvitationAction(invitation_id);

          set(
            produce((state) => {
              state.invitations = state.invitations.filter(
                (inv) => inv.invitation_id !== invitation_id,
              );
            }),
          );

          useCategoryStore
            .getState()
            .setCategoryInvitationFlag(categoryId, false);
        } catch (error) {
          logger.error("Error stop sharing invitation: ", error);
          toast.error(TASK_SYNC_FAIL_TOAST_MSG);
          await useSyncStore
            .getState()
            .pushErrorLog("stopSharingInvitationInStore", error.message);
        }
      },

      // # Join invitation
      joinInvitationInStore: async (invitationId) => {
        try {
          const existingInvitation = get().sharedWithMe.find(
            (item) => item.invitation_id === invitationId,
          );

          if (existingInvitation) {
            return {
              status: true,
              categoryId: existingInvitation.invitation_category_id,
            };
          }

          const { category, tasks } = await joinInvitationAction(invitationId);

          set(
            produce((state) => {
              state.sharedWithMe.push({
                invitation_id: invitationId,
                invitation_category_id: category.category_id,
                invitation_category_owner_id: category.category_owner_id,
              });
            }),
          );

          // Add tasks and category to their respective stores
          useTaskStore.getState().addTasksBulk(tasks);
          useCategoryStore.getState().addCategoryToList(category);

          return { status: true, categoryId: category.category_id };
        } catch (error) {
          logger.error("Error joining the invitation: ", error);
          toast.error(error.message);
          await useSyncStore
            .getState()
            .pushErrorLog("joinInvitationInStore", error.message);
          return { status: false, categoryId: null };
        }
      },

      // # Leave invitation
      leaveInvitationFromStore: async (categoryId) => {
        try {
          const { invitation_id } =
            get().sharedWithMe.find(
              (inv) => inv.invitation_category_id === categoryId,
            ) || {};

          if (invitation_id) {
            await leaveInvitationAction(invitation_id);
          }

          set(
            produce((state) => {
              state.sharedWithMe = state.sharedWithMe.filter(
                (cat) => cat.invitation_category_id !== categoryId,
              );
            }),
          );

          useCategoryStore.getState().removeCategoryById(categoryId);
          useTaskStore.getState().removeTasksByCategoryId(categoryId);

          return { status: true };
        } catch (error) {
          logger.error("Error leaving the invitation: ", error);
          toast.error(error.message);
          await useSyncStore
            .getState()
            .pushErrorLog("leaveInvitationInStore", error.message);
          return { status: false };
        }
      },

      // # Get shared with me
      getSharedWithMe: () => {
        const sharedList = get().sharedWithMe;
        return sharedList.length > 0 ? sharedList : null;
      },

      // # Get invitations
      getInvitations: () => {
        const invitations = get().invitations;
        return invitations.length > 0 ? invitations : null;
      },

      // # Add user from realtime
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

      // # Remove user when owner
      removeUserWhenOwner: (invitationId, userId) => {
        set(
          produce((state) => {
            const invitation = state.invitations.find(
              (inv) => inv.invitation_id === invitationId,
            );
            if (invitation) {
              invitation.sharedWith = invitation.sharedWith.filter(
                (item) => item.user_id !== userId,
              );
            }
          }),
        );

        useTaskStore.getState().removeTasksByOwnerId(userId);
      },

      // # Remove user when not owner
      removeUserWhenNotOwner: (invitationId) => {
        let theSharedCat = null;
        set(
          produce((state) => {
            theSharedCat = state.sharedWithMe.find(
              (l) => l.invitation_id === invitationId,
            );
            if (theSharedCat) {
              state.sharedWithMe = state.sharedWithMe.filter(
                (sharedItem) => sharedItem.invitation_id !== invitationId,
              );
            }
          }),
        );

        if (theSharedCat) {
          useTaskStore
            .getState()
            .removeTasksByCategoryId(theSharedCat.invitation_category_id);
          useCategoryStore
            .getState()
            .removeCategoryById(theSharedCat.invitation_category_id);
        }
      },

      // # New helper: Set invitations list (for fetchDataOnMount)
      setInvitations: (invitations) => {
        set(
          produce((state) => {
            state.invitations = invitations;
          }),
        );
      },

      // # New helper: Set sharedWithMe list (for fetchDataOnMount)
      setSharedWithMe: (sharedWithMe) => {
        set(
          produce((state) => {
            state.sharedWithMe = sharedWithMe;
          }),
        );
      },

      resetStore: () => set(initialState),
    }),
    { name: "Invitation Store" },
  ),
);

export default useInvitationStore;
