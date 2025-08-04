import { axios } from "@/hooks/use-fetch";
import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { DateTime } from "luxon";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu     |    Create (mock data)
 */

const initialUser = {
  userId: "",
  email: "",
  nickname: "",
  avatar: "https://github.com/shadcn.png",
  accessToken: "",
  refreshToken: "",
  accessTokenExpiresAt: DateTime.utc().minus({ years: 1000 }),
};

const useUserStore = create(
  devtools(
    persist(
      combine(initialUser, (set) => ({
        login: async (token?: {
          accessToken: string;
          refreshToken: string;
          accessTokenExpiresAt: string;
        }) => {
          let result: typeof initialUser;

          if (!token) {
            const currentUserState = useUserStore.getState();

            const checkedToken = await checkAccessToken(
              currentUserState.accessToken,
              currentUserState.accessTokenExpiresAt,
              currentUserState.refreshToken
            );

            result = await login(
              checkedToken.accessToken,
              checkedToken.refreshToken,
              checkedToken.accessTokenExpiresAt
            );
          } else {
            result = await login(
              token!.accessToken,
              token!.refreshToken,
              DateTime.fromISO(token!.accessTokenExpiresAt, {
                setZone: true,
              })
            );
          }

          set((state) => ({ ...state, ...result }));
        },
        logout: () => set({ ...initialUser }),
      })),
      {
        name: "user-storage",
      }
    )
  )
);

const login = async (
  accessToken: string,
  refreshToken: string,
  accessTokenExpiresAt: DateTime
): Promise<typeof initialUser> => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const response = await axios.get("/user/info");

  const responseData = response.data as {
    sub: string;
    email: string;
    nickname?: string;
  };

  return {
    userId: responseData.sub,
    email: responseData.email,
    nickname: responseData.nickname || "",
    avatar: "https://github.com/shadcn.png",
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessTokenExpiresAt: accessTokenExpiresAt,
  };
};

const checkAccessToken = async (
  accessToken: string,
  accessTokenExpiresAt: DateTime,
  refreshToken: string
): Promise<{
  accessToken: string;
  accessTokenExpiresAt: DateTime;
  refreshToken: string;
}> => {
  console.debug(
    "Checking access token validity...",
    accessTokenExpiresAt < DateTime.utc(),
    accessTokenExpiresAt,
    DateTime.utc()
  );
  if (accessTokenExpiresAt < DateTime.utc()) {
    return {
      accessToken: accessToken,
      accessTokenExpiresAt: accessTokenExpiresAt,
      refreshToken: refreshToken,
    };
  }

  const response = await axios.post("/user/access-token", {
    refreshToken: refreshToken,
  });

  const responseData = response.data as {
    access_token: string;
    expires_in: number;
  };

  return {
    accessToken: responseData.access_token,
    accessTokenExpiresAt: DateTime.utc().plus({
      seconds: responseData.expires_in,
    }),
    refreshToken: refreshToken,
  };
};

export default useUserStore;
