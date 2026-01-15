import { useEffect, useRef, useState } from "react";

interface NumberWheelProps {
  value: number;
  min: number;
  max: number;
  active: boolean;
  onChange: (v: number) => void;
}

export function NumberWheel({ value, min, max, active, onChange }: NumberWheelProps) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(String(value));
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTemp(String(value));
  }, [value]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    let next = Number(temp);
    if (Number.isNaN(next)) next = value;
    next = Math.max(min, Math.min(max, next));
    onChange(next);
    setEditing(false);
  };

  const wrapperClass = `
    inline-flex items-center justify-center
    w-[36px] h-[32px]
    rounded-md
    ${active ? "bg-lime-400" : "bg-transparent"}
  `;

  const commonTextClass = "font-semibold text-gray-900 leading-none";

  if (!active) {
    return (
      <span className={`${wrapperClass} opacity-40`}>
        <span className={commonTextClass}>{value}</span>
      </span>
    );
  }

  if (editing) {
    return (
      <span className={wrapperClass}>
        <input
          ref={inputRef}
          type="number"
          value={temp}
          min={min}
          max={max}
          onChange={(e) => setTemp(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className={`
            w-full h-full
            text-center ${commonTextClass}
            bg-transparent outline-none
            p-0 m-0
            appearance-none
            [-moz-appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          `}
        />
      </span>
    );
  }

  return (
    <span className={wrapperClass} onClick={() => setEditing(true)}>
      <span className={commonTextClass}>{value}</span>
    </span>
  );
}
