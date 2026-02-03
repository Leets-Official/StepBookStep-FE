import { BookList } from "@/components/BookList/BookList";
import * as S from "../MyPage.styles";
import type { BookItem } from "../MyPage.types";


interface Props {
  data: BookItem[];
  onBookClick: () => void;
}

export const WishList = ({ data, onBookClick }: Props) => {
  return (
    <div className={S.listWrapper}>
      {data.map((book) => (
        <BookList
          key={book.userBookId}
          readingState="before" //
          title={book.title || ""}
          author={book.author}
          publisher={book.publisher}
          publicYear={book.pubDate.split('-')[0]} // 연도 추출
          totalPages={book.itemPage}
          // Swagger 데이터 구조에 따라 태그가 있으면 연결, 없으면 기본값 표시
          tags={["태그 키워드", "태그 키워드", "태그 키워드"]} 
          onClick={onBookClick}
        />
      ))}
    </div>
  );
};
