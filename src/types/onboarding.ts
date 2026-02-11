export interface OnboardingPayload {
  nickname: string;

  level: {
    readingFrequency: number | null;
    readingDuration: number | null;
    readingBurden: number | null;
  };
  categories: number[];
  genres: number[];
}

export interface RoutineResult {
  nickname: string;
  routineType: "DAY" | "WEEK" | "MONTH";
  pages: number;
  basis: string;
}
