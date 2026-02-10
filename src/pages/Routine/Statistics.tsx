import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, PieChart, Pie } from "recharts";
import { LinearProgress } from "@/components/Progress/LinearProgress";
import { useStatistics } from "@/hooks/useStatistics";
import * as S from "./Statistics.styles";
import { ChevronLeftIcon, ChevronRightIcon, GlassesOnBooksGif } from "@/assets/icons";
import type { MonthlyDataItem, CategoryItem } from "@/api/types";
import EmptyView from "@/components/EmptyView/EmptyView";

const GENRE_COLORS: Record<string, string> = {
  "중국소설": "#D2D5FE",
  "일본소설": "#A9AAFB",
  "영미소설": "#787AEE",
  "한국소설": "#4931D4",
  
  "프랑스소설": "#E6C2FF",
  "역사소설": "#E8A4FF",
  "희곡": "#E66EE4",
  "로맨스": "#D300AC",
  
  "과학소설(SF)": "#FFD8FF",
  "판타지/환상문학": "#FFAECE",
  "추리/미스터리": "#FF84B4",
  "독일소설": "#FF277B",
  
  "라이트노벨": "#DFFBBE",
  "액션/스릴러": "#BBEF80",
  "무협소설": "#91D654",
  "호러/공포소설": "#67B22A",
};

// 색상 조회 헬퍼 함수 (매핑되지 않은 장르는 회색 처리)
const getGenreColor = (genreName: string) => {
  return GENRE_COLORS[genreName] || "#E8E9ED";
};

const getWeightImage = (kg: number) => {
  if (kg < 0.4) return { name: "컵라면", src: "/images/300g.png" };
  if (0.4 <= kg && kg < 0.7) return { name: "햄버거", src: "/images/400g.png" };
  if (0.7 <= kg && kg < 1.3) return { name: "소형 노트북", src: "/images/700g.png" };
  if (1.3 <= kg && kg < 1.5) return { name: "전공책", src: "/images/1.3kg.png" };
  return { name: "아령", src: "/images/1.5kg.png" };
};

export default function Statistics() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: statsData, isLoading, error } = useStatistics(selectedYear);

  if (isLoading) {
    return (
      <div className={S.centerBox}>
        <div className={S.loadingText}>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={S.centerBox}>
        <div className={S.loadingText}>데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  if (!statsData || statsData.bookSummary.finishedBookCount === 0) {
    return (
      <div className={S.centerBox}>
        <EmptyView
          icon={GlassesOnBooksGif}
          title="아직 도서가 없어요."
          description="좋아하실 도서를 고르러 가볼까요?(멘트?)"
          actionButton={{
            label: "독서 시작하기",
            onClick: () => navigate("/search"), 
          }}
          className="pt-10" 
        />
      </div>
    );
  }

  const formatReadingTime = (hours: number, minutes: number) => {
    return `${hours}시간 ${minutes}분`;
  };

  const chartData = statsData.monthlyGraph.monthlyData.map((item: MonthlyDataItem) => ({
    month: item.month,
    count: item.bookCount,
    isCurrentMonth: item.currentMonth,
  }));

  const pieData = statsData.categoryPreference.categories.map((item: CategoryItem) => ({
    name: item.categoryName,
    count: item.bookCount,
    percentage: item.percentage,
    rank: item.rank,
  }));

  const maxMonth =
    chartData.length > 0
      ? chartData.reduce((max, curr) => (curr.count > max.count ? curr : max), chartData[0]).month
      : 1;

  const weightImage = getWeightImage(statsData.bookSummary.totalWeightKg);

  return (
    <div className="flex flex-col gap-8 pb-8 w-full">
      <main className={S.content}>
        <section>
          <h2 className={S.sectionTitle}>얼마나 읽었나요?</h2>
          <div className={S.weightCard}>
            <div className={S.weightGraphicBox}>
              <div className="flex flex-col items-center">
                <img
                  src={weightImage.src}
                  alt={weightImage.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className={S.weightInfo}>
              <p className={S.weightMainText}>
                <span className="font-bold">{statsData.bookSummary.finishedBookCount}</span>
                권 읽었어요!
              </p>
              <p className={S.weightMainText}>총 
                <span className="font-bold">{statsData.bookSummary.totalWeightKg}kg</span>
                이에요.</p>
              <p className="text-xs font-medium text-gray-500">
                독서기록을 추가하면 업데이트돼요
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className={S.sectionTitle}>독서 그래프</h2>
          <p className={S.sectionSubtitle}>'종료일'이 기록된 완독일 기준이에요.</p>
          <div className={S.chartCard}>
            <div className={S.yearSelector}>
              <ChevronLeftIcon
                onClick={() => setSelectedYear((y) => y - 1)}
                className={S.yearButton}
              />
              <span className="text-lg font-semibold">{selectedYear}</span>
              <ChevronRightIcon
                onClick={() => setSelectedYear((y) => y + 1)}
                className={S.yearButton}
              />
            </div>
            <div className={S.chartContainer}>
              <ResponsiveContainer width="100%" height="100%" aspect={2}>
                <BarChart data={chartData} barSize={11}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#7E819A" }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.month === maxMonth
                            ? "var(--color-purple-500)"
                            : "var(--color-lime-500)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className={S.sectionTitle}>누적 독서 시간</h2>
          <div className={S.statsCard}>
            <p className={S.bigValueText}>
              {formatReadingTime(
                Math.floor(statsData.cumulativeTime.totalMinutes / 60), // 시간 계산
                statsData.cumulativeTime.totalMinutes % 60, // 남은 분 계산
              )}
            </p>
            <p className="text-sm font-['pretendard'] font-regular text-gray-500">
              <span className="text-purple-400">{Math.floor(statsData.cumulativeTime.totalMinutes / 1440)}</span>일 동안 쉬지 않고 읽었어요.
            </p>
          </div>
        </section>

        <section>
          <h2 className={S.sectionTitle}>누적 목표 달성 기록</h2>
          <div className={S.statsCard}>
            <p className={S.bigValueText}>
              {statsData.goalAchievement?.achievementRate || 0}
              <span className="text-lg font-normal ml-1">%</span>
            </p>
            <div className="mb-2 w-49.75 h-1.75 item-justify-center mx-auto">
              <LinearProgress
                total={100}
                current={statsData.goalAchievement?.achievementRate || 0}
              />
            </div>
            <p className="text-xs text-gray-400">
              나의 목표 달성 최고 기록은{" "}
              <span className="font-semibold">{statsData.goalAchievement.maxAchievementRate}%</span>{" "}
              에요!
            </p>
          </div>
        </section>

        <section>
          <h2 className={S.sectionTitle}>나의 선호 분야</h2>
          <div className={S.preferenceContainer}>
            <div className={S.chartLayout}>
              <div className={S.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="count"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      startAngle={90}
                      endAngle={450}
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={getGenreColor(entry.name)} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className={S.chartCenterText}>
                  <span className="text-lg font-['pretendard'] font-semibold text-gray-900">
                    전체
                  </span>
                  <span className="text-lg font-['pretendard'] font-semibold text-gray-900">
                    {statsData.categoryPreference.totalBookCount}개 분야
                  </span>
                </div>
              </div>
            </div>
            <div className={S.genreList}>
              <p className="text-xs text-gray-500 mb-2">선호 분야 TOP3</p>
              {pieData.slice(0, 3).map((genre, index) => (
                <div key={index} className={S.genreItem}>
                  <div className={S.genreDot} style={{ backgroundColor: getGenreColor(genre.name) }} />
                  <span className="text-sm font-semibold text-black w-4">
                    {genre.rank || index + 1}
                  </span>
                  <span className="text-sm text-gray-800 flex-1">{genre.name}</span>
                  <span className="text-sm text-gray-500">
                    {genre.count}권 {genre.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}