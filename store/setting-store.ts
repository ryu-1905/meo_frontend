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

const useSettingStore = create(
  devtools(
    persist(
      combine(
        {
          server: { url: "", isConnecting: false },
        },
        (set) => ({
          changeServerURL: (newUrl: string) => {
            set((state) => ({
              ...state,
              server: { ...state.server, url: newUrl },
            }));
          },
          checkServerConnection: () =>
            set((state) => ({
              ...state,
              server: {
                ...state.server,
                isConnecting: !state.server.isConnecting,
              },
            })),
        })
      ),
      {
        name: "settings-storage",
      }
    )
  )
);

export default useSettingStore;
