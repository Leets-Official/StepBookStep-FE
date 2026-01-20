import type { ReadingDetailData } from "@/mocks/readingState.mock";
import { LinearProgress } from "@/components/Progress/LinearProgress";
import { Badge } from "@/components/Badge/Badge"; 
import * as S from "./ReadingStateDetail.styles";
import { StarFilledIcon } from "@/assets/icons";

interface ReadingStateDetailProps {
  data: ReadingDetailData;
}

export function ReadingStateDetail({ data }: ReadingStateDetailProps) {
  const { isCompleted, title, currentPage, totalPage, startDate, endDate, review, logs } = data;
  const percent = Math.floor((currentPage / totalPage) * 100);

  const currentBadgeStyle = isCompleted
    ? "bg-lime-300 border-lime-500 text-purple-800"
    : "bg-lime-200 border-lime-500 text-purple-800";

  return (
    <div className={S.container}>
      {/* 헤더 영역 */}
      <div className={S.header}>
        <Badge 
          label={isCompleted ? "완독!" : "읽는 중"} 
          type="tag" 
          className={currentBadgeStyle} 
        />
        <h2 className={S.title}>{title}</h2>
      </div>

      {/* 진행도 또는 한 줄 평 */}
      <div className={S.progressTextContainer}>
        {isCompleted ? (
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-md font-semibold text-gray-800"><StarFilledIcon className="w-5 h-5 inline text-purple-500"/> 5.0  </span>
            <span className="text-md font-semibold text-gray-800">{review}</span>
          </div>
        ) : (
          <>
            <p className={S.progressSub}>
              <span className={S.progressHighlight}>{currentPage}</span>
              <span className="text-md font-semibold text-black">쪽</span>
              <span className={S.progressHighlight}> ({percent}%)</span>
              <span className="text-md font-semibold text-black"> 읽었어요!</span>
            </p>
            <LinearProgress total={totalPage} current={currentPage} />
          </>
        )}
      </div>

      {/* 날짜 정보 */}
      <div className={S.dateInfoContainer}>
        <div className={S.dateItem}>
          <span className={S.dateLabel}>시작일</span>
          <span className={S.dateValue}>{startDate}</span>
        </div>
        <div className={S.dateItem}>
          <span className={S.dateLabel}>종료일</span>
          <span className={S.dateValue}>{isCompleted ? endDate : "-"}</span>
        </div>
      </div>

      {/* 독서 기록 리스트 */}
      <div className={S.recordListContainer}>
        {logs.map((log, index) => (
          <div key={index} className={S.recordItem}>
            <span className={S.recordDate}>{log.date}</span>
            <span className={S.recordDetail}>
              {log.page}쪽({log.percent}%), {log.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
