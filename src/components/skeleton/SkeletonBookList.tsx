import SkeletonBase from "./SkeletonBase";

export default function SkeletonBookList() {
  return (
    <div className="flex gap-4">
      {/* 썸네일 */}
      <SkeletonBase className="w-21 h-28 rounded-md" />

      {/* 텍스트 */}
      <div className="flex flex-col gap-1 flex-1 py-3">
        <SkeletonBase className="w-full h-5 rounded-sm" />
        <SkeletonBase className="w-full h-4 rounded-sm" />
        <SkeletonBase className="w-2/5 h-4 rounded-sm" />
        <div className="mt-2">
          <SkeletonBase className="w-full h-5 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
