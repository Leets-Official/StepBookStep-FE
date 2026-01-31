import { useState } from "react";
import Segment from "@/components/Segment/Segment";
import type { SegmentValue } from "@/components/Segment/Segment";
import Toggle from "@/components/Toggle/Toggle";
import type { ToggleValue } from "@/components/Toggle/Toggle";
import Button from "@/components/Button/Button";
import { XIcon } from "@/assets/icons";

import {
  modalContainer,
  overlay,
  header,
  title as titleClass,
  closeButton,
  quote,
  wrapper,
  section,
  footer,
} from "./GoalModal.styles";

interface GoalModalProps {
  maxPages: number;
  title: string;
  onClose: () => void;
  onSave: () => void;
  count?: number; // 💡 설계도에 count를 추가했습니다
}

// 💡 함수 인자에서 'count'를 명시적으로 꺼내줍니다 (구조 분해 할당)
export default function GoalModal({ 
  maxPages, 
  title, 
  onClose, 
  onSave, 
  count 
}: GoalModalProps) {
  const [period, setPeriod] = useState<SegmentValue>("day");
  const [type, setType] = useState<ToggleValue>("time");

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [page, setPage] = useState(0);

  const periodText = (() => {
    switch (period) {
      case "week":
        return "일주일에";
      case "month":
        return "한 달에";
      case "day":
      default:
        return "하루에";
    }
  })();

  const goalText =
    type === "time"
      ? hour > 0 && minute > 0
        ? `${periodText} ${hour}시간 ${minute}분 독서해요!`
        : hour > 0
          ? `${periodText} ${hour}시간 독서해요!`
          : `${periodText} ${minute}분 독서해요!`
      : `${periodText} ${page}쪽 독서해요!`;

  return (
    <div className={overlay}>
      <div className={modalContainer}>
        <div className={header}>
          <div className="flex flex-col gap-1">
            {/* 💡 count 값이 있을 때만 상단에 표시합니다 */}
            {count && (
              <span className="text-[12px] font-semibold text-purple-600">
                {count}번째 목표 설정
              </span>
            )}
            <h2 className={titleClass}>{title}</h2>
          </div>
          <button onClick={onClose} className={closeButton}>
            <XIcon />
          </button>
        </div>

        <p className={quote}>&quot;{goalText}&quot;</p>

        <div className={wrapper}>
          <div className={section}>
            <Segment value={period} onChange={setPeriod} />
          </div>

          <div className={section}>
            <Toggle
              maxPages={maxPages}
              value={type}
              onChangeType={setType}
              hour={hour}
              minute={minute}
              page={page}
              onHourChange={setHour}
              onMinuteChange={setMinute}
              onPageChange={setPage}
            />
          </div>
        </div>

        <div className={footer}>
          <Button label="저장하기" fullWidth size="large" onClick={onSave} />
        </div>
      </div>
    </div>
  );
}