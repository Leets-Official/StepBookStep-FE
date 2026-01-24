import type { TabProps } from "./Tab.types";
import { tabBase, tabActive, tabInactive } from "./Tab.styles";

export function Tab({ label, isActive, onClick, className }: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${tabBase} ${isActive ? tabActive : tabInactive} ${className || ""}`}
    >
      {label}
    </button>
  );
}
