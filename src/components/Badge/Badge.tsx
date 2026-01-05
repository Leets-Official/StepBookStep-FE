import { contain, text } from "./Badge.styles";

interface BadgeProps {
  label?: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className={contain}>
      <span className={text}>{label}</span>
    </span>
  );
}
