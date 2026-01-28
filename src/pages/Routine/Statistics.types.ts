// 통계 API 응답 타입 정의
export interface StatisticsResponse {
  success: boolean;
  status: number;
  code: string;
  message: string;
  data: StatisticsData;
  error: any[];
}

export interface StatisticsData {
  totalBooksRead: number; // 총 완독한 책 권수
  totalWeight: number; // 총 무게 (kg)
  yearlyReadingByMonth: MonthlyReading[]; // 월별 독서 데이터
  totalReadingMinutes: number; // 누적 독서 시간 (분)
  readingMonthsCount: number; // 독서한 월 수
  bestAchievementRate: number; // 최고 달성률
  currentAchievementRate: number; // 현재 평균 달성률
  genreStatistics: GenreStatistic[]; // 장르별 통계
  totalGenreCount: number; // 총 장르 수
}

export interface MonthlyReading {
  month: number; // 1-12
  completedBooks: number; // 해당 월에 완독한 책 수
}

export interface GenreStatistic {
  genreName: string;
  bookCount: number;
  percentage: number;
}

// 컴포넌트에서 사용할 변환된 데이터 타입
export interface ChartMonthData {
  month: number;
  count: number;
}

export interface PieChartData {
  name: string;
  count: number;
  percentage: number;
}