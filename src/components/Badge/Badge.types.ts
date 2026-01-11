export type BadgeVariant = "tag" | "lv";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}
