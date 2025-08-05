import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu     |    Create (mock data)
 * 25-07-2025  |   Ryu     |    Fix feature to check server connection
 */

const useSettingStore = create(
  devtools(
    persist(
      combine(
        {
          server: { url: "", isConnecting: false },
        },
        (set) => ({
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
