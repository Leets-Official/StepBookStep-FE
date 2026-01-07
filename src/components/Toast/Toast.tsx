import { Checkbox } from "@/components/Checkbox/Checkbox";
import { cn } from "@/utils/cn";
import type { ToastProps } from "./Toast.types";
import { toastBase, toastText } from "./Toast.styles";

export const Toast = ({ label, checked, onToggle }: ToastProps) => {
  return (
    <div className={cn(toastBase)} onClick={onToggle}>
      <Checkbox checked={checked} onToggle={() => {}} />
      <span className={toastText}>{label}</span>
    </div>
  );
};