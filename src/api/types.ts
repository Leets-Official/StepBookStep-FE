// ============================================
// 공통 API 응답 구조
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
// 도서 관련 타입 (상세 조회용)
// GET /api/v1/books/{bookId}
// ============================================
export interface BookInfo {
  bookId: number;
  coverImage: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  totalPage: number;
  priceStandard: number;
  link: string;
  description: string;
  tags: string[];
  level: number;
}

export interface BookDetailResponse {
  bookInfo: BookInfo;
  bookmarked: boolean;
}

// ============================================
// 도서 목록 아이템 타입 (검색/필터용)
// GET /api/v1/books/search & /api/v1/books/filter
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

// ============================================
// 도서 검색 파라미터 & 응답
// GET /api/v1/books/search
// ============================================
export interface SearchBooksParams {
  keyword?: string; // 검색어 (제목, 저자, 출판사)
}

// ============================================
// 도서 필터 검색 파라미터 & 응답
// GET /api/v1/books/filter
// ============================================
export interface FilterBooksParams {
  level?: number;
  pageRange?: string;
  origin?: string;
  genre?: string;
  keyword?: string;
  cursor?: number;
}

export interface FilterBooksResponse {
  books: BookSearchItem[];
  hasNext: boolean;
}

// ============================================
// 목표 관련 타입
// ============================================
export type GoalPeriod = "DAILY" | "WEEKLY" | "MONTHLY";
export type GoalMetric = "TIME" | "PAGE";

export interface Goal {
  goalId: number;
  bookId: number;
  period: GoalPeriod;
  metric: GoalMetric;
  targetAmount: number;
  currentProgress: number;
  achievedAmount: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

// ============================================
// 루틴 관련 타입
// ============================================
export interface RoutineItem {
  goalId: number;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookCoverImage: string;
  bookPublisher: string;
  bookPublishYear: number;
  bookTotalPages: number;
  bookStatus: "READING" | "COMPLETED";
  period: GoalPeriod;
  metric: GoalMetric;
  targetAmount: number;
  achievedAmount: number;
  remainingAmount: number;
}

export interface RoutineListData {
  routines: RoutineItem[];
}

// ============================================
// 독서 기록 생성/조회 관련 타입
// ============================================
export interface CreateReadingLogRequest {
  bookStatus: "READING" | "FINISHED" | "STOPPED";
  recordDate?: string; // 생략 시 오늘 날짜
  readQuantity?: number; // READING 상태일 때 필수
  durationSeconds?: number; // READING & TIME 목표일 때 필수
  rating?: number; // FINISHED/STOPPED 상태일 때 필수 (1-5)
}

export interface CreateReadingLogResponse {
  recordId: number;
  finishedCount: number | null;
}

export interface ReadingLog {
  recordId: number;
  bookId: number;
  bookStatus: "READING" | "FINISHED" | "STOPPED";
  readQuantity?: number;
  durationSeconds?: number;
  recordDate: string;
  createdAt: string;
  // 필요 시 추가 필드 정의
}

// ============================================
// 독서 목표 생성/수정 타입
// ============================================
export interface UpdateGoalRequest {
  period?: GoalPeriod;
  metric?: GoalMetric;
  targetAmount?: number;
  delete?: boolean;
}

// ============================================
// 통계 관련 타입
// ============================================
export interface GetStatisticsParams {
  year?: number;
}

export interface BookSummary {
  finishedBookCount: number;
  totalWeightKg: number;
}

export interface MonthlyDataItem {
  month: number;
  bookCount: number;
  currentMonth: boolean;
}

export interface MonthlyGraph {
  year: number;
  monthlyData: MonthlyDataItem[];
}

export interface CumulativeTime {
  hours: number;
  minutes: number;
  totalMinutes: number;
}

export interface GoalAchievement {
  achievementRate: number;
  maxAchievementRate: number;
}

export interface CategoryItem {
  rank: number;
  categoryName: string;
  bookCount: number;
  percentage: number;
}

export interface CategoryPreference {
  totalBookCount: number;
  categories: CategoryItem[];
}

export interface StatisticsResponse {
  bookSummary: BookSummary;
  monthlyGraph: MonthlyGraph;
  cumulativeTime: CumulativeTime;
  goalAchievement: GoalAchievement;
  categoryPreference: CategoryPreference;
}

// ============================================
// 헬퍼 함수
// ============================================
export const mapBookInfoToMock = (bookInfo: BookInfo | BookSearchItem) => ({
  id: bookInfo.bookId,
  // 목록 조회 시 level이 없으면 기본값 1
  level: "level" in bookInfo ? bookInfo.level : 1,
  title: bookInfo.title,
  author: bookInfo.author,
  publisher: bookInfo.publisher,
  publicYear: bookInfo.pubDate ? bookInfo.pubDate.substring(0, 4) : "",
  totalPages: bookInfo.totalPage,

  coverImage: bookInfo.coverImage,

  price: "priceStandard" in bookInfo ? bookInfo.priceStandard : 0,
  storeLink: "link" in bookInfo ? bookInfo.link : "",
  tags: bookInfo.tags,
  description: "description" in bookInfo ? bookInfo.description : "",
});
export const mapGoalPeriodToKorean = (period: GoalPeriod): string => {
  switch (period) {
    case "DAILY":
      return "하루";
    case "WEEKLY":
      return "1주일";
    case "MONTHLY":
      return "한 달";
    default:
      return "하루";
  }
};
