import {
  segmentContainer,
  activePill,
  segmentItem,
  labelBase,
  labelActive,
  labelInactive,
} from "./Segment.styles";

export type SegmentValue = "day" | "week" | "month";

interface SegmentOption {
  label: string;
  value: SegmentValue;
}

interface SegmentProps {
  value: SegmentValue;
  onChange: (value: SegmentValue) => void;
}

const OPTIONS: SegmentOption[] = [
  { label: "하루", value: "day" },
  { label: "1주일", value: "week" },
  { label: "1개월", value: "month" },
];

export default function Segment({ value, onChange }: SegmentProps) {
  const index = OPTIONS.findIndex((o) => o.value === value);

  const leftClassMap: Record<number, string> = {
    0: "left-1",
    1: "left-1/3",
    2: "left-2/3",
  };

  return (
    <div className={segmentContainer}>
      <div className={`${activePill} ${leftClassMap[index]} w-[calc(33.333%-4px)]`} />

      {OPTIONS.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={segmentItem}
          >
            <span className={`${labelBase} ${isActive ? labelActive : labelInactive}`}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
