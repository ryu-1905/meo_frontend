import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import SettingsDialog from "./settingsDialog";

/**
 * Footer
 *
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
 */
const Footer = () => {
  const t = useTranslations();
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-between items-center py-4 px-8">
      <h1 className="font-bold">Meo Notes</h1>
      <div className="flex gap-3">
        <SettingsDialog />
        <Button variant="secondary" aria-label={t("add new note")}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
