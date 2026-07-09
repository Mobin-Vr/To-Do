import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const initialState = {
  userState: {},
};

const useUserStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        userState: initialState.userState,

        // Actions
        setUserState: (userState) => {
          set(
            produce((state) => {
              state.userState = userState;
            }),
          );
          // NOTE: The original internal call to fetchDataOnMount() is REMOVED
          // to avoid circular imports. Call sites must now call:
          //   useUserStore.getState().setUserState(user);
          //   useSyncStore.getState().fetchDataOnMount();
        },

        getUserState: () => {
          return get().userState;
        },

        resetStore: () => set(initialState),
      }),
      {
        name: "user-store",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          userState: state.userState,
        }),
      },
    ),
    { name: "User Store" },
  ),
);

export default useUserStore;