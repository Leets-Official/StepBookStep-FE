import { LinearProgress } from "@/components/Progress/LinearProgress";
import { Badge } from "@/components/Badge/Badge"; 
import * as S from "./ReadingStateDetail.styles";
import { StarFilledIcon } from "@/assets/icons";
import type { Goal } from "@/api/types";

interface ReadingStateDetailProps {
  goal: Goal; 
  totalPage: number;
}

export function ReadingStateDetail({ goal, totalPage }: ReadingStateDetailProps) {
  if (!goal) return null;

  const currentPage = goal.currentProgress ?? 0;
  const isCompleted = currentPage >= totalPage;
  const percent = totalPage > 0 ? Math.floor((currentPage / totalPage) * 100) : 0;
  
  const startDate = goal.createdAt?.split('T')[0].replace(/-/g, '.') || "-";
  const endDate = goal.updatedAt?.split('T')[0].replace(/-/g, '.') || "-";

  const goalTitle = `${goal.period === "DAILY" ? "하루에 " : ""}${goal.targetAmount}${goal.metric === "TIME" ? "분" : "쪽"} 독서해요!`;

  const review = "멋진 독서 여정이에요!"; 
  const logs: any[] = []; 

  const currentBadgeStyle = isCompleted
    ? "bg-lime-300 border-lime-500 text-purple-800"
    : "bg-lime-200 border-lime-500 text-purple-800";

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
              <StarFilledIcon className="w-5 h-5 inline text-purple-500"/> 5.0
            </span>
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

      <div className={S.dateInfoContainer}>
        <div className={S.dateItem}>
          <span className={S.dateLabel}>시작일 </span>
          <span className={S.dateValue}>{startDate}</span>
        </div>
        <div className={S.dateItem}>
          <span className={S.dateLabel}>종료일&nbsp;</span>
          <span className={S.dateValue}>{isCompleted ? endDate : "-"}</span>
        </div>
      </div>

      {logs.length > 0 && (
        <div className={S.recordListContainer}>
          {logs.map((log, index) => (
            <div key={index} className={S.recordItem}>
              <span className={S.recordDate}>{log.date}</span>
              <span className={S.recordDetail}>{log.page}쪽</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}