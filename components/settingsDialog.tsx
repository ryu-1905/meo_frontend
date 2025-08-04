"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Check, Settings, X } from "lucide-react";
import useSettingStore from "@/store/setting-store";
import { cn } from "@/lib/utils";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
 * 25-07-2025  |   Ryu  |    Fix feature to check server connection
 */

const SERVER_CONNECTION_STATUS_ICON = {
  success: <Check className="text-green-500" />,
  failure: <X className="text-red-500" />,
};

const SettingsDialog = () => {
  const t = useTranslations();
  const setting = useSettingStore((state) => state);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" aria-label={t("settings")}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("settings")}</DialogTitle>
        </DialogHeader>
        <Button
          type="button"
          onClick={setting.checkServerConnection}
          variant="secondary"
          className={cn(
            "border-2",
            setting.server.isConnecting ? "border-green-500" : "border-red-500"
          )}
        >
          {t("check connection to server")}
          {setting.server.isConnecting
            ? SERVER_CONNECTION_STATUS_ICON.success
            : SERVER_CONNECTION_STATUS_ICON.failure}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
