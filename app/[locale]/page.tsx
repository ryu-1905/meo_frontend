"use client";

import { useFormatter, useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axios, useFetch } from "@/hooks/use-fetch";
import { Link } from "@/i18n/navigation";
import { Note } from "./note/[noteId]/page";
import { Trash2 } from "lucide-react";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
 */

export type pageable = {
  pageNumber: number;
  pageSize: number;
};

const Notes = () => {
  const t = useTranslations();
  const format = useFormatter();

  const { data } = useFetch<{
    content: Note[];
    pageable: pageable;
  }>("/note/get-all");

  const renderData = data?.content.map((note) => (
    <Link href={`/note/${note.id}`} key={note.id}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold flex justify-between">
            {note.title}{" "}
            <button onClick={() => deleteNote(note.id)}>
              <Trash2 />
            </button>
          </CardTitle>
          <CardDescription>{`${t("last updated")}: ${format.dateTime(
            new Date(note.updatedAt)
          )}`}</CardDescription>
        </CardHeader>
        <CardContent>{note.content}</CardContent>
      </Card>
    </Link>
  ));

  const deleteNote = async (noteId: number) => {
    await axios.delete(`/note/delete/${noteId}`);
  };

  return <main className="w-full grid grid-cols-5 gap-4"> {renderData} </main>;
};

export default Notes;
