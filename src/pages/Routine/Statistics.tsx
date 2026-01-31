import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, PieChart, Pie } from "recharts";
import { LinearProgress } from "@/components/Progress/LinearProgress";
import * as S from "./Statistics.styles"; 
import type { StatisticsData, ChartMonthData, PieChartData, ApiError } from "./Statistics.types";
import { MOCK_STATISTICS_DATA } from "@/mocks/statistics.mock";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";

// 차트용 컬러 배열 (token.css 변수 활용)
const PIE_COLORS = [
  "var(--color-purple-500)",
  "var(--color-purple-200)",
  "var(--color-lime-500)",
  "var(--color-lime-400)",
  "var(--color-purple-300)",
  "var(--color-lime-300)",
];

export default function Statistics() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [statsData, setStatsData] = useState<StatisticsData | null>(MOCK_STATISTICS_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<ApiError[] | null>(null);

  useEffect(() => {
    // API 연동 시뮬레이션
    const loadData = () => {
      setIsLoading(true);
      // Mock 데이터 로딩 (실제론 여기서 response.success를 체크)
      if (MOCK_STATISTICS_DATA) {
        setStatsData(MOCK_STATISTICS_DATA);
        setError(null);
      } else {
        setError([{ reason: "데이터가 존재하지 않습니다." }]);
      }
      setIsLoading(false);
    };

    loadData();
  }, [selectedYear]);

  // 로딩 처리 뒤에 에러 UI 렌더링 추가
if (isLoading) return <div className={S.centerBox}><div className={S.loadingText}>로딩 중...</div></div>;

// 에러가 있을 경우 에러 메시지 표시
if (error) {
  return (
    <div className={S.centerBox}>
      <div className={S.loadingText}>{error[0].reason}</div>
    </div>
  );
}

if (!statsData) return <div className={S.centerBox}><div className={S.loadingText}>데이터가 없습니다.</div></div>;

  const formatReadingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const chartData: ChartMonthData[] = statsData?.yearlyReadingByMonth.map(item => ({
    month: item.month,
    count: item.completedBooks,
  })) || [];

  const pieData: PieChartData[] = statsData?.genreStatistics.map(item => ({
    name: item.genreName,
    count: item.bookCount,
    percentage: item.percentage,
  })) || [];

  const maxMonth = chartData.length > 0 
    ? chartData.reduce((max, curr) => (curr.count > max.count ? curr : max), chartData[0]).month 
    : 1;

  if (isLoading) return <div className={S.centerBox}><div className={S.loadingText}>로딩 중...</div></div>;
  if (!statsData) return <div className={S.centerBox}><div className={S.loadingText}>데이터가 없습니다.</div></div>;

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>

        <main className={S.content}>
          {/* 1. 얼마나 읽었나요? */}
          <section>
            <h2 className={S.sectionTitle}>얼마나 읽었나요?</h2>
            <div className={S.weightCard}>
              <div className={S.weightGraphicBox}>
                <div>
                  <div className="text-xs text-gray-400 mb-1">그래픽</div>
                  <div className="text-sm font-semibold text-gray-600">{statsData.totalWeight}kg</div>
                </div>
              </div>
              <div className={S.weightInfo}>
                <p className={S.weightMainText}>{statsData.totalBooksRead}권 읽었어요!</p>
                <p className={S.weightMainText}>총 {statsData.totalWeight}kg이에요.</p>
                <p className="text-xs font-medium text-gray-500">누적 기준은 매일 00시에 반영됩니다.</p>
              </div>
            </div>
          </section>

          {/* 2. 독서 그래프 */}
          <section>
            <h2 className={S.sectionTitle}>독서 그래프</h2>
            <p className={S.sectionSubtitle}>'종료일'이 기록된 완독일 기준이에요.</p>
            <div className={S.chartCard}>
              <div className={S.yearSelector}>
                <ChevronLeftIcon onClick={() => setSelectedYear(y => y - 1)} className={S.yearButton} />
                <span className="text-lg font-semibold">{selectedYear}</span>
                <ChevronRightIcon onClick={() => setSelectedYear(y => y + 1)} className={S.yearButton}/>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={chartData} barSize={11}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={index} 
                        fill={entry.month === maxMonth ? "var(--color-purple-500)" : "var(--color-lime-500)"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 3. 누적 독서 시간 */}
          <section>
            <h2 className={S.sectionTitle}>누적 독서 시간</h2>
            <div className={S.statsCard}>
              <p className={S.bigValueText}>{formatReadingTime(statsData.totalReadingMinutes)}</p>
              <p className="text-sm font-['pretendard'] font-regular text-gray-500">{statsData.readingMonthsCount}일 동안 쉬지 않고 읽었어요.</p>
            </div>
          </section>

          {/* 4. 누적 목표 달성 기록 */}
          <section>
            <h2 className={S.sectionTitle}>누적 목표 달성 기록</h2>
            <div className={S.statsCard}>
              <p className={S.bigValueText}>{statsData.currentAchievementRate}%</p>
              <div className="mb-2 w-49.75 h-1.75 item-justify-center mx-auto">
                <LinearProgress total={100} current={statsData.currentAchievementRate} />
              </div>
              <p className="text-xs text-gray-400">
                나의 목표 달성 최고 기록은 <span className="font-semibold">{statsData.bestAchievementRate}%</span> 에요!
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
                      <Pie data={pieData} dataKey="count" cx="50%" cy="50%" innerRadius={60} outerRadius={90}>
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={S.chartCenterText}>
                    <span className="text-lg font-['pretendard'] font-semibold text-gray-900">전체</span>
                    <span className="text-lg font-['pretendard'] font-semibold text-gray-900">{statsData.totalGenreCount}개 분야</span>
                  </div>
                </div>
              </div>
              <div className={S.genreList}>
                <p className="text-xs text-gray-500 mb-2">선호 분야 TOP3</p>
                {pieData.slice(0, 3).map((genre, index) => (
                  <div key={index} className={S.genreItem}>
                    <div className={S.genreDot} style={{ backgroundColor: PIE_COLORS[index] }} />
                    <span className="text-sm font-semibold text-black w-4">{index + 1}</span>
                    <span className="text-sm text-gray-800 flex-1">{genre.name}</span>
                    <span className="text-sm text-gray-500">{genre.count}권 {genre.percentage}%</span>
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
