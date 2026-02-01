import React from "react";
import * as S from "@/pages/Tutorial/Tutorial.styles";
import type { TutorialStepProps } from "@/pages/Tutorial/Tutorial.types";
import TutorialStepOne from "@/assets/icons/tutorial-step-one.svg?react";
import TutorialStepOneIndicator from "@/assets/icons/tutorial-step-one-indicator.svg?react";

const TutorialStep1: React.FC<TutorialStepProps> = ({ onSkip }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 relative">
      <header className={S.header}>
        <TutorialStepOneIndicator />
        <span className={S.skipText} onClick={onSkip}>
          {"건너뛰기"}
        </span>
      </header>
      <main className={S.content}>
        <h1 className={S.title}>{"쉬운 책으로 시작하는\n나의 독서 첫 걸음"}</h1>
        <div className={S.phoneImageWrapper}>
          <TutorialStepOne />
        </div>
      </main>
      <div className={S.bottomBarSpace}></div>
    </div>
  );
};
export default TutorialStep1;
