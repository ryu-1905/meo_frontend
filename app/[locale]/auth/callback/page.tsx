"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "@/i18n/navigation";
import useUserStore from "@/store/user-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 01-08-2025  |   Ryu     |    Create
 */
const AuthCallBack = () => {
  const user = useUserStore((state) => state);
  const router = useRouter();

  const searchParams = useSearchParams();
  const accessToken = searchParams.get("token");
  const refreshToken = searchParams.get("refresh-token");
  const accessTokenExpiresAt = searchParams.get("access-token-expires-at");

  useEffect(() => {
    if (accessToken && refreshToken && accessTokenExpiresAt) {
      user.login({
        accessToken: decodeURIComponent(accessToken),
        refreshToken: decodeURIComponent(refreshToken),
        accessTokenExpiresAt: decodeURIComponent(accessTokenExpiresAt),
      });
      router.push("/");
    }
  }, [accessToken, refreshToken, accessTokenExpiresAt]);

  return <Skeleton className="h-4/5 w-full" />;
};

export default AuthCallBack;
