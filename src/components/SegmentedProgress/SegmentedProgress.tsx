import { container, segmentWrapper, segmentFill } from "./SegmentedProgress.styles";

interface SegmentedProgressProps {
  total: number; // 전체 단계 수
  current: number; // 현재 단계 (1부터 시작)
}

export function SegmentedProgress({ total, current }: SegmentedProgressProps) {
  return (
    <div className={container}>
      {Array.from({ length: total }).map((_, idx) => {
        const isCompleted = idx < current - 1;
        const isActive = idx === current - 1;

        return (
          <div key={idx} className={segmentWrapper}>
            <div
              className={segmentFill}
              style={{
                width: isCompleted ? "100%" : isActive ? "100%" : "0%",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
