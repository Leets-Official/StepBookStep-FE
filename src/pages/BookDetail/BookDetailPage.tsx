import { useSearchParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import type { ReadingStatus } from "@/mocks/bookDetail.mock";

export default function BookDetailPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

  const readingStatus: ReadingStatus =
    statusParam === "reading" || statusParam === "completed" ? statusParam : "before";

  return <BookDetail entrySource="home" readingStatus={readingStatus} />;
}
