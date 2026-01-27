export type RoutineType = "DAY" | "WEEK" | "MONTH";

export interface OnboardingPayload {
  nickname: string;

  level: {
    readingFrequency: number | null;
    readingDuration: number | null;
    readingBurden: number | null;
  };

  genres: string[];
}

export interface RoutineResult {
  routineType: RoutineType;
  pages: number;
  nickname: string;
}
