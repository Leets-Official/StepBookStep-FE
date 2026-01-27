import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@/assets/icons";
import { Button } from "@/components/Button/Button";
import type { RoutineResult } from "@/types/onboarding";

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
    title: (pages: number) => ({
      strong: `하루에 ${pages}쪽`,
      weak: "으로 시작해요!",
    }),
    image: "/images/routine-day.png",
  },
  WEEK: {
    title: (pages: number) => ({
      strong: `1주일에 ${pages}쪽`,
      weak: "으로 시작해요!",
    }),
    image: "/images/routine-week.png",
  },
  MONTH: {
    title: (pages: number) => ({
      strong: `1개월에 ${pages}쪽`,
      weak: "으로 시작해요!",
    }),
    image: "/images/routine-month.png",
  },
} as const;

export default function RoutineResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: RoutineResult };

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
              <span className={cardTitleStrong}>{ui.title(state.pages).strong}</span>
              <span className={cardTitleWeak}>{ui.title(state.pages).weak}</span>
            </div>

            <div className={illustrationWrapper}>
              <img src={ui.image} alt="독서 루틴 일러스트" className={illustration} />
            </div>
          </div>
        </div>

        <div className={bottomAction}>
          <Button label="시작하기" fullWidth onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}
