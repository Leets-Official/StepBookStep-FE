import { useState } from "react";
import BookReport from "@/components/BookReport/BookReport";
import type { BookReportData } from "@/components/BookReport/BookReport.types";

const PlayGround = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isTimerMode, setIsTimerMode] = useState(false);
  const [savedLog, setSavedLog] = useState<BookReportData | null>(null);

  // 저장 핸들러
  const handleSave = (data: BookReportData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSavedLog(data);
      setIsOpen(false);
      alert("기록저장 성공이긔!");
    }, 800);
  };

  const openManualRecord = () => {
    setIsTimerMode(false); // 직접 기록 -> 시간 입력 숨김
    setIsOpen(true);
  };

  const openTimerRecord = () => {
    setIsTimerMode(true); // 타이머 기록 -> 시간 입력 표시
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 테스트 버튼 2개 */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={openManualRecord}
          className="px-6 py-3 text-black rounded-lg hover:bg-amber-200 transition font-bold shadow-lg"
        >
          직접 기록하기
          <br />
          <span className="text-xs font-normal">(쪽수만 입력)</span>
        </button>

        <button
          onClick={openTimerRecord}
          className="px-6 py-3 text-black rounded-lg hover:bg-amber-200 transition font-bold shadow-lg"
        >
          타이머로 기록하기
          <br />
          <span className="text-xs font-normal">(쪽수 + 시간 입력)</span>
        </button>
      </div>

      {/* 결과 표시 */}
      {savedLog && (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <h2 className="text-lg font-bold mb-4 text-gray-900">저장된 데이터</h2>
          <div className="space-y-2 text-sm">
            <p>
              독서 상태: <span className="font-semibold">{savedLog.status}</span>
            </p>
            <p>기록일: {savedLog.date?.toLocaleDateString()}</p>
            {/* 쪽수는 항상 표시 */}
            {(savedLog.status === "READING" || savedLog.status === "BEFORE") && (
              <p>쪽수: {savedLog.pages}쪽</p>
            )}
            {/* 시간은 값이 있을 때만 표시 */}
            {savedLog.duration && <p>시간: {savedLog.duration}</p>}
            {/* 별점은 완독/중단일 때만 표시 */}
            {savedLog.rating > 0 && <p>별점: {savedLog.rating}점</p>}
          </div>
        </div>
      )}

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-slide-up mb-0">
            <BookReport
              onClose={() => !isLoading && setIsOpen(false)}
              onSave={handleSave}
              isTimerMode={isTimerMode}
              initialData={{
                status: "READING", // 기본 상태를 '읽는 중' 또는 '읽고 싶은'으로 테스트
                date: new Date(),
                duration: isTimerMode ? "01:30:00" : "",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayGround;
