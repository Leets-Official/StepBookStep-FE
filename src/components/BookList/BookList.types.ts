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

  targetPeriod?: string;   
  targetAmount?: number;   
  remainingAmount?: number;
  isAchieved?: boolean;    

  
  level?: number;    
  country?: string;  
  genre?: string;   
  
  coverImage?: string;

  onClick?: () => void;
}
