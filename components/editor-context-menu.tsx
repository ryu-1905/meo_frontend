import { Editor } from "@tiptap/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useTranslations } from "next-intl";

/**
 * Editor Context Menu
 *
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 21-07-2025  |   Ryu     |    Create
 */
const EditorContextMenu = ({
  children,
  editor,
}: {
  children: React.ReactNode;
  editor: Editor | null;
}) => {
  const t = useTranslations();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandSeparator />
            <CommandGroup heading={t("all commands")}>
              <CommandItem>
                <ContextMenuItem
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  {t("bold")}
                </ContextMenuItem>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EditorContextMenu;
