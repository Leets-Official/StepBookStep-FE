import { useSearchParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import type { EntrySource } from "./BookDetail";
import type { ReadingStatus } from "./BookDetail";

export default function BookDetailPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const fromParam = searchParams.get("from") as EntrySource | null;

  const readingStatus: ReadingStatus =
    statusParam === "reading" || statusParam === "completed" ? statusParam : "before";

  return <BookDetail entrySource={fromParam || "home"} readingStatus={readingStatus} />;
}
