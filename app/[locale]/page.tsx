import { useFormatter, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Home page
 *
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 17-07-2025  |   Ryu  |    Create (mock data)
 */

type Note = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

const mockNotes: Note[] = [
  {
    id: 1,
    title: "Kế hoạch cuối tuần",
    content:
      "Lên kế hoạch đi siêu thị, dọn dẹp nhà cửa và chuẩn bị cho buổi dã...",
    updatedAt: "2025-07-05",
  },
  {
    id: 2,
    title: "Ý tưởng dự án mới",
    content:
      "Nghiên cứu về ứng dụng quản lý tài chính cá nhân với tính năng AI phâ...",
    updatedAt: "2025-07-04",
  },
  {
    id: 3,
    title: "Công thức nấu ăn: Bún chả",
    content:
      "Chuẩn bị thịt ba chỉ, nem, bún tươi, rau sống và nước chấm chua ngọt...",
    updatedAt: "2025-07-03",
  },
  {
    id: 4,
    title: "Ghi chú cuộc họp 02/07",
    content:
      "Thảo luận về tiến độ dự án X, các vấn đề phát sinh và phân công...",
    updatedAt: "2025-07-02",
  },
  {
    id: 5,
    title: "Sách cần đọc trong tháng 7",
    content:
      '"Atomic Habits" của James Clear, "The Psychology of Money" của...',
    updatedAt: "2025-07-01",
  },
  {
    id: 6,
    title: "Ý tưởng quà tặng sinh nhật",
    content: "Váy mới, bộ ấm trà, hoặc một chuyến đi nghỉ dưỡng ngắn ngày...",
    updatedAt: "2025-06-30",
  },
];

const Notes = () => {
  const t = useTranslations();
  const format = useFormatter();

  return (
    <main className="w-full grid grid-cols-5 gap-4">
      {mockNotes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle className="font-bold">{note.title}</CardTitle>
            <CardDescription>{`${t("last updated")}: ${format.dateTime(
              new Date(note.updatedAt)
            )}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{note.content}</p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default Notes;
