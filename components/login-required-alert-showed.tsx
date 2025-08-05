"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "@/i18n/navigation";
import useUserStore from "@/store/user-store";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const LoginRequiredAlertShowed = () => {
  const user = useUserStore((state) => state);
  const t = useTranslations();
  const [isLoginRequiredAlertShowed, setIsLoginRequiredAlertShowed] =
    useState(false);

  useEffect(() => {
    if (!user.userId) {
      setIsLoginRequiredAlertShowed(true);
    } else {
      setIsLoginRequiredAlertShowed(false);
      user.login();
    }
  }, [user.userId]);

  return (
    <AlertDialog open={isLoginRequiredAlertShowed}>
      <AlertDialogContent className="fixed ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("please login to use this application")}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              setIsLoginRequiredAlertShowed(!isLoginRequiredAlertShowed)
            }
          >
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              setIsLoginRequiredAlertShowed(!isLoginRequiredAlertShowed)
            }
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/keycloak`}
            >
              {t("login")}
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginRequiredAlertShowed;
