import SkeletonBase from "@/components/skeleton/SkeletonBase";
import SkeletonBookThumbnail from "@/components/skeleton/SkeletonBookThumbnail";
import SkeletonBadge from "@/components/skeleton/SkeletonBadge";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import * as S from "./Home.styles";

export default function SkeletonHome() {
  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="logo" onSettingClick={() => {}} />

        <main className={S.content}>
          {/* 상단 문구 */}
          <section className={S.headerSection}>
            <SkeletonBase className="w-32 h-4 mb-2 rounded-sm" />
            <SkeletonBase className="w-52 h-6 rounded-sm" />
          </section>

          {/* 첫 번째 슬라이더 */}
          <section className="flex gap-4 overflow-hidden py-4 px-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBookThumbnail key={i} />
            ))}
          </section>

          {/* 추천 도서 타이틀 */}
          <section className={S.recommendSection}>
            <SkeletonBase className="w-40 h-5 mb-4 rounded-sm" />

            <div className="flex gap-2">
              <SkeletonBadge type="tag" />
              <SkeletonBadge type="tag" />
              <SkeletonBadge type="tag" />
            </div>
          </section>

          {/* 두 번째 슬라이더 */}
          <section className="flex gap-4 overflow-hidden py-4 px-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBookThumbnail key={i} />
            ))}
          </section>

          {/* 통계 헤더 */}
          <div className={S.statsHeader}>
            <SkeletonBase className="w-36 h-5 rounded-sm" />
            <SkeletonBase className="w-5 h-5 rounded-sm" />
          </div>

          {/* 통계 카드 */}
          <section className={S.statsCard}>
            <div className={S.statsSection}>
              <div className={S.statsGrid}>
                <StatSkeleton />
                <StatSkeleton />
              </div>
            </div>

            <div className={S.divider} />

            <div className={S.statsSection}>
              <div className={S.statsGrid}>
                <StatSkeleton />
                <StatSkeleton />
              </div>
            </div>
          </section>
        </main>

        <BottomBar activeTab="home" onTabSelect={() => {}} />
      </div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className={S.statItem}>
      <SkeletonBase className="w-9 h-9 rounded-lg" />
      <div className="flex flex-col gap-2">
        <SkeletonBase className="w-20 h-3 rounded-sm" />
        <SkeletonBase className="w-14 h-4 rounded-sm" />
      </div>
    </div>
  );
}
