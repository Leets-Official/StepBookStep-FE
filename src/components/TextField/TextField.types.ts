import React, { type ReactNode } from "react";

export type TextFieldState = "default" | "error" | "success";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  title?: string;
  helpText?: ReactNode;
  icon?: boolean;
  onIconClick?: () => void;
  state?: TextFieldState;
}
