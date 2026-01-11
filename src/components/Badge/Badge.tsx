import { contain, text, lvContain, lvText } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export function Badge({ label, variant = "tag" }: BadgeProps) {
  const isLv = variant === "lv";

  return (
    <span className={isLv ? lvContain : contain}>
      <span className={isLv ? lvText : text}>{label}</span>
    </span>
  );
}
