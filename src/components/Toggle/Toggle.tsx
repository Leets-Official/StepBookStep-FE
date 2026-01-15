import {
  toggleContainer,
  activePill,
  toggleItem,
  label,
  valueRow,
  inactiveText,
} from "./Toggle.styles";
import { ClockIcon, BookIcon } from "@/assets/icons";
import { NumberWheel } from "./NumberWheel";

export type ToggleValue = "time" | "page";

interface ToggleProps {
  maxPages: number;

  value: ToggleValue;
  onChangeType: (v: ToggleValue) => void;

  hour: number;
  minute: number;
  page: number;

  onHourChange: (v: number) => void;
  onMinuteChange: (v: number) => void;
  onPageChange: (v: number) => void;
}

export default function Toggle({
  maxPages,
  value,
  onChangeType,
  hour,
  minute,
  page,
  onHourChange,
  onMinuteChange,
  onPageChange,
}: ToggleProps) {
  const leftClassMap: Record<ToggleValue, string> = {
    time: "left-1",
    page: "left-1/2",
  };

  return (
    <div className={toggleContainer}>
      <div className={`${activePill} ${leftClassMap[value]} w-[calc(50%-4px)]`} />

      <div role="button" onClick={() => onChangeType("time")} className={toggleItem}>
        <div className={`${label} ${value === "time" ? "text-black" : inactiveText}`}>
          <ClockIcon className="w-4 h-4" />
          <span>시간</span>
        </div>

        <div className={valueRow}>
          <NumberWheel
            value={hour}
            min={0}
            max={23}
            active={value === "time"}
            onChange={onHourChange}
          />
          <span className={value === "time" ? "" : inactiveText}>시간</span>

          <NumberWheel
            value={minute}
            min={0}
            max={59}
            active={value === "time"}
            onChange={onMinuteChange}
          />
          <span className={value === "time" ? "" : inactiveText}>분</span>
        </div>
      </div>

      <div role="button" onClick={() => onChangeType("page")} className={toggleItem}>
        <div className={`${label} ${value === "page" ? "text-black" : inactiveText}`}>
          <BookIcon className="w-4 h-4" />
          <span>쪽수</span>
        </div>

        <div className={valueRow}>
          <NumberWheel
            value={page}
            min={0}
            max={maxPages}
            active={value === "page"}
            onChange={onPageChange}
          />
          <span className={value === "page" ? "" : inactiveText}>쪽</span>
        </div>
      </div>
    </div>
  );
}
