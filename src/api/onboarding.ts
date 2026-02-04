import axios from "axios";

const BASE_URL = import.meta.env.VITE_STEPBOOKSTEP_BASE_URL;

export interface OnboardingRequest {
  nickname: string;
  levelAnswers: {
    readingFrequency: string;
    readingDuration: string;
    difficultyPreference: string;
  };
  categoryIds: number[];
  genreIds: number[];
}

export interface OnboardingResponse {
  level: number;
  routineTokens: {
    period: string;
    amount: string;
    basis: string;
  };
  onboarded: true;
}

export const postOnboarding = async (payload: OnboardingRequest): Promise<OnboardingResponse> => {
  const res = await axios.post(`${BASE_URL}/users/onboarding`, payload, {
    withCredentials: true,
  });

  return res.data;
};
