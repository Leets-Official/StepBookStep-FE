import React from "react";
import * as S from "@/pages/Tutorial/Tutorial.styles";
import type { TutorialStepProps } from "@/pages/Tutorial/Tutorial.types";
import TutorialStepTwo from "@/assets/icons/tutorial-step-two.svg?react";
import TutorialStepTwoIndicator from "@/assets/icons/tutorial-step-two-indicator.svg?react";

const TutorialStep2: React.FC<TutorialStepProps> = ({ onSkip }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 relative">
      <header className={S.header}>
        <TutorialStepTwoIndicator />
        <span className={S.skipText} onClick={onSkip}>
          {"건너뛰기"}
        </span>
      </header>
      <main className={S.content}>
        <h1 className={S.title}>{"도서별 목표 설정으로\n한 단계씩 쌓아가는 독서습관"}</h1>
        <div className={S.phoneImageWrapper}>
          <TutorialStepTwo />
        </div>
      </main>
      <div className={S.bottomBarSpace}></div>
    </div>
  );
};
export default TutorialStep2;
