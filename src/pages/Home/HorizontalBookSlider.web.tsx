import { useEffect, useRef, useState } from "react";
import { BookThumbnail } from "@/components/BookThumbnail/BookThumbnail";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import { BOOKS_MOCK } from "@/mocks/books.mock";
import * as S from "./Home.styles";

const ITEM_WIDTH = 122;

export default function HorizontalBookSliderWeb({ books }: { books: typeof BOOKS_MOCK }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const move = (dir: "left" | "right") => {
    containerRef.current?.scrollBy({
      left: dir === "left" ? -ITEM_WIDTH : ITEM_WIDTH,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div className={S.sliderWrapper} onMouseEnter={update}>
      {canLeft && (
        <button type="button" className={S.arrowLeft} onClick={() => move("left")}>
          <ChevronLeftIcon width={24} height={24} className="text-gray-500" />
        </button>
      )}

      <div ref={containerRef} className={S.horizontalBookList} onScroll={update}>
        {books.map((book) => (
          <div key={book.id} className={S.bookItem}>
            <BookThumbnail title={book.title} coverUrl={book.coverUrl} />
          </div>
        ))}
      </div>

      {canRight && (
        <button type="button" className={S.arrowRight} onClick={() => move("right")}>
          <ChevronRightIcon width={24} height={24} className="text-gray-500" />
        </button>
      )}
    </div>
  );
}
