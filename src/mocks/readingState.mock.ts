// ReadingLog 타입 정의 (필요시 types/index.ts 등으로 이동 가능)
export interface ReadingLog {
  date: string;
  page: number;
  percent: number;
  time: string;
}

export interface ReadingDetailData {
  id: number;
  isCompleted: boolean;
  title: string;
  currentPage: number;
  totalPage: number;
  startDate: string;
  endDate?: string;
  review?: string;
  logs: ReadingLog[];
}

// 읽는 중 상태의 더미 데이터
export const MOCK_READING_DATA: ReadingDetailData = {
  id: 1,
  isCompleted: false,
  title: "데미안",
  currentPage: 45,
  totalPage: 200,
  startDate: "2024. 01. 10",
  logs: [
    { date: "2024. 01. 10", page: 10, percent: 5, time: "15분 20초" },
    { date: "2024. 01. 11", page: 25, percent: 12, time: "20분 45초" },
    { date: "2024. 01. 12", page: 45, percent: 22, time: "30분 10초" },
  ],
};

// 완독 상태의 더미 데이터
export const MOCK_COMPLETED_DATA: ReadingDetailData = {
  id: 2,
  isCompleted: true,
  title: "어린왕자",
  currentPage: 150,
  totalPage: 150,
  startDate: "2024. 01. 01",
  endDate: "2024. 01. 05",
  review: "어른이 되어 다시 읽으니 느낌이 새롭네요.",
  logs: [
    { date: "2024. 01. 01", page: 30, percent: 20, time: "40분 00초" },
    { date: "2024. 01. 03", page: 80, percent: 53, time: "55분 30초" },
    { date: "2024. 01. 05", page: 150, percent: 100, time: "60분 10초" },
  ],
};