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

const OPTIONS = [
  "😵 두껍거나 어려워 보이는 책",
  "😶 무슨 말인지 잘 안 들어오는 문장",
  "⏰ 끝까지 읽어야 할 것 같은 압박",
  "🙂 딱히 부담은 없어요",
];

export default function OnboardingLevelStep3() {
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className={pageWrapper}>
      <div className={appFrame}>
        <div className={header}>
          <button className={backButton} onClick={() => window.history.back()}>
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="px-5 py-4">
          <SegmentedProgress current={4} />
        </div>

        <div className={content}>
          <h1 className={title}>책을 고를 때 무엇이 가장 부담되나요?</h1>
          <p className={description}>고민되는 부분을 해결할 수 있는 책을 추천해드릴게요.</p>

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
            onClick={() => navigate("/onboarding/genre")}
          />
        </div>
      </div>
    </div>
  );
}
