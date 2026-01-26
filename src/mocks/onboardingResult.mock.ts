import type { OnboardingPayload, RoutineResult } from "@/types/onboarding";

/**
 * 나중에 이 파일 통째로 삭제하고
 * POST /api/onboarding 으로 교체하면 됨
 */
export function requestOnboardingResult(payload: OnboardingPayload): RoutineResult {
  const { nickname, level } = payload;

  if (level.readingFrequency === 0) {
    return {
      routineType: "DAY",
      pages: 10,
      nickname,
    };
  }

  if (level.readingFrequency === 1) {
    return {
      routineType: "WEEK",
      pages: 20,
      nickname,
    };
  }

  return {
    routineType: "MONTH",
    pages: 40,
    nickname,
  };
}
