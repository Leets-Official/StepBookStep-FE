import apiClient from "@/api/clients";

export interface OnboardingRequest {
  nickname: string;
  levelAnswers: {
    readingFrequency: string; // DAILY / WEEKLY
    readingDuration: string; // SHORT / MEDIUM / LONG
    difficultyPreference: string; // EASY / HARD
  };
  categoryIds: number[];
  genreIds: number[];
}

export interface OnboardingResponse {
  isOnboarded: boolean;
  level: number;
  routineTokens: {
    period: string; // 하루 / 일주일
    amount: string; // 10분 / 20쪽 / 20분
    basis: string; // 얇은 책 / 레벨 별 추천도서
  };
}

export const postOnboarding = async (payload: OnboardingRequest): Promise<OnboardingResponse> => {
  const res = await apiClient.post<OnboardingResponse>("/users/onboarding", payload);

  return res.data;
};
