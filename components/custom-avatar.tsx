"use client";

import useUserStore from "@/store/user-store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CustomAvatar = () => {
  const t = useTranslations();
  const user = useUserStore((state) => state);

  return user.userId ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          {user.nickname || t("anonymous")}
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/profile">{t("profile")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => user.logout()}>
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="secondary" aria-label={t("login")}>
      <Link
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/keycloak`}
      >
        {t("login").toUpperCase()}
      </Link>
    </Button>
  );
};
export default CustomAvatar;
