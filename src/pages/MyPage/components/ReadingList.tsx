import { BookList } from "@/components/BookList/BookList";
import * as S from "../MyPage.styles";
import type { BookItem } from "../MyPage.types";

interface Props {
  data: BookItem[];
  onBookClick: () => void; 
}

export const ReadingList = ({ data, onBookClick }: Props) => (
  <div className={S.listWrapper}>
    {data.map((book) => (
      <BookList
        key={book.userBookId}
        readingState="reading"
        title={book.title}
        author={book.author}
        publisher={book.publisher}
        publicYear={book.pubDate.split('-')[0]} // 연도만 추출
        totalPages={book.itemPage}
        currentPage={book.totalPageRead}
        startDate={book.createdAt.split('T')[0].replace(/-/g, '. ')}
        onClick={onBookClick}
      />
    ))}
  </div>
);
