import { BookList } from "@/components/BookList/BookList";

export default function PlayGround() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-4">
      <BookList
        readingState="before"
        title="책 제목을 입력합니다, 최대 1줄"
        author="지은이, 옮긴이"
        publisher="출판사"
        publicYear="1999"
        totalPages={130}
        tags={["태그 키워드", "태그 키워드", "태그 키워드"]}
      />

      <BookList
        readingState="reading"
        title="책 제목을 입력합니다, 최대 1줄"
        author="지은이, 옮긴이"
        publisher="출판사"
        publicYear="1998"
        totalPages={130}
        startDate="2000. 08. 04"
        currentPage={13}
      />

      <BookList
        readingState="after"
        title="책 제목을 입력합니다, 최대 1줄"
        author="지은이, 옮긴이"
        publisher="출판사"
        publicYear="2001"
        totalPages={130}
        startDate="2000. 08. 04"
        endDate="2000. 08. 04"
        rating={5.0}
      />
    </div>
  );
}
