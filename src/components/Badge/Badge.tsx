import { baseContain, baseText, levelText, tagText } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export function Badge({ label, type = "tag", style }: BadgeProps) {
  const textSizeClass = type === "level" ? levelText : tagText;

  return (
    <span
      className={baseContain}
    >
      <span className={`${baseText} ${textSizeClass}`} >
        {label}
      </span>
    </span>
  );
}
