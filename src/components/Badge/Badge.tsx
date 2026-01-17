import { baseContain, baseText, levelText, tagText } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export function Badge({ label, type = "tag", style={} as any}: BadgeProps) {
  const textSizeClass = type === "level" ? levelText : tagText;

  return (
    <span
      className={baseContain}
      style={{
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
      }}
    >
      <span className={`${baseText} ${textSizeClass}`} style={{ color: style.textColor }}>
        {label}
      </span>
    </span>
  );
}
