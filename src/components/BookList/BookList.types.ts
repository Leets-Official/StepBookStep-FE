export type ReadingState = "before" | "reading" | "readingdetail" | "after";

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

  targetPeriod?: string;   // "1주일"
  targetAmount?: number;   // 100
  remainingAmount?: number;// 82
  isAchieved?: boolean;    // 목표 달성 여부

  
  level?: number;    
  country?: string;  
  genre?: string;   
  
  onClick?: () => void;
}
