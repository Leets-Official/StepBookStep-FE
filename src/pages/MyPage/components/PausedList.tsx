import { BookList } from "@/components/BookList/BookList";
import * as S from "../MyPage.styles";
import type { BookItem } from "../MyPage.types";

interface Props {
  data: BookItem[];
}

export const PausedList = ({ data }: Props) => {
  return (
    <div className={S.listWrapper}>
      {data.map((book) => (
        <BookList
          key={book.userBookId}
          readingState="after" //
          title={book.title}
          author={book.author}
          publisher={book.publisher}
          publicYear={book.pubDate.split('-')[0]}
          totalPages={book.itemPage}
          // 날짜 포맷팅: "2026. 01. 14" 형식으로 변환
          startDate={book.createdAt.split('T')[0].replace(/-/g, '. ')}
          endDate={book.updatedAt.split('T')[0].replace(/-/g, '. ')} // 중단일로 표시됨
          rating={book.rating}
        />
      ))}
    </div>
  );
};
