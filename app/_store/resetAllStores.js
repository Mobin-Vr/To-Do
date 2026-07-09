import useUserStore from "./useUserStore";
import useUiStore from "./useUiStore";
import useTaskStore from "./useTaskStore";
import useCategoryStore from "./useCategoryStore";
import useInvitationStore from "./useInvitationStore";
import useSyncStore from "./useSyncStore";
import useDeleteModalStore from "./useDeleteModalStore";

export const resetAllStores = () => {
  useUserStore.getState().resetStore();
  useUiStore.getState().resetStore();
  useTaskStore.getState().resetStore();
  useCategoryStore.getState().resetStore();
  useInvitationStore.getState().resetStore();
  useSyncStore.getState().resetStore();
  useDeleteModalStore.getState().resetStore();
};