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
        userState: initialState.userState,

        setUserState: (userState) => {
          set(
            produce((state) => {
              state.userState = userState;
            }),
          );
          // Initial data fetching is now handled by the server‑side layout.
          // No need to call fetchDataOnMount here.
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
