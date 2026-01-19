import type { ReadingDetailData } from "@/mocks/readingState.mock"; // 타입 가져오기
import { LinearProgress } from "@/components/Progress/LinearProgress";
import * as S from "./ReadingStateDetail.styles";

interface ReadingStateDetailProps {
  data: ReadingDetailData; // 더미 데이터 구조를 그대로 타입으로 사용
}

export function ReadingStateDetail({ data }: ReadingStateDetailProps) {
  const { isCompleted, title, currentPage, totalPage, startDate, endDate, review, logs } = data;
  const percent = Math.floor((currentPage / totalPage) * 100);

  return (
    <div className={S.container}>
      {/* 1. 상단 상태 및 제목 */}
      <div className={S.header}>
        <div className={`px-3 py-1 rounded-full text-xs font-bd ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
          {isCompleted ? "완독!" : "읽는 중"}
        </div>
        <h2 className={S.title}>{title}</h2>
      </div>

      {/* 2. 진행도 또는 한 줄 평 */}
      <div className={S.progressTextContainer}>
        {isCompleted ? (
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bd text-gray-800">⭐ 5.0</span>
            <span className="text-md font-rg text-gray-600 italic">"{review}"</span>
          </div>
        ) : (
          <>
            <p className={S.progressSub}>
              <span className={S.progressHighlight}>{currentPage}쪽 ({percent}%)</span> 읽었어요!
            </p>
            <LinearProgress total={totalPage} current={currentPage} />
          </>
        )}
      </div>

      {/* 3. 날짜 정보 */}
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

      {/* 4. 독서 기록 리스트 */}
      <div className={S.recordListContainer}>
        {logs.map((log, index) => (
          <div key={index} className={S.recordItem}>
            <span className={S.recordDate}>{log.date}</span>
            <span className={S.recordDetail}>
              {log.page}쪽 ({log.percent}%), {log.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}