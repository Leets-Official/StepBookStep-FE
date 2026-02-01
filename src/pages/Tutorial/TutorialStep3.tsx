import React from "react";
import * as S from "@/pages/Tutorial/Tutorial.styles";
import type { TutorialStepProps } from "@/pages/Tutorial/Tutorial.types";
import TutorialStepThree from "@/assets/icons/tutorial-step-three.svg?react";
import TutorialStepThreeIndicator from "@/assets/icons/tutorial-step-three-indicator.svg?react";

const TutorialStep3: React.FC<TutorialStepProps> = ({ onSkip }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 relative">
      <header className={S.header}>
        <TutorialStepThreeIndicator />
        <span className={S.skipText} onClick={onSkip}>
          {"건너뛰기"}
        </span>
      </header>
      <main className={S.content}>
        <h1 className={S.title}>{"한눈에 파악하는\n나의 성장 스토리"}</h1>
        <div className={S.phoneImageWrapper}>
          <TutorialStepThree />
        </div>
      </main>
      <section className={S.gradientFooter}>
        <button className={S.mainButton} onClick={onSkip}>
          <span className={S.buttonText}>{"책 고르러 가기"}</span>
        </button>
      </section>
      <div className={S.bottomBarSpace}></div>
    </div>
  );
};
export default TutorialStep3;
