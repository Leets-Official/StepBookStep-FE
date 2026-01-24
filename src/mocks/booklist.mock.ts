import type { BookListProps } from "@/components/BookList/BookList.types";

export const DUMMY_BOOKS: BookListProps[] = Array(4).fill({
  readingState: "readingdetail",
  title: "책 제목을 입력합니다, 최대 1줄",
  author: "지은이, 옮긴이",
  publisher: "출판사",
  publicYear: "1998",
  totalPages: 130,
  
  // ReadingDetail 전용 Props
  targetPeriod: "1주일",
  targetAmount: 100,
  remainingAmount: 82,
  isAchieved: false,
});