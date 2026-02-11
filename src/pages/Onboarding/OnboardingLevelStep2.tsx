import { useState } from "react";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";
import { Button } from "@/components/Button/Button";
import { ChevronLeftIcon } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

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
import { useOnboardingStore } from "@/stores/onboardingStore.ts";

const OPTIONS = [
  "☕ 짧게 끊어 읽는 게 좋아요",
  "📄 한 챕터 정도는 괜찮아요",
  "📚 한 번 잡으면 꽤 오래 읽어요",
  "🔄 그때그때 달라요",
];

export default function OnboardingLevelStep2() {
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();
  const { setReadingDuration } = useOnboardingStore();

  return (
    <div className={pageWrapper}>
      <div className={appFrame}>
        <div className={header}>
          <button className={backButton} onClick={() => window.history.back()}>
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="px-5 py-4">
          <SegmentedProgress current={3} />
        </div>

        <div className={content}>
          <h1 className={title}>한 번 읽기 시작하면 이 정도가 좋아요.</h1>
          <p className={description}>무리하지 않고 즐겁게 읽을 수 있는 분량을 알려주세요.</p>

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
            onClick={() => {
              setReadingDuration(selected!);
              navigate("/onboarding/level/step-3");
            }}
          />
        </div>
      </div>
    </div>
  );
}
