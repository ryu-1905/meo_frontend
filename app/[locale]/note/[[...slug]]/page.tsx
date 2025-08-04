"use client";

import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorContextMenu from "@/components/editor-context-menu";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 21-07-2025  |   Ryu     |    Create
 */
const Note = () => {
  const t = useTranslations();

  const editorTitle = useEditor({
    extensions: [StarterKit],
    content: t("title"),
    immediatelyRender: false,
  });

  const editorContent = useEditor({
    extensions: [StarterKit],
    content: t("content"),
    immediatelyRender: false,
  });

  return (
    <main className="w-full bg-neutral-900 border-4 rounded-2xl">
      <EditorContextMenu editor={editorTitle}>
        <EditorContent
          editor={editorTitle}
          className="border-b-0 text-5xl font-bold p-2"
        />
      </EditorContextMenu>
      <Separator className="p-2" />
      <EditorContextMenu editor={editorContent}>
        <EditorContent editor={editorContent} className=" border-t-0 p-2" />
      </EditorContextMenu>
    </main>
  );
};

export default Note;
