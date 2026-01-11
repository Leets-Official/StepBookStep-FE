export type ReadingState = "before" | "reading" | "after";

export interface BookListProps {
  readingState: ReadingState;

  title: string;
  author: string;
  publisher: string;
  publicYear: string;
  totalPages: number;

  tags?: string[];

  startDate?: string;
  endDate?: string;

  currentPage?: number;
  rating?: number;
}
