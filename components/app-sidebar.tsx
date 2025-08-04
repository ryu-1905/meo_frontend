"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import CustomAvatar from "./custom-avatar";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
 */
const AppSidebar = () => {
  const t = useTranslations();

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>ad</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <Button variant="secondary" aria-label={t("open sidebar")} asChild>
              <SidebarTrigger />
            </Button>
            <CustomAvatar />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
