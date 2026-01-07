import { useState, useRef, useEffect } from "react";
import {
  triggerBase,
  triggerInactive,
  triggerActive,
  triggerDisabled,
  menu,
} from "./DropDown.styles";
import { DropDownItem } from "./DropDownItem";
import { ChevronDownIcon } from "@/assets/icons";

interface DropDownProps {
  options: string[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
}

export function DropDown({
  options,
  value,
  placeholder = "Label",
  disabled,
  onChange,
}: DropDownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = open || !!value;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={[
          triggerBase,
          "w-full",
          disabled ? triggerDisabled : isActive ? triggerActive : triggerInactive,
        ].join(" ")}
      >
        <span className="text-black">{value ?? placeholder}</span>

        <ChevronDownIcon
          className={["w-5 h-5", isActive ? "text-black" : "text-gray-400"].join(" ")}
        />
      </button>

      {open && (
        <ul className={menu}>
          {options.map((opt) => (
            <DropDownItem
              key={opt}
              label={opt}
              active={opt === value}
              onClick={() => {
                if (opt === value) {
                  onChange?.(undefined);
                } else {
                  onChange?.(opt);
                }
                setOpen(false);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
