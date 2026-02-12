import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import { BookIcon, ClockIcon, TrophyIcon, LikeIcon, ChevronRightIcon } from "@/assets/icons";

import HorizontalBookSliderWeb from "./HorizontalBookSlider.web";
import HorizontalBookSliderApp from "./HorizontalBookSlider.app";
import SkeletonHome from "./SkeletonHome";

import { getHome } from "@/api/home";
import type { HomeResponse, HomeBook } from "@/types/home";
import type { SliderBook } from "@/types/sliderBook";
import { useUserStore } from "@/stores/useUserStore";

import * as S from "./Home.styles";
import { cn } from "@/utils/cn";

const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

type RecommendFilter = "short" | "levelup" | "bestseller";

const toSliderBooks = (books: HomeBook[]): SliderBook[] =>
  books.map((b) => ({
    bookId: b.bookId,
    title: b.title,
    coverUrl: b.coverImage,
  }));

export default function Home() {
  const navigate = useNavigate();
  const Slider = isTouch ? HorizontalBookSliderApp : HorizontalBookSliderWeb;

  const { nickname } = useUserStore();

  const [activeTab, setActiveTab] = useState<"home" | "search" | "routine" | "mypage">("home");
  const [selectedRecommend, setSelectedRecommend] = useState<RecommendFilter>("short");
  const [data, setData] = useState<HomeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    getHome()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !data) {
    return <SkeletonHome />;
  }

  const { readingStatistics, genreBooks, recommendations } = data;

  const recommendMap: Record<RecommendFilter, HomeBook[]> = {
    short: recommendations.lightReads,
    levelup: recommendations.levelUp,
    bestseller: recommendations.bestseller,
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar
          mode="logo"
          onSettingClick={() => {
            navigate("/setting", { state: { from: "/home" } });
          }}
        />

        <main className={S.content}>
          <section className={S.headerSection}>
            <p className={S.headerSubtitle}>{nickname}님을 위한</p>
            <h2 className={S.headerTitle}>
              <span className={S.headerHighlight}>{genreBooks.name}</span>
              <span> 도서예요</span>
            </h2>
          </section>

          <Slider books={toSliderBooks(genreBooks.books)} />

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

          <Slider books={toSliderBooks(recommendMap[selectedRecommend])} />

          <button
            className={S.statsHeader}
            onClick={() =>
              navigate("/routine/booklist", {
                state: { targetTab: "statistics" },
              })
            }
          >
            <h3 className={S.statsTitle}>얼마나 독서했나요?</h3>
            <ChevronRightIcon />
          </button>

          <section className={S.statsCard}>
            <div className={S.statsSection}>
              <div className={S.statsGrid}>
                <Stat
                  icon={BookIcon}
                  label="누적 독서량"
                  value={`${readingStatistics.finishedBookCount}권`}
                />
                <Stat
                  icon={ClockIcon}
                  label="누적 독서 시간"
                  value={`${readingStatistics.cumulativeHours}시간`}
                />
              </div>
            </div>

            <div className={S.statsSection}>
              <div className={S.statsGrid}>
                <Stat
                  icon={TrophyIcon}
                  label="목표 달성률"
                  value={`${readingStatistics.achievementRate}%`}
                />
                <Stat
                  icon={LikeIcon}
                  label="가장 좋아하는 분야"
                  value={readingStatistics.favoriteCategory}
                />
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
