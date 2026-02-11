
import { BookList } from "@/components/BookList/BookList";
import * as S from "@/pages/MyPage/MyPage.styles";
import type { BookItem } from "@/pages/MyPage/MyPage.types";
import { useEffect, useState } from "react";
import { getBookGoal } from "@/api/readings";

interface Props {
  data: BookItem[];
  onBookClick: (bookId: number) => void;
}

// UTC → KST 변환 함수
const formatKSTDate = (utcString?: string) => {
  if (!utcString) return "";
  const date = new Date(utcString);
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return `${kst.getFullYear()}. ${String(kst.getMonth() + 1).padStart(2, "0")}. ${String(kst.getDate()).padStart(2, "0")}`;
};

export const FinishedList = ({ data, onBookClick }: Props) => {
  const [goalDates, setGoalDates] = useState<Record<number, string>>({});

  useEffect(() => {
    let isMounted = true;
    const fetchGoals = async () => {
      const results: Record<number, string> = {};
      await Promise.all(
        data.map(async (book) => {
          try {
            const goal = await getBookGoal(book.bookId);
            if (goal && goal.createdAt) {
              results[book.bookId] = formatKSTDate(goal.createdAt);
            }
          } catch (e) {
            // 목표가 없거나 에러 시 무시 (fallback)
          }
        })
      );
      if (isMounted) setGoalDates(results);
    };
    fetchGoals();
    return () => { isMounted = false; };
  }, [data]);

  return (
    <div className={S.listWrapper}>
      {data.map((book) => (
        <BookList
          key={book.userBookId}
          readingState="after"
          title={book.title || "제목 없음"}
          author={book.author}
          publisher={book.publisher}
          publicYear={book.pubDate ? book.pubDate.split("-")[0] : ""}
          totalPages={book.itemPage}
          coverImage={book.coverUrl}
          startDate={goalDates[book.bookId] || formatKSTDate(book.createdAt)}
          endDate={formatKSTDate(book.finishedAt ?? undefined)}
          rating={book.rating ?? 0}
          onClick={() => onBookClick(book.bookId)}
        />
      ))}
    </div>
  );
};
