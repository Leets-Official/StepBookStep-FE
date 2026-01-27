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
  description: string;
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
  description:
    "작품마다 치밀한 취재와 정교한 구성을 바탕으로 한 개성적인 캐릭터와 강렬하고도 서늘한 서사로 평단과 독자의 주목을 고루 받으며 새로운 세대의 리얼리즘을 열어가고 있다 평가받는 작가 성해나가 두번째 소설집 『혼모노』를 선보인다." +
    "첫 소설집 『빛을 걷으면 빛』(문학동네 2022)에서 타인을 이해하려는 시도를 부드럽고 따스한 시선으로 담아내고, 첫 장편소설 『두고 온 여름』(창비 2023)에서 오해와 결별로 얼룩진 과거에 애틋한 인사를 건네고자 했던 그가 『혼모노』에 이르러 더욱 예리해진 문제의식과 흡인력 넘치는 서사를 통해 지역, 정치, 세대 등 우리를 가르는 다양한 경계를 들여다보며 세태의 풍경을 선명하게 묘파해낸다.  특히 이번 소설집에는 지난해 끊임없이 호명되며 문단을 휩쓸었다 해도 과언이 아닐 표제작 「혼모노」를 비롯해 작가에게 2년 연속 젊은작가상을 선사해준 「길티 클럽: 호랑이 만지기」, 이 계절의 소설과 올해의 문제소설에 선정된 「스무드」 등이 수록되어 더욱 눈길을 끈다. “작가의 ‘신명’이라 불”릴(추천사, 이기호) 만큼 “질투 나는 재능”(추천사, 박정민)으로 빛나는 『혼모노』, 그토록 기다려왔던 한국문학의 미래가 바로 지금 우리 앞에 도착해 있다.",
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
