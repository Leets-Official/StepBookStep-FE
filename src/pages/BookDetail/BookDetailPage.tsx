
import { useSearchParams, useLocation } from "react-router-dom";
import BookDetail from "./BookDetail";
import type { ReadingStatus } from "@/mocks/bookDetail.mock";

export default function BookDetailPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const entrySourceParam = searchParams.get("entrySource");

  const readingStatus: ReadingStatus =
    statusParam === "reading" || statusParam === "completed" ? statusParam : "before";
  const entrySource = entrySourceParam === "mypage" ? "mypage" : "home";

  return <BookDetail entrySource={entrySource} readingStatus={readingStatus} />;
}
