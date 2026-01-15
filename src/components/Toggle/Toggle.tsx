import { useState } from "react";
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
}

export default function Toggle({ maxPages }: ToggleProps) {
  const [value, setValue] = useState<ToggleValue>("page");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(30);
  const [page, setPage] = useState(0);

  const leftClassMap: Record<ToggleValue, string> = {
    time: "left-1",
    page: "left-1/2",
  };

  return (
    <div className={toggleContainer}>
      <div className={`${activePill} ${leftClassMap[value]} w-[calc(50%-4px)]`} />

      <div role="button" onClick={() => setValue("time")} className={toggleItem}>
        <div className={`${label} ${value === "time" ? "text-black" : inactiveText}`}>
          <ClockIcon className="w-4 h-4" />
          <span>시간</span>
        </div>

        <div className={valueRow}>
          <NumberWheel value={hour} min={0} max={23} active={value === "time"} onChange={setHour} />
          <span className={value === "time" ? "" : inactiveText}>시간</span>

          <NumberWheel
            value={minute}
            min={0}
            max={59}
            active={value === "time"}
            onChange={setMinute}
          />
          <span className={value === "time" ? "" : inactiveText}>분</span>
        </div>
      </div>

      <div role="button" onClick={() => setValue("page")} className={toggleItem}>
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
            onChange={setPage}
          />
          <span className={value === "page" ? "" : inactiveText}>쪽</span>
        </div>
      </div>
    </div>
  );
}
