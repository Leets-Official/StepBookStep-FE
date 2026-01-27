import { useEffect } from "react";
import { CheckIcon } from "@/assets/icons"; 
import { cn } from "@/utils/cn";
import { toastBase, toastText } from "@/components/Toast/Toast.styles";
import type { ToastProps } from "@/components/Toast/Toast.types";

export const Toast = ({ message, isVisible, onClose, duration = 3000, className }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={cn(toastBase, "fixed top-5 left-1/2 -translate-x-1/2 z-[9999]", className)}>
      {/* 1. 체크 표시 (완료되었다는 의미) */}
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4931D4]">
        <CheckIcon className="w-3 h-3 text-white" />
      </div>

      {/* 2. 메세지 */}
      <span className={toastText}>{message}</span>
    </div>
  );
};
