import { BookThumbnail } from "@/components/BookThumbnail/BookThumbnail";
import { BOOKS_MOCK } from "@/mocks/books.mock";
import { useHorizontalDragScroll } from "@/hooks/useHorizontalDragScroll";
import * as S from "./Home.styles";

export default function HorizontalBookSliderApp({ books }: { books: typeof BOOKS_MOCK }) {
  const { containerRef, dragged, handlers } = useHorizontalDragScroll();

  return (
    <div ref={containerRef} className={S.horizontalBookList} {...handlers}>
      {books.map((book) => (
        <div
          key={book.id}
          className={S.bookItem}
          onClick={(e) => {
            if (dragged) {
              e.preventDefault();
              return;
            }
          }}
        >
          <BookThumbnail title={book.title} coverUrl={book.coverUrl} />
        </div>
      ))}
    </div>
  );
}
