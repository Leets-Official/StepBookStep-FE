import { container, segmentWrapper, segmentFill } from "./SegmentedProgress.styles";

interface SegmentedProgressProps {
  current: number; // 전체 step (1부터 시작)
}

const SEGMENT_STEPS = [1, 3, 1];

export function SegmentedProgress({ current }: SegmentedProgressProps) {
  return (
    <div className={container}>
      {SEGMENT_STEPS.map((stepsInSegment, idx) => {
        const segmentStartStep = SEGMENT_STEPS.slice(0, idx).reduce((sum, v) => sum + v, 0);

        const filledSteps = Math.min(Math.max(current - segmentStartStep, 0), stepsInSegment);

        const fillPercent = (filledSteps / stepsInSegment) * 100;

        return (
          <div key={idx} className={segmentWrapper}>
            <div className={segmentFill} style={{ width: `${fillPercent}%` }} />
          </div>
        );
      })}
    </div>
  );
}
