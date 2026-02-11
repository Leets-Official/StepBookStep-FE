import { useNavigate } from "react-router-dom";
import { BookThumbnail } from "@/components/BookThumbnail/BookThumbnail";
import { useHorizontalDragScroll } from "@/hooks/useHorizontalDragScroll";
import type { SliderBook } from "@/types/sliderBook";
import * as S from "./Home.styles";

interface Props {
  books: SliderBook[];
}

export default function HorizontalBookSliderApp({ books }: Props) {
  const navigate = useNavigate();
  const { containerRef, dragged, handlers } = useHorizontalDragScroll();

  return (
    <div ref={containerRef} className={S.horizontalBookList} {...handlers}>
      {books.map((book) => (
        <div
          key={book.bookId}
          className={S.bookItem}
          onClick={() => {
            if (dragged) return;
            navigate(`/books/${book.bookId}`);
          }}
        >
          <BookThumbnail title={book.title} coverUrl={book.coverUrl} />
        </div>
      ))}
    </div>
  );
}
