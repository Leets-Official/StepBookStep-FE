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

  // entrySource 우선순위: from 파라미터 > status 파라미터 > 기본값(home)
  let entrySource: EntrySource = "home";
  if (fromParam) {
    entrySource = fromParam;
  } else if (searchParams.get("entrySource")) {
    entrySource = searchParams.get("entrySource") as EntrySource;
  } else if (statusParam === "reading" || statusParam === "completed") {
    // 마이페이지 등에서 읽는중/완독 탭에서 진입 시 mypage로
    entrySource = "mypage";
  }

  return <BookDetail entrySource={entrySource} readingStatus={readingStatus} />;
}
