import type { StatisticsData } from "@/pages/Routine/Statistics.types";

// Mock 통계 데이터
// TODO: API 연동 시 이 파일을 삭제하거나 fetchStatistics 함수에서 사용하지 않도록 수정
export const MOCK_STATISTICS_DATA: StatisticsData = {
  totalBooksRead: 8,
  totalWeight: 4.6,
  yearlyReadingByMonth: [
    { month: 1, completedBooks: 2 },
    { month: 2, completedBooks: 3 },
    { month: 3, completedBooks: 5 },
    { month: 4, completedBooks: 2 },
    { month: 5, completedBooks: 3 },
    { month: 6, completedBooks: 1 },
    { month: 7, completedBooks: 0 },
    { month: 8, completedBooks: 0 },
    { month: 9, completedBooks: 1 },
    { month: 10, completedBooks: 2 },
    { month: 11, completedBooks: 3 },
    { month: 12, completedBooks: 4 },
  ],
  totalReadingMinutes: 5525, // 92시간 5분
  readingMonthsCount: 3,
  bestAchievementRate: 100,
  currentAchievementRate: 91,
  genreStatistics: [
    { genreName: "분류", bookCount: 6, percentage: 67 },
    { genreName: "분류분류", bookCount: 2, percentage: 22 },
    { genreName: "분류", bookCount: 1, percentage: 11 },
  ],
  totalGenreCount: 3,
};