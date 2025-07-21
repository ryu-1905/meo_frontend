import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

/**
 * Manage setting state.
 *
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu     |    Create (mock data)
 */

const useUserStore = create(
  devtools(
    persist(
      combine(
        {
          userId: "",
          name: "",
          avatar: "https://github.com/shadcn.png",
          authToken: "",
          refreshToken: "",
        },
        (set) => ({
          changeUserId: (newUserId: string) => {
            set((state) => ({
              ...state,
              userId: newUserId,
            }));
          },
        })
      ),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserStore;
