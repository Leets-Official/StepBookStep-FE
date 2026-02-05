import { BookList } from "@/components/BookList/BookList";
import * as S from "../MyPage.styles";
import type { BookItem } from "../MyPage.types";

interface Props {
  data: BookItem[];
  onBookClick: (bookId: number) => void;
}

export const ReadingList = ({ data, onBookClick }: Props) => (
  <div className={S.listWrapper}>
    {data.map((book) => (
      <BookList
        key={book.userBookId}
        readingState="reading"
        title={book.title || ""}
        author={book.author}
        publisher={book.publisher}
        publicYear={book.pubDate ? book.pubDate.split("-")[0] : ""}
        totalPages={book.itemPage}
        currentPage={book.totalPagesRead || 0}
        startDate={book.createdAt ? book.createdAt.split("T")[0].replace(/-/g, ". ") : ""}
        onClick={() => onBookClick(book.bookId)}
      />
    ))}
  </div>
);
