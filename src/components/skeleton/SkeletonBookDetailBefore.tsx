import { SkeletonBase, SkeletonBadge } from "./index";

export default function SkeletonBookDetailBefore() {
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

      {/* 책 소개 */}
      <div className="mb-4">
        <SkeletonBase className="w-1/5 h-5 rounded-sm" />
      </div>

      <div className="space-y-2">
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
        <SkeletonBase className="w-full h-3 rounded-sm" />
      </div>

      <div className="justify-items-center mt-5">
        <SkeletonBase className="w-1/6 h-3 rounded-sm mt-2" />
      </div>
    </div>
  );
}
