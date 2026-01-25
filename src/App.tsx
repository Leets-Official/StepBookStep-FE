import {
  SkeletonBookThumbnail,
  SkeletonBadge,
  SkeletonReadingReportDetail,
  SkeletonBookList,
} from "@/components/skeleton";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[375px] h-[812px] bg-gray-50 rounded-[28px] shadow-2xl overflow-hidden">
        <div className="h-full p-6 space-y-8 overflow-y-auto">
          <SkeletonBadge type="level" />
          <SkeletonBadge type="tag" />

          <SkeletonBookThumbnail />

          <SkeletonReadingReportDetail />

          <div className="space-y-4">
            <SkeletonBookList />
            <SkeletonBookList />
            <SkeletonBookList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
