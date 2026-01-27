export type ReadingStatus = "before" | "reading" | "completed";

export interface BookInfo {
  id: number;
  level: number;
  title: string;
  author: string;
  publisher: string;
  publishYear: number;
  totalPage: number;
  price: number;
  storeLink: string;
  tags: string[];
  description?: string;
}

export interface ReadingGoal {
  dailyMinutes: number;
  startDate: string;
}

export interface ReadingLog {
  date: string;
  page: number;
  percent: number;
  time: string;
}

export interface ReadingProgress {
  currentPage: number;
  percent: number;
}

export interface CompletedReview {
  rating: number;
  comment: string;
}

export const BOOK_DETAIL_MOCK: BookInfo = {
  id: 1,
  level: 1,
  title: "책 제목 어쩌구저쩌구: 어쩌구저쩌구생각보다 제목이긴책이많다",
  author: "지은이, 옮긴이",
  publisher: "출판사",
  publishYear: 2000,
  totalPage: 132,
  price: 13000,
  storeLink: "알라딘에서 보기",
  tags: ["태그 키워드", "태그 키워드", "태그 키워드"],
};

export const READING_STATE_MOCK = {
  reading: {
    goal: {
      dailyMinutes: 30,
      startDate: "2000. 08. 04",
    } as ReadingGoal,
    progress: {
      currentPage: 1,
      percent: 1,
    } as ReadingProgress,
    logs: [
      {
        date: "2000. 08. 04",
        page: 1,
        percent: 1,
        time: "23분 30초",
      },
    ] as ReadingLog[],
  },

  completed: {
    goal: {
      dailyMinutes: 30,
      startDate: "2000. 08. 04",
    } as ReadingGoal,
    review: {
      rating: 5,
      comment: "재밌고 좋았어요",
    } as CompletedReview,
    logs: [
      {
        date: "2000. 08. 04",
        page: 1,
        percent: 1,
        time: "23분 30초",
      },
      {
        date: "2000. 08. 05",
        page: 132,
        percent: 100,
        time: "1시간 10분",
      },
    ] as ReadingLog[],
    endDate: "2026. 01. 13",
  },
};
