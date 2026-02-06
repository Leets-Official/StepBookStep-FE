import { BookList } from "@/components/BookList/BookList";
import * as S from "@/pages/MyPage/MyPage.styles";
import type { BookItem } from "@/pages/MyPage/MyPage.types";

interface Props {
  data: BookItem[];
  onBookClick: (bookId: number) => void;
}

export const FinishedList = ({ data, onBookClick }: Props) => (
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
        startDate={book.createdAt ? book.createdAt.split("T")[0].replace(/-/g, ". ") : ""}
        endDate={book.finishedAt?.split("T")[0].replace(/-/g, ". ")}
        rating={book.rating}
        onClick={() => onBookClick(book.bookId)}
      />
    ))}
  </div>
);
