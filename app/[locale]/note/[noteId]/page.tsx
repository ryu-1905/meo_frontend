"use client";

import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorContextMenu from "@/components/editor-context-menu";
import { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { axios } from "@/hooks/use-fetch";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 21-07-2025  |   Ryu     |    Create
 */

export type Note = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

const Note = ({ params }: { params: Promise<{ noteId: number }> }) => {
  const { noteId } = use(params);
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

  const fetchNote = async () => {
    const response = await axios.get<Note>(`/note/get/${noteId}`);
    const responseData = response.data;

    editorTitle?.commands.setContent(responseData.title);
    editorContent?.commands.setContent(responseData.content);
  };

  useEffect(() => {
    fetchNote();
  }, [noteId, editorTitle, editorContent]);

  const updateNote = async () => {
    const response = await axios.put<Note>("/note/update", {
      id: noteId,
      title: editorTitle?.getText(),
      content: editorContent?.getText(),
    });

    const responseData = response.data;

    editorTitle?.commands.setContent(responseData.title);
    editorContent?.commands.setContent(responseData.content);
  };

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
      <Button onClick={() => updateNote()}>{t("save")}</Button>
    </main>
  );
};

export default Note;
