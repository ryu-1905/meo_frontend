import { useTranslations } from "next-intl";
import { Input } from "./ui/input";

/**
 * Search
 *
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
 */
const Search = () => {
  const t = useTranslations();
  return (
    <div className="w-full my-4">
      <Input placeholder={t("search notes")} />
    </div>
  );
};

export default Search;
