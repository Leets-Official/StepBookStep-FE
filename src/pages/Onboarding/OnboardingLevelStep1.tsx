import { useState } from "react";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";
import { Button } from "@/components/Button/Button";
import { ChevronLeftIcon } from "@/assets/icons";
import { useLocation, useNavigate } from "react-router-dom";

import {
  pageWrapper,
  appFrame,
  header,
  backButton,
  content,
  title,
  description,
  option,
  optionActive,
  bottomAction,
} from "./OnboardingLevel.styles";

const OPTIONS = [
  "📖 최근에도 책 한 권은 끝까지 읽었어요",
  "📘 읽고 싶긴 한데, 중간에 자주 멈춰요",
  "📕 책을 펼치는 것 자체가 오랜만이에요",
  "😅 솔직히 어디서부터 시작해야 할지 모르겠어요",
];

export default function OnboardingLevelStep1() {
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname ?? "";

  return (
    <div className={pageWrapper}>
      <div className={appFrame}>
        <div className={header}>
          <button className={backButton} onClick={() => window.history.back()}>
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="px-5 py-4">
          <SegmentedProgress current={2} />
        </div>

        <div className={content}>
          <h1 className={title}>요즘 책이랑 나는 어떤 사이인가요?</h1>
          <p className={description}>
            {nickname
              ? `${nickname}님의 독서 온도에 맞는 루틴을 설정해드릴게요.`
              : "독서 온도에 맞는 루틴을 설정해드릴게요."}
          </p>

          {OPTIONS.map((text, idx) => (
            <button
              key={idx}
              className={`${option} ${selected === idx ? optionActive : ""}`}
              onClick={() => setSelected(idx)}
            >
              {text}
            </button>
          ))}
        </div>

        <div className={bottomAction}>
          <Button
            label="다음"
            fullWidth
            disabled={selected === null}
            onClick={() => navigate("/onboarding/level/step-2")}
          />
        </div>
      </div>
    </div>
  );
}
