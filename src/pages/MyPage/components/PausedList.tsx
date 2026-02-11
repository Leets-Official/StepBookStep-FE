import { BookList } from "@/components/BookList/BookList";
import * as S from "../MyPage.styles";
import type { BookItem } from "../MyPage.types";

interface Props {
  data: BookItem[];
  onBookClick: (bookId: number) => void;
}

export const PausedList = ({ data, onBookClick }: Props) => {
  return (
    <div className={S.listWrapper}>
      {data.map((book) => (
        <BookList
          key={book.userBookId}
          readingState="after"
          title={book.title || ""}
          author={book.author}
          publisher={book.publisher}
          publicYear={book.pubDate ? book.pubDate.split("-")[0] : ""}
          totalPages={book.itemPage}
          startDate={book.createdAt ? book.createdAt.split("T")[0].replace(/-/g, ". ") : ""}
          endDate={book.updatedAt ? book.updatedAt.split("T")[0].replace(/-/g, ". ") : ""}
          rating={book.rating}
          coverImage={book.coverUrl}
          onClick={() => onBookClick(book.bookId)}
        />
      ))}
    </div>
  );
};
