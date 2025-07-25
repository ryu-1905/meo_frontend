"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import SettingsDialog from "./settingsDialog";
import { Link, usePathname } from "@/i18n/navigation";
import { SidebarTrigger } from "./ui/sidebar";

/**
 * Footer
 *
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create
 */
const Footer = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-between items-center py-4 px-8">
      <h1 className="font-bold">Meo Notes</h1>
      <div className="flex gap-3">
        <SettingsDialog />
        <Button variant="secondary" aria-label={t("add new note")} asChild>
          <Link href="/note">
            <Plus />
          </Link>
        </Button>
        {pathname !== "/" ? (
          <Button variant="secondary" aria-label={t("open sidebar")} asChild>
            <SidebarTrigger />
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Footer;
