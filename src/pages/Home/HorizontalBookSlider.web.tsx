import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookThumbnail } from "@/components/BookThumbnail/BookThumbnail";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import type { SliderBook } from "@/types/sliderBook";
import * as S from "./Home.styles";

const ITEM_WIDTH = 122;

interface Props {
  books: SliderBook[];
}

export default function HorizontalBookSliderWeb({ books }: Props) {
  const navigate = useNavigate();
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
        <button className={S.arrowLeft} onClick={() => move("left")}>
          <ChevronLeftIcon width={24} height={24} />
        </button>
      )}

      <div ref={containerRef} className={S.horizontalBookList} onScroll={update}>
        {books.map((book) => (
          <div
            key={book.bookId}
            className={S.bookItem}
            onClick={() => navigate(`/books/${book.bookId}`)}
          >
            <BookThumbnail title={book.title} coverUrl={book.coverUrl} />
          </div>
        ))}
      </div>

      {canRight && (
        <button className={S.arrowRight} onClick={() => move("right")}>
          <ChevronRightIcon width={24} height={24} />
        </button>
      )}
    </div>
  );
}
