import type { BookItem } from "./MyPage.types";

/**
 * Swagger API 응답 구조를 기반으로 한 마이페이지용 모의 데이터(Mock Data)입니다.
 *
 */
export const MOCK_BOOKS: BookItem[] = [
  // 1. 읽는 중 (READING)
  {
    userBookId: 101,
    bookId: 1,
    title: "책 제목 어쩌구저쩌구생각보다 제목이긴책이많다",
    author: "지은이, 옮긴이",
    publisher: "출판사",
    pubDate: "2000-08-04",
    itemPage: 132,
    coverUrl: "",
    status: "READING",
    createdAt: "2000-08-04T09:41:00Z",
    finishedAt: null,
    totalPageRead: 13,
    progressPercent: 10,
    rating: 0,
    updatedAt: "2026-01-14T10:00:00Z"
  },
  {
    userBookId: 102,
    bookId: 2,
    title: "리액트와 타입스크립트로 구현하는 독서 앱",
    author: "개발자 김철수",
    publisher: "테크출판",
    pubDate: "2025-12-01",
    itemPage: 300,
    coverUrl: "",
    status: "READING",
    createdAt: "2026-01-01T12:00:00Z",
    finishedAt: null,
    totalPageRead: 150,
    progressPercent: 50,
    rating: 0,
    updatedAt: "2026-01-27T18:00:00Z"
  },

  // 2. 완독한 (FINISHED)
  {
    userBookId: 201,
    bookId: 3,
    title: "책 제목을 입력합니다, 최대 1줄",
    author: "지은이, 옮긴이",
    publisher: "출판사",
    pubDate: "2000-08-04",
    itemPage: 130,
    coverUrl: "",
    status: "FINISHED",
    createdAt: "2000-08-04T09:00:00Z",
    finishedAt: "2000-08-04T18:00:00Z",
    totalPageRead: 130,
    progressPercent: 100,
    rating: 5.0,
    updatedAt: "2000-08-04T18:00:00Z"
  },

  // 3. 읽고 싶은 (BOOKMARKED)
  {
    userBookId: 301,
    bookId: 4,
    title: "나중에 읽을 베스트셀러",
    author: "유명 작가",
    publisher: "인기출판",
    pubDate: "2024-05-20",
    itemPage: 250,
    coverUrl: "",
    status: "BOOKMARKED",
    createdAt: "2026-01-20T15:00:00Z",
    finishedAt: null,
    totalPageRead: 0,
    progressPercent: 0,
    rating: 0,
    updatedAt: "2026-01-20T15:00:00Z"
  },

  // 4. 중단한 (PAUSED)
  {
    userBookId: 401,
    bookId: 5,
    title: "읽다가 지친 어려운 전공 서적",
    author: "교수님",
    publisher: "학술출판",
    pubDate: "2023-01-15",
    itemPage: 500,
    coverUrl: "",
    status: "PAUSED",
    createdAt: "2025-11-01T10:00:00Z",
    finishedAt: "2025-12-25T14:00:00Z", // 중단일로 활용
    totalPageRead: 45,
    progressPercent: 9,
    rating: 2.5,
    updatedAt: "2025-12-25T14:00:00Z"
  }
];
