import React from "react";
import type { ButtonProps } from "./Button.types";
import { base, variants, sizes } from "./Button.styles"; 
import { cn } from "@/utils/cn"; 

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "large",
  className = "",
  disabled,
  fullWidth,
  ...props
}) => {
  const cls = cn(
    base,
    sizes[size],  
    variants[variant], 
    fullWidth && "w-full",
    className
  );

  return (
    <button className={cls} disabled={disabled} {...props}>
      <span>{label}</span>
    </button>
  );
};

export default Button;