import { BookList } from "@/components/BookList/BookList"; // BookList 컴포넌트 불러오기
import * as S from "@/pages/MyPage/MyPage.styles";
import type { BookItem } from "@/pages/MyPage/MyPage.types"; // BookItem 타입 불러오기

interface Props {
  data: BookItem[];
  onBookClick: () => void;
}

export const FinishedList = ({ data, onBookClick }: Props) => (
  <div className={S.listWrapper}>
    {data.map((book) => (
      <BookList
        key={book.userBookId}
        readingState="after"
        title={book.title}
        author={book.author}
        publisher={book.publisher}
        publicYear={book.pubDate.split('-')[0]}
        totalPages={book.itemPage}
        // 날짜 포맷팅 로직
        startDate={book.createdAt.split('T')[0].replace(/-/g, '. ')}
        endDate={book.finishedAt?.split('T')[0].replace(/-/g, '. ')}
        rating={book.rating}
        onClick={onBookClick}
      />
    ))}
  </div>
);
