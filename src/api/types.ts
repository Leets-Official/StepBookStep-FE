// ============================================
// 공통 API 응답 구조 (Swagger)
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  code: string;
  message: string;
  data: T;
  error?: ApiError[];
}

export interface ApiError {
  field: string;
  message: string;
}

// ============================================
// 도서 관련 타입 (Swagger)
// ============================================
export interface BookInfo {
  bookId: number;           // Swagger: bookId
  coverImage: string;       // Swagger: coverImage
  title: string;            // Swagger: title
  author: string;           // Swagger: author
  publisher: string;        // Swagger: publisher
  pubDate: string;          // Swagger: pubDate
  totalPage: number;        // Swagger: totalPage
  priceStandard: number;    // Swagger: priceStandard
  link: string;             // Swagger: link (알라딘 링크)
  description: string;      // Swagger: description
  tags: string[];           // Swagger: tags
  level: number;            // Swagger: level
}

export interface BookDetailResponse {
  bookInfo: BookInfo;       // Swagger: bookInfo
  bookmarked: boolean;      // Swagger: bookmarked
}

// ============================================
// 목표 관련 타입 (Swagger)
// ============================================
export type GoalPeriod = "DAILY" | "WEEKLY" | "MONTHLY";
export type GoalMetric = "TIME" | "PAGE";

export interface Goal {
  goalId: number;           // Swagger: goalId
  bookId: number;           // Swagger: bookId
  period: GoalPeriod;       // Swagger: period (DAILY/WEEKLY/MONTHLY)
  metric: GoalMetric;       // Swagger: metric (TIME/PAGE)
  targetAmount: number;     // Swagger: targetAmount (목표량)
  currentProgress: number;  // Swagger: currentProgress (현재 진행도)
  achievedAmount: number;   // Swagger: achievedAmount (달성량)
  createdAt: string;        // Swagger: createdAt
  updatedAt: string;        // Swagger: updatedAt
  active: boolean;          // Swagger: active
}

// ============================================
// BookList에서 사용할 복합 타입
// ============================================
export interface BookWithGoal {
  bookInfo: BookInfo;
  goal: Goal;
}

// ============================================
// 기존 mock 타입과의 호환성
// ============================================
export type ReadingStatus = "before" | "reading" | "completed";

// Swagger → Mock 변환 헬퍼 함수들
export const mapBookInfoToMock = (bookInfo: BookInfo) => ({
  id: bookInfo.bookId,
  level: bookInfo.level,
  title: bookInfo.title,
  author: bookInfo.author,
  publisher: bookInfo.publisher,
  publishYear: parseInt(bookInfo.pubDate.substring(0, 4)), // "2024-01-01" → 2024
  totalPage: bookInfo.totalPage,
  price: bookInfo.priceStandard,
  storeLink: bookInfo.link,
  tags: bookInfo.tags,
  description: bookInfo.description,
});

export const mapGoalPeriodToKorean = (period: GoalPeriod): string => {
  switch (period) {
    case "DAILY": return "하루";
    case "WEEKLY": return "1주일";
    case "MONTHLY": return "한 달";
    default: return "하루";
  }
};

// 1. 루틴 목록 조회용 개별 아이템 타입 (Swagger 필드명 반영)
export interface RoutineItem {
  goalId: number;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookCoverImage: string;
  bookPublisher: string;
  bookPublishYear: number;
  bookTotalPages: number;
  bookStatus: "READING" | "COMPLETED"; // 독서 상태
  period: GoalPeriod;   // "DAILY" | "WEEKLY" | "MONTHLY"
  metric: GoalMetric;   // "TIME" | "PAGE"
  targetAmount: number;
  achievedAmount: number;
  remainingAmount: number;
}

// 2. 루틴 목록 API 응답 데이터 타입
export interface RoutineListData {
  routines: RoutineItem[];
}

// ============================================
// 독서 기록 생성 관련 타입
// ============================================

export interface CreateReadingLogRequest {
  bookStatus: "READING" | "FINISHED" | "STOPPED";
  recordDate?: string;      // 생략 시 오늘 날짜
  readQuantity?: number;    // READING 상태일 때 필수
  durationSeconds?: number; // READING & TIME 목표일 때 필수
  rating?: number;          // FINISHED/STOPPED 상태일 때 필수 (1-5)
}

export interface CreateReadingLogResponse {
  recordId: number;
}


// ============================================
// 독서 목표 생성/수정/삭제 관련 타입
// ============================================

export interface UpdateGoalRequest {
  period?: GoalPeriod;      // 생성/수정 시 필요
  metric?: GoalMetric;      // 생성/수정 시 필요
  targetAmount?: number;    // 생성/수정 시 필요
  delete?: boolean;         // 삭제 시 true
}

// ============================================
// 도서 필터 검색 타입
// ============================================
export interface FilterBooksParams {
  level?: number;           // 난이도 (1, 2, 3)
  pageRange?: string[];     // 분량 (~200, 201~250, 251~350, 351~500, 501~650, 651~)
  origin?: string;          // 국가별 분류
  genre?: string;           // 장르별 분류
  keyword?: string;         // 검색어 (제목, 저자, 출판사)
  cursor?: number;          // 마지막으로 조회한 bookId
}

export interface FilterBooksResponse {
  books: BookSearchItem[];
  hasNext: boolean;
}

// ============================================
// 도서 검색 타입
// ============================================

export interface BookSearchItem {
  bookId: number;
  coverImage: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  totalPage: number;
  tags: string[];
}

export interface SearchBooksParams {
  keyword?: string;  // 검색어 (제목, 저자, 출판사)
}
