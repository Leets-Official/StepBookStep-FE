import { SkeletonBase, SkeletonBadge, SkeletonReadingReportDetail } from "./index";

export default function SkeletonBookDetailReading() {
  return (
    <div className="px-5 space-y-6">
      {/* 커버 */}
      <div className="flex justify-center mb-2 py-5">
        <SkeletonBase className="w-[110px] h-[160px]" />
      </div>

      {/* 레벨 */}
      <SkeletonBadge type="level" />

      {/* 제목,저자,쪽 */}
      <div className="space-y-1.5">
        <SkeletonBase className="w-full h-4 rounded-sm" />
        <SkeletonBase className="w-full h-4 rounded-sm" />
        <SkeletonBase className="w-1/5 h-5 rounded-sm" />
        <SkeletonBase className="w-1/3 h-4 rounded-sm" />
      </div>

      {/* 태그 */}
      <div className="flex gap-2">
        <SkeletonBadge type="tag" />
        <SkeletonBadge type="tag" />
        <SkeletonBadge type="tag" />
      </div>

      {/* 구분선 */}
      <SkeletonBase className="w-full h-px" />

      {/* 탭 */}
      <div className="flex mb-2">
        <div className="flex-1 h-6 justify-items-center items-center">
          <SkeletonBase className="w-15 h-6 rounded-md" />
        </div>
        <div className="flex-1 h-6 justify-items-center items-center">
          <SkeletonBase className="w-15 h-6 rounded-md" />
        </div>
      </div>

      {/* 구분선 */}
      <SkeletonBase className="w-full h-px" />

      {/* 독서 기록 영역 */}
      <SkeletonReadingReportDetail />
    </div>
  );
}
