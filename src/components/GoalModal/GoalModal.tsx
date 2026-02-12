import { useState, useEffect } from "react";
import Segment from "@/components/Segment/Segment";
import type { SegmentValue } from "@/components/Segment/Segment";
import Toggle from "@/components/Toggle/Toggle";
import type { ToggleValue } from "@/components/Toggle/Toggle";
import Button from "@/components/Button/Button";
import { XIcon } from "@/assets/icons";
import { useUpdateBookGoal, useCreateBookGoal } from "@/hooks/useReadings";
import type { Goal, GoalPeriod, GoalMetric } from "@/api/types";

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
  bookId: number; // ⭐ 추가
  maxPages: number;
  title: string;
  onClose: () => void;
  onSave: () => void;
  count?: number;
  existingGoal?: Goal | null; // ⭐ 추가 (수정 모드)
}

export default function GoalModal({ 
  bookId,
  maxPages, 
  title, 
  onClose, 
  onSave, 
  count,
  existingGoal,
}: GoalModalProps) {
  // Segment 값 매핑 (API → UI)
  const segmentFromPeriod = (period: GoalPeriod): SegmentValue => {
    switch (period) {
      case "DAILY": return "day";
      case "WEEKLY": return "week";
      case "MONTHLY": return "month";
      default: return "day";
    }
  };

  // Segment 값 매핑 (UI → API)
  const periodFromSegment = (segment: SegmentValue): GoalPeriod => {
    switch (segment) {
      case "day": return "DAILY";
      case "week": return "WEEKLY";
      case "month": return "MONTHLY";
      default: return "DAILY";
    }
  };

  // Toggle 값 매핑
  const toggleFromMetric = (metric: GoalMetric): ToggleValue => {
    return metric === "TIME" ? "time" : "page";
  };

  const metricFromToggle = (toggle: ToggleValue): GoalMetric => {
    return toggle === "time" ? "TIME" : "PAGE";
  };

  // 기존 목표가 있으면 초기값 설정, 없으면 기본값
  const [period, setPeriod] = useState<SegmentValue>(
    existingGoal ? segmentFromPeriod(existingGoal.period) : "day"
  );
  const [type, setType] = useState<ToggleValue>(
    existingGoal ? toggleFromMetric(existingGoal.metric) : "time"
  );

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [page, setPage] = useState(
    existingGoal && existingGoal.metric === "PAGE" ? existingGoal.targetAmount : 0
  );

  // 기존 목표의 시간을 시/분으로 분리
  useEffect(() => {
    if (existingGoal && existingGoal.metric === "TIME") {
      const totalMinutes = existingGoal.targetAmount;
      setHour(Math.floor(totalMinutes / 60));
      setMinute(totalMinutes % 60);
    }
  }, [existingGoal]);

  const updateGoalMutation = useUpdateBookGoal();
  const createGoalMutation = useCreateBookGoal();

  const periodText = (() => {
    switch (period) {
      case "week": return "일주일에";
      case "month": return "한 달에";
      case "day":
      default: return "하루에";
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

  const handleSave = async () => {
    try {
      const targetAmount = type === "time" 
        ? hour * 60 + minute // 분 단위로 변환
        : page;

      const requestData = {
        period: periodFromSegment(period),
        metric: metricFromToggle(type),
        targetAmount,
      };

      if (existingGoal) {
        await updateGoalMutation.mutateAsync({
          bookId,
          data: requestData,
        });
      } else {
        await createGoalMutation.mutateAsync({
          bookId,
          data: requestData,
        });
      }

      onSave(); 
      onClose(); 
    } catch (error) {
      console.error("목표 저장 실패:", error);
    }
  };

  const isPending = updateGoalMutation.isPending || createGoalMutation.isPending;

  return (
    <div className={overlay}>
      <div className={modalContainer}>
        <div className={header}>
          <div className="flex flex-col gap-1">
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
          <Button 
            label={isPending ? "저장 중..." : "저장하기"} 
            fullWidth 
            size="large" 
            onClick={handleSave}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
}