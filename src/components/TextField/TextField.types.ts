import React from "react";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  title?: string;
  helpText?: string;
  icon?: boolean;
  onIconClick?: () => void;
}