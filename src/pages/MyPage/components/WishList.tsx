import { BookList } from "@/components/BookList/BookList";
import * as S from "@/pages/MyPage/MyPage.styles";
import type { BookItem } from "@/pages/MyPage/MyPage.types";

interface Props {
  data: BookItem[];
  onBookClick: (bookId: number) => void;
}

export const WishList = ({ data, onBookClick }: Props) => (
  <div className={S.listWrapper}>
    {data.length === 0 ? (
      <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
        아직 찜한 도서가 없어요.
      </div>
    ) : (
      data.map((book) => (
        <BookList
          key={book.userBookId}
          readingState="before"
          title={book.title || "제목 없음"}
          author={book.author}
          publisher={book.publisher}
          publicYear={book.pubDate ? book.pubDate.split("-")[0] : ""}
          coverImage={book.coverUrl}
          totalPages={book.itemPage}
          tags={[]}
          onClick={() => onBookClick(book.bookId)}
        />
      ))
    )}
  </div>
);
