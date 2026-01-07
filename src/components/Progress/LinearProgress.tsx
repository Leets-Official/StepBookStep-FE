import { track, fill } from "./LinearProgress.styles";

interface LinearProgressProps {
  total: number; // 전체 페이지 수
  current: number; // 현재 페이지 (1부터)
}

export function LinearProgress({ total, current }: LinearProgressProps) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={track}>
      <div
        className={fill}
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
  );
}
