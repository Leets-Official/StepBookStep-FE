import type { ReadingStatus } from "@/components/StateCarousel/StateCarousel.types";

export interface BookReportProps {
  bookId: number;
  onClose?: () => void;
  onSave?: (data: BookReportData) => void;
  initialData?: Partial<BookReportData>;
  isTimerMode?: boolean;
  totalPages?: number;
  goalMetric?: "TIME" | "PAGE";
}

export interface BookReportData {
  status: ReadingStatus;
  date: Date | null;
  pages: string;
  duration: string;
  rating: number;
  finishedCount?: number | null;
}
