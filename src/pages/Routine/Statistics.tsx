import { useState } from "react";
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, PieChart, Pie } from "recharts";
import { LinearProgress } from "@/components/Progress/LinearProgress";
import { useStatistics } from "@/hooks/useStatistics";
import * as S from "./Statistics.styles"; 
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import type { MonthlyDataItem, CategoryItem } from "@/api/types";

// 차트용 컬러 배열
const PIE_COLORS = [
  "var(--color-purple-500)",
  "var(--color-purple-200)",
  "var(--color-lime-500)",
  "var(--color-lime-400)",
  "var(--color-purple-300)",
  "var(--color-lime-300)",
];

// 무게 기준 이미지 (300g, 400g, 700g, 1.3kg, 1.5kg)
const getWeightImage = (kg: number) => {
  if (kg < 0.4) return { name: "컵라면", src: "/images/300g.png" };
  if (kg < 0.7) return { name: "햄버거", src: "/images/400g.png" };
  if (kg < 1.3) return { name: "소형 노트북", src: "/images/700g.png" };
  if (kg < 1.5) return { name: "전공책", src: "/images/1.3kg.png" };
  return { name: "아령", src: "/images/1.5kg.png" };
};

export default function Statistics() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  const { data: statsData, isLoading, error } = useStatistics(selectedYear);

  // 실제 데이터 구조 확인
  console.log("=== Statistics Debug ===");
  console.log("statsData:", JSON.stringify(statsData, null, 2));
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("=====================");


  // 로딩 처리
  if (isLoading) {
    return (
      <div className={S.centerBox}>
        <div className={S.loadingText}>로딩 중...</div>
      </div>
    );
  }

  // 에러 처리
  if (error) {
    return (
      <div className={S.centerBox}>
        <div className={S.loadingText}>데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  // 데이터 없음 처리
  if (!statsData) {
    return (
      <div className={S.centerBox}>
        <div className={S.loadingText}>데이터가 없습니다.</div>
      </div>
    );
  }

  // 시간 포맷팅
  const formatReadingTime = (hours: number, minutes: number) => {
    return `${hours}시간 ${minutes}분`;
  };

  // 막대 그래프 데이터 (월별)
  const chartData = statsData.monthlyGraph.monthlyData.map((item: MonthlyDataItem) => ({
  month: item.month,
  count: item.bookCount,
  isCurrentMonth: item.currentMonth,
  }));

  // 파이 차트 데이터 (선호 분야)
  const pieData = statsData.categoryPreference.categories.map((item: CategoryItem) => ({
  name: item.categoryName,
  count: item.bookCount,
  percentage: item.percentage,
  rank: item.rank,
  }));

  // 가장 많이 읽은 달 찾기
  const maxMonth = chartData.length > 0 
    ? chartData.reduce((max, curr) => (curr.count > max.count ? curr : max), chartData[0]).month 
    : 1;

  // 무게 이미지
  const weightImage = getWeightImage(statsData.bookSummary.totalWeightKg);

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <main className={S.content}>
          {/* 1. 얼마나 읽었나요? */}
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
                  {statsData.bookSummary.finishedBookCount}권 읽었어요!
                </p>
                <p className={S.weightMainText}>
                  총 {statsData.bookSummary.totalWeightKg}kg이에요.
                </p>
                <p className="text-xs font-medium text-gray-500">
                  누적 기준은 매일 00시에 반영됩니다.
                </p>
              </div>
            </div>
          </section>

          {/* 2. 독서 그래프 */}
          <section>
            <h2 className={S.sectionTitle}>독서 그래프</h2>
            <p className={S.sectionSubtitle}>
              '종료일'이 기록된 완독일 기준이에요.
            </p>
            <div className={S.chartCard}>
              <div className={S.yearSelector}>
                <ChevronLeftIcon 
                  onClick={() => setSelectedYear(y => y - 1)} 
                  className={S.yearButton} 
                />
                <span className="text-lg font-semibold">{selectedYear}</span>
                <ChevronRightIcon 
                  onClick={() => setSelectedYear(y => y + 1)} 
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
                    tick={{ fontSize: 12, fill: "#9CA3AF" }} 
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.month === maxMonth ? "var(--color-purple-500)" : "var(--color-lime-500)"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* 3. 누적 독서 시간 */}
          <section>
            <h2 className={S.sectionTitle}>누적 독서 시간</h2>
            <div className={S.statsCard}>
              <p className={S.bigValueText}>
                {formatReadingTime(
                  statsData.cumulativeTime.hours, 
                  statsData.cumulativeTime.minutes
                )}
              </p>
              <p className="text-sm font-['pretendard'] font-regular text-gray-500">
                {Math.floor(statsData.cumulativeTime.totalMinutes / 1440)}일 동안 쉬지 않고 읽었어요.
              </p>
            </div>
          </section>

          {/* 4. 누적 목표 달성 기록 */}
          <section>
            <h2 className={S.sectionTitle}>누적 목표 달성 기록</h2>
            <div className={S.statsCard}>
              <p className={S.bigValueText}>
                {statsData.goalAchievement.achievementRate}%
              </p>
              <div className="mb-2 w-49.75 h-1.75 item-justify-center mx-auto">
                <LinearProgress 
                  total={100} 
                  current={statsData.goalAchievement.achievementRate} 
                />
              </div>
              <p className="text-xs text-gray-400">
                나의 목표 달성 최고 기록은{" "}
                <span className="font-semibold">
                  {statsData.goalAchievement.maxAchievementRate}%
                </span>{" "}
                에요!
              </p>
            </div>
          </section>

          {/* 5. 나의 선호 분야 */}
          <section>
            <h2 className={S.sectionTitle}>나의 선호 분야</h2>
            <div className={S.genreCard}>
              <div className={S.chartLayout}>
                <div className={S.chartWrapper}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={pieData} 
                        dataKey="count" 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={90}
                      >
                        {pieData.map((_entry, index) => (
                          <Cell 
                            key={index} 
                            fill={PIE_COLORS[index % PIE_COLORS.length]} 
                          />
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
                    <div 
                      className={S.genreDot} 
                      style={{ backgroundColor: PIE_COLORS[index] }} 
                    />
                    <span className="text-sm font-semibold text-black w-4">
                      {genre.rank || index + 1}
                    </span>
                    <span className="text-sm text-gray-800 flex-1">
                      {genre.name}
                    </span>
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
    </div>
  );
}