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

  if (!active) {
    return <span className="text-gray-300 font-semibold">{value}</span>;
  }

  if (editing) {
    return (
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
        className="
          w-10 text-center font-semibold text-gray-900
          outline-none border-b border-gray-300
          bg-transparent appearance-none
          [-moz-appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
        "
      />
    );
  }

  return (
    <span className="font-semibold text-gray-900 cursor-text" onClick={() => setEditing(true)}>
      {value}
    </span>
  );
}
