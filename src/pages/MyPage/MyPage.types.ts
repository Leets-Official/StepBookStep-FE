export type ReadStatus = "READING" | "FINISHED" | "STOPPED" | "BOOKMARKED";

export interface MyBookParams {
  readStatus: ReadStatus;
  page?: number;
  size?: number;
  sort?: string; 
}
export interface BookItem {
  userBookId: number;
  bookId: number;
  title?: string; 
  author: string;
  publisher: string;
  pubDate: string;
  itemPage: number;
  coverUrl: string;
  status: ReadStatus;
  createdAt: string;
  finishedAt: string | null;
  totalPagesRead: number; 
  progressPercent: number;
  rating: number;
  updatedAt: string;
  bookmarked: boolean;
}


export interface MyLibraryResponse {
  items: BookItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface MyPageTabProps {
  label: string;
  status: ReadStatus;
  onTabChange?: (status: ReadStatus) => void; 
}
