export type ReadStatus = "READING" | "FINISHED" | "PAUSED" | "BOOKMARKED";

export interface BookItem {
  userBookId: number;
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  itemPage: number; 
  coverUrl: string;
  status: ReadStatus;
  createdAt: string; 
  finishedAt: string | null; 
  totalPageRead: number; 
  progressPercent: number;
  rating: number;
  updatedAt: string;
}

export interface MyPageTabProps {
  label: string;
  status: ReadStatus;
}
