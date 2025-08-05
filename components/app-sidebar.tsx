"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import CustomAvatar from "./custom-avatar";
import { axios, useFetch } from "@/hooks/use-fetch";
import { Note } from "@/app/[locale]/note/[noteId]/page";
import { pageable } from "@/app/[locale]/page";
import { Link } from "@/i18n/navigation";
import { Trash2 } from "lucide-react";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
 */
const AppSidebar = () => {
  const t = useTranslations();

  const { data } = useFetch<{
    content: Note[];
    pageable: pageable;
  }>("/note/get-all");

  const deleteNote = async (noteId: number) => {
    await axios.delete(`/note/delete/${noteId}`);
  };

  const renderData = data?.content.map((note) => (
    <SidebarMenuItem key={note.id}>
      <SidebarMenuButton asChild>
        <Link href={`/note/${note.id}`} className="flex justify-between">
          {note.title}{" "}
          <button onClick={() => deleteNote(note.id)}>
            <Trash2 />
          </button>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderData}</SidebarMenu>
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
