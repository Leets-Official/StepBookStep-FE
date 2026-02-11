import { LinearProgress } from "@/components/Progress/LinearProgress";
import { Badge } from "@/components/Badge/Badge"; 
import * as S from "./ReadingStateDetail.styles";
import { StarFilledIcon } from "@/assets/icons";
import { useReadingDetail } from "@/hooks/useReadings";

interface ReadingStateDetailProps {
  bookId: number; 
}

export function ReadingStateDetail({ bookId }: ReadingStateDetailProps) {
  const { data: detailData, isLoading } = useReadingDetail(bookId);

  if (isLoading || !detailData) return null;

  const { goal, readingLogs, totalPages, currentPage, progressPercent, bookStatus, startDate, endDate } = detailData;

  const isCompleted = bookStatus === "FINISHED" || bookStatus === "STOPPED"; 
  
  // 날짜 포맷팅 (YYYY-MM-DD -> YYYY. MM. DD)
  const formattedStartDate = startDate ? startDate.replace(/-/g, '. ') : '-';
  const formattedEndDate = endDate ? endDate.replace(/-/g, '. ') : "-";

  // 목표 텍스트 생성
  const goalTitle = goal 
    ? `${goal.period === "DAILY" ? "하루에 " : goal.period === "WEEKLY" ? "일주일에 " : "한 달에 "}${goal.targetAmount}${goal.metric === "TIME" ? "분" : "쪽"} 독서해요!`
    : "목표를 설정해주세요";

  const currentBadgeStyle = isCompleted
    ? "bg-lime-300 border-lime-500 text-purple-800"
    : "bg-lime-200 border-lime-500 text-purple-800";

  // 시간 포맷팅 함수 (초 -> 분 초)
  const formatDuration = (seconds: number) => {
    if (!seconds) return "0분";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return sec > 0 ? `${min}분 ${sec}초` : `${min}분`;
  };

  return (
    <div className={S.container}>
      <div className={S.header}>
        <Badge 
          label={isCompleted ? "완독!" : "읽는 중"} 
          type="tag" 
          className={currentBadgeStyle} 
        />
        <h2 className={S.title}>{goalTitle}</h2> 
      </div>

      <div className={S.progressTextContainer}>
        {isCompleted ? (
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-md font-semibold text-gray-800">
              <StarFilledIcon className="w-5 h-5 inline text-purple-500"/> {detailData.rating?.toFixed(1) || "0.0"}
            </span>
            <span className="text-md font-semibold text-gray-800">멋진 독서 여정이에요!</span>
          </div>
        ) : (
          <>
            <p className={S.progressSub}>
              <span className={S.progressHighlight}>{currentPage}</span>
              <span className="text-md font-semibold text-black">쪽</span>
              <span className={S.progressHighlight}> ({progressPercent}%)</span>
              <span className="text-md font-semibold text-black"> 읽었어요!</span>
            </p>
            <LinearProgress total={totalPages} current={currentPage} />
          </>
        )}
      </div>

      <div className={S.dateInfoContainer}>
        <div className={S.dateItem}>
          <span className={S.dateLabel}>시작일 </span>
          <span className={S.dateValue}>{formattedStartDate}</span>
        </div>
        <div className={S.dateItem}>
          <span className={S.dateLabel}>종료일&nbsp;</span>
          <span className={S.dateValue}>{formattedEndDate}</span>
        </div>
      </div>

      {readingLogs && readingLogs.length > 0 && (
        <div className="mt-4 flex flex-col rounded-sm bg-gray-50">
          {readingLogs.map((log) => {
             // 해당 기록의 퍼센트 계산 (전체 페이지 대비)
             const logPercent = totalPages > 0 ? Math.floor((log.pagesRead / totalPages) * 100) : 0;
             
             return (
              <div 
                key={log.logId} 
                className="flex justify-between items-center px-4 py-3 text-sm text-gray-600"
              >
                <span className="text-gray-700">{log.recordDate.replace(/-/g, '. ')}</span>
                
                <span className="text-gray-700">
                  {`${log.pagesRead}쪽 (${logPercent}%)`}
                  {goal?.metric === "TIME" && `, ${formatDuration(log.durationSeconds)}`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
