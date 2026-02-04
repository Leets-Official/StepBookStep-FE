import { useState } from "react";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import { BookIcon, ClockIcon, TrophyIcon, LikeIcon, ChevronRightIcon } from "@/assets/icons";

import { BOOKS_MOCK } from "@/mocks/books.mock";
import HorizontalBookSliderWeb from "./HorizontalBookSlider.web";
import HorizontalBookSliderApp from "./HorizontalBookSlider.app";
import * as S from "./Home.styles";
import { cn } from "@/utils/cn";
import SkeletonHome from "@/pages/Home/SkeletonHome";

const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

type RecommendFilter = "short" | "levelup" | "bestseller";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "search" | "routine" | "mypage">("home");

  const [selectedRecommend, setSelectedRecommend] = useState<RecommendFilter>("short");
  const isLoading = false;
  const nickname = "하늘";
  const category = "예술/대중문화";

  const Slider = isTouch ? HorizontalBookSliderApp : HorizontalBookSliderWeb;

  if (isLoading) {
    return <SkeletonHome />;
  }

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="logo" onSettingClick={() => {}} />

        <main className={S.content}>
          {/* 헤더 */}
          <section className={S.headerSection}>
            <p className={S.headerSubtitle}>{nickname}님을 위한</p>
            <h2 className={S.headerTitle}>
              <span className={S.headerHighlight}>{category}</span>
              <span> 도서예요</span>
            </h2>
          </section>

          <Slider books={BOOKS_MOCK} />

          <section className={S.recommendSection}>
            <h3 className={S.recommendTitle}>
              오늘의 <span className={S.recommendHighlight}>추천도서</span>예요
            </h3>

            <div className={S.recommendButtons}>
              <button
                className={cn(S.chip, selectedRecommend === "short" && S.chipActive)}
                onClick={() => setSelectedRecommend("short")}
              >
                가벼운 책
              </button>

              <button
                className={cn(S.chip, selectedRecommend === "levelup" && S.chipActive)}
                onClick={() => setSelectedRecommend("levelup")}
              >
                레벨업 도전!
              </button>

              <button
                className={cn(S.chip, selectedRecommend === "bestseller" && S.chipActive)}
                onClick={() => setSelectedRecommend("bestseller")}
              >
                베스트셀러
              </button>
            </div>
          </section>

          <Slider books={BOOKS_MOCK} />

          {/* 통계 */}
          <div className={S.statsHeader}>
            <h3 className={S.statsTitle}>얼마나 독서했나요?</h3>
            <span className={S.statsArrow}>
              <ChevronRightIcon />
            </span>
          </div>

          <section className={S.statsCard}>
            <div className={S.statsSection}>
              <div className={S.statsGrid}>
                <Stat icon={BookIcon} label="누적 독서량" value="8권" />
                <Stat icon={ClockIcon} label="누적 독서 시간" value="92시간" />
              </div>
            </div>

            <div className={S.divider} />

            <div className={S.statsSection}>
              <div className={S.statsGrid}>
                <Stat icon={TrophyIcon} label="목표 달성률" value="91%" />
                <Stat icon={LikeIcon} label="가장 좋아하는 분야" value="소설" />
              </div>
            </div>
          </section>
        </main>

        <BottomBar activeTab={activeTab} onTabSelect={setActiveTab} />
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}) {
  return (
    <div className={S.statItem}>
      <div className={S.statIconBox}>
        <Icon className={S.statIcon} />
      </div>
      <div>
        <p className={S.statLabel}>{label}</p>
        <p className={S.statValue}>{value}</p>
      </div>
    </div>
  );
}
