import { useRef, useEffect } from "react";

interface NumberWheelProps {
  value: number;
  min: number;
  max: number;
  active: boolean;
  onChange: React.Dispatch<React.SetStateAction<number>>;
}

const INTERVAL_MS = 80;
const DIRECTION_THRESHOLD = 6;

export function NumberWheel({ value, min, max, active, onChange }: NumberWheelProps) {
  const startY = useRef<number | null>(null);
  const direction = useRef<"up" | "down" | null>(null);
  const timer = useRef<number | null>(null);

  const startAuto = () => {
    if (timer.current !== null) return;

    timer.current = window.setInterval(() => {
      if (direction.current === "up") {
        onChange((v) => Math.min(v + 1, max));
      }

      if (direction.current === "down") {
        onChange((v) => Math.max(v - 1, min));
      }
    }, INTERVAL_MS);
  };

  const stopAuto = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    direction.current = null;
    startY.current = null;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopAuto);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", stopAuto);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientY);
  };

  const handleStart = (y: number) => {
    startY.current = y;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopAuto);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", stopAuto);
  };

  const handleMove = (y: number) => {
    if (startY.current === null) return;

    const diff = startY.current - y;

    if (diff > DIRECTION_THRESHOLD) {
      direction.current = "up";
      startAuto();
    } else if (diff < -DIRECTION_THRESHOLD) {
      direction.current = "down";
      startAuto();
    }
  };

  useEffect(() => {
    return () => stopAuto();
  }, []);

  if (!active) {
    return <span className="text-gray-300 font-semibold">{value}</span>;
  }

  return (
    <div
      className="select-none cursor-ns-resize font-semibold text-gray-900"
      onMouseDown={(e) => handleStart(e.clientY)}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
    >
      {value}
    </div>
  );
}
