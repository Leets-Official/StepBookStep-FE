import SkeletonBase from "./SkeletonBase";

export default function SkeletonBookThumbnail() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* 썸네일 */}
      <SkeletonBase className="w-30 h-42.5 rounded-sm" />

      {/* 텍스트 */}
      <SkeletonBase className="w-30 h-3.5 rounded-xs" />
      <SkeletonBase className="w-30 h-3.5 rounded-xs" />
    </div>
  );
}
