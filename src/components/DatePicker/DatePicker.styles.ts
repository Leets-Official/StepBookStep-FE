import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const container =
  "w-[280px] h-[320px] bg-gray-50 rounded-lg pt-[20px] px-[12px] pb-[12px] box-border flex flex-col items-center select-none font-sans";

export const header =
  "w-[256px] h-[24px] flex justify-between items-center mb-[24px] pl-[12px] pr-[8px] flex-shrink-0";

export const title = "text-black font-bold text-base leading-none";

export const closeButton =
  "w-[24px] h-[24px] text-gray-500 flex items-center justify-center hover:bg-gray-200 rounded transition-colors";

export const weekDaysGrid = "grid grid-cols-7 w-[240px] gap-[12px] mb-[10px]";

export const daysGrid = "grid grid-cols-7 gap-[12px] w-[240px]";

export const dayCellWrapper =
  "w-[24px] h-[24px] flex flex-col items-center justify-center relative";

export const todayLabel =
  "absolute -top-[10px] text-[8px] text-purple-500 font-medium leading-none whitespace-nowrap";

export const weekDay = (dayIndex: number) => {
  return cn(
    "w-[24px] h-[24px] flex items-center justify-center text-center text-xs font-semibold leading-4 tracking-normal",
    dayIndex === 0 && "text-error-dark",
    dayIndex === 6 && "text-gray-500",
    dayIndex !== 0 && dayIndex !== 6 && "text-gray-900"
  );
};

export const dayButton = (
  isSelected: boolean,
  isToday: boolean,
  isCurrentMonth: boolean,
  isSunday: boolean,
  isSaturday: boolean
) => {
  return cn(
    "w-[24px] h-[24px] flex items-center justify-center rounded-[4px] text-xs font-normal leading-4 tracking-normal transition-all relative z-10",
    // 이번 달이 아닌 경우
    !isCurrentMonth && "text-gray-300 pointer-events-none",
    // 이번 달이고 + 선택되지 않았고 + 오늘이 아닌 경우 
    isCurrentMonth &&
      !isSelected &&
      !isToday && [
        "hover:bg-gray-200",
        isSunday ? "text-error" : isSaturday ? "text-gray-500" : "text-gray-900",
      ],
    // 선택된 경우
    isSelected && "bg-purple-400 text-white",
    // 오늘이지만 선택되지 않은 경우
    isToday &&
      !isSelected &&
      "border border-purple-500 text-purple-500 bg-transparent box-border"
  );
};