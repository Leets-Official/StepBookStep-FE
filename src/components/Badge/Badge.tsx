import { baseContain, baseText, levelText, tagText } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export function Badge({ label, type = "tag", className }: BadgeProps) {
  const textSizeClass = type === "level" ? levelText : tagText;

  return (
    <span
      className={`${baseContain} ${className || ""}`}
    >
      <span className={`${baseText} ${textSizeClass}`}>
        {label}
      </span>
    </span>
  );
}
