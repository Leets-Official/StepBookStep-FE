import React from "react";

export type ButtonSize = "large" | "medium" | "small";

export type Variant =
  | "primary"          // Purple 채움
  | "primaryOutline"   // Purple 테두리 
  | "secondary"        // Lime 채움
  | "secondaryOutline" // Lime 테두리
  | "ghost";           // 배경 없음

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: Variant;
  size?: ButtonSize;
  fullWidth?: boolean;
}
