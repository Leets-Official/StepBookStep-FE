import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@/assets/icons";
import { Button } from "@/components/Button/Button";
import type { RoutineResult } from "@/types/onboarding";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { postOnboarding } from "@/api/onboarding";
import { useUserStore } from "@/stores/useUserStore";
import {
  READING_FREQUENCY_MAP,
  READING_DURATION_MAP,
  READING_BURDEN_MAP,
} from "@/utils/onboardingMapper";

import {
  pageWrapper,
  appFrame,
  header,
  backButton,
  content,
  title,
  subtitle,
  card,
  cardTitle,
  illustrationWrapper,
  illustration,
  bottomAction,
  cardTitleStrong,
  cardTitleWeak,
} from "./RoutineResultPage.styles";

const ROUTINE_UI = {
  DAY: {
    title: (pages: number, basis?: string) => ({
      strong: `하루에 ${pages}쪽 ${basis ? `${basis}` : ""}`,
      weak: "으로 시작해요!",
    }),
    image: "/images/routine-day.png",
  },
  WEEK: {
    title: (pages: number, basis?: string) => ({
      strong: `1주일에 ${pages}쪽 ${basis ? `${basis}` : ""}`,
      weak: "으로 시작해요!",
    }),
    image: "/images/routine-week.png",
  },
  MONTH: {
    title: (pages: number, basis?: string) => ({
      strong: `1개월에 ${pages}쪽 ${basis ? `${basis}` : ""}`,
      weak: "으로 시작해요!",
    }),
    image: "/images/routine-month.png",
  },
} as const;

const PERIOD_TO_ROUTINE_TYPE: Record<string, RoutineResult["routineType"]> = {
  하루: "DAY",
  일주일: "WEEK",
  한달: "MONTH",
};

export default function RoutineResultPage() {
  const navigate = useNavigate();
  const { payload } = useOnboardingStore();
  const { setUserInfo } = useUserStore();

  const [state, setState] = useState<RoutineResult | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const { readingFrequency, readingDuration, readingBurden } = payload.level;

      if (readingFrequency === null || readingDuration === null || readingBurden === null) {
        throw new Error("온보딩 레벨 답변이 누락되었습니다.");
      }

      try {
        const res = await postOnboarding({
          nickname: payload.nickname,
          levelAnswers: {
            readingFrequency: READING_FREQUENCY_MAP[readingFrequency],
            readingDuration: READING_DURATION_MAP[readingDuration],
            difficultyPreference: READING_BURDEN_MAP[readingBurden],
          },
          categoryIds: [],
          genreIds: [],
        });

        setUserInfo(payload.nickname, res.level);

        const routineType = PERIOD_TO_ROUTINE_TYPE[res.routineTokens.period];

        const pages = Number(res.routineTokens.amount.replace(/[^0-9]/g, ""));

        setState({
          nickname: payload.nickname,
          routineType,
          pages,
          basis: res.routineTokens.basis,
        });
      } catch (e) {
        console.error(e);
      }
    };

    fetchResult();
  }, [payload]);

  if (!state) return null;

  const ui = ROUTINE_UI[state.routineType];

  return (
    <div className={pageWrapper}>
      <div className={appFrame}>
        <div className={header}>
          <button className={backButton} onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </button>
        </div>

        <div className={content}>
          <h1 className={title}>{state.nickname}님, 반가워요!</h1>
          <p className={subtitle}>
            {state.nickname}님 맞춤 독서 루틴이에요.
            <br />
            나중에 마이페이지에서 자유롭게 변경할 수 있어요.
          </p>

          <div className={card}>
            <div className={cardTitle}>
              <span className={cardTitleStrong}>{ui.title(state.pages, state.basis).strong}</span>
            </div>
            <div className={cardTitle}>
              <span className={cardTitleWeak}>{ui.title(state.pages).weak}</span>
            </div>

            <div className={illustrationWrapper}>
              <img src={ui.image} alt="독서 루틴 일러스트" className={illustration} />
            </div>
          </div>
        </div>

        <div className={bottomAction}>
          <Button
            label="시작하기"
            fullWidth
            onClick={() => {
              navigate("/home");
            }}
          />
        </div>
      </div>
    </div>
  );
}
