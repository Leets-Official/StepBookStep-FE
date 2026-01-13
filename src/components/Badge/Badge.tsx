import {
  contain,
  text,
  lv1Contain,
  lv1Text,
  lv2Contain,
  lv2Text,
  lv3Contain,
  lv3Text,
} from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export function Badge({ label, variant = "tag" }: BadgeProps) {
  if (variant === "lv1") {
    return (
      <span className={lv1Contain}>
        <span className={lv1Text}>{label}</span>
      </span>
    );
  }

  if (variant === "lv2") {
    return (
      <span className={lv2Contain}>
        <span className={lv2Text}>{label}</span>
      </span>
    );
  }

  if (variant === "lv3") {
    return (
      <span className={lv3Contain}>
        <span className={lv3Text}>{label}</span>
      </span>
    );
  }

  return (
    <span className={contain}>
      <span className={text}>{label}</span>
    </span>
  );
}
