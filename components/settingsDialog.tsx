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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useSettingStore from "@/store/setting-store";

/**
 * Settings UI
 *
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
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
        <Label>
          {t("server URL")}:
          <Input
            type="text"
            placeholder="http://localhost:8080"
            value={setting.server.url}
            onChange={(e) => setting.changeServerURL(e.target.value)}
          />
          <Button
            type="button"
            onClick={setting.checkServerConnection}
            variant="secondary"
          >
            {t("check")}
            {setting.server.isConnecting
              ? SERVER_CONNECTION_STATUS_ICON.success
              : SERVER_CONNECTION_STATUS_ICON.failure}
          </Button>
        </Label>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
