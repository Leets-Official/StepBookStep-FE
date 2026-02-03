import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import TutorialStep1 from "@/pages/Tutorial/TutorialStep1";
import TutorialStep2 from "@/pages/Tutorial/TutorialStep2";
import TutorialStep3 from "@/pages/Tutorial/TutorialStep3";
import * as S from "@/pages/Tutorial/Tutorial.styles";

const Tutorial: React.FC = () => {
  const navigate = useNavigate();
  const handleSkip = () => {
    // 1. 다음에 앱 켰을 때 안 뜨도록 기록 남기
    localStorage.setItem("hasSeenTutorial", "true"); 
    
    // 2. 로그인 페이지로 이동 (우리가 정한 흐름!)
    navigate("/login", { replace: true }); 
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <Swiper spaceBetween={0} slidesPerView={1} className="w-full h-full">
          <SwiperSlide>
            <TutorialStep1 onSkip={handleSkip} />
          </SwiperSlide>
          <SwiperSlide>
            <TutorialStep2 onSkip={handleSkip} />
          </SwiperSlide>
          <SwiperSlide>
            <TutorialStep3 onSkip={handleSkip} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Tutorial;
