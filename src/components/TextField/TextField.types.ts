import React from "react";

export type TextFieldState = "default" | 'error' | 'success';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  title?: string;
  helpText?: string;
  icon?: boolean;
  onIconClick?: () => void;
  state?: TextFieldState;
}