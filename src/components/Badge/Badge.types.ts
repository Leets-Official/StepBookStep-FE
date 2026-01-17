export type BadgeType = "level" | "tag";

export interface BadgeStyle {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}

export interface BadgeProps {
  label: string;
  type?: BadgeType; // level | tag (텍스트 크기 차이)
  style: BadgeStyle; // 페이지에서 주입
}
