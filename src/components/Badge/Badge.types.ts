export type BadgeVariant = "tag" | "lv1" | "lv2" | "lv3";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}
