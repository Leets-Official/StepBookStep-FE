import {
  baseContain,
  baseText,
  levelContain,
  tagContain,
  levelText,
  tagText,
} from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export function Badge({ label, type = "tag", className }: BadgeProps) {
  const containClass = type === "level" ? levelContain : tagContain;
  const textSizeClass = type === "level" ? levelText : tagText;

  return (
    <span className={`${baseContain} ${containClass} ${className || ""}`}>
      <span className={`${baseText} ${textSizeClass}`}>{label}</span>
    </span>
  );
}
