"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import SettingsDialog from "./settingsDialog";
import { Link, useRouter } from "@/i18n/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import LoginRequiredAlertShowed from "./login-required-alert-showed";
import { axios } from "@/hooks/use-fetch";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create
 */
const Footer = () => {
  const t = useTranslations();
  const router = useRouter();

  const createNewNote = async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/note/create"
    );
    router.push(`/note/${response.data.id}`);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-between items-center py-4 px-8">
      <Link href="/" className="font-bold">
        Meo Notes
      </Link>
      <div className="flex gap-3">
        <SettingsDialog />
        <Button
          variant="secondary"
          aria-label={t("add new note")}
          onClick={createNewNote}
        >
          <Plus />
        </Button>
        <Button
          variant="secondary"
          aria-label={t("open sidebar")}
          className="!px-6"
          asChild
        >
          <SidebarTrigger />
        </Button>
      </div>
      <LoginRequiredAlertShowed />
    </div>
  );
};

export default Footer;
