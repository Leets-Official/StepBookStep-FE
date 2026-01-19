import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const styles = {
  container: "w-[280px] h-[320px] bg-gray-50 rounded-lg pt-[20px] px-[12px] pb-[12px]  box-border flex flex-col items-center select-none font-sans",

  header: "w-[256px] h-[24px] flex justify-between items-center mb-[24px] pl-[12px] pr-[8px] flex-shrink-0",

  title: "text-[#0F0F0F] font-bold text-base leading-none",

  closeButton: "w-[24px] h-[24px] text-gray-500 flex items-center justify-center hover:bg-gray-200 rounded transition-colors",

  weekDaysGrid: "grid grid-cols-7 w-[240px] gap-[12px] mb-[10px]",
  
  weekDay: (dayIndex: number) => cn(
    "w-[24px] h-[24px] flex items-center justify-center text-center text-xs font-semibold leading-4 tracking-normal",
    dayIndex === 0 && "text-[#D82727]", 
    dayIndex === 6 && "text-gray-500",  
    dayIndex !== 0 && dayIndex !== 6 && "text-gray-900" 
  ),

  daysGrid: "grid grid-cols-7 gap-[12px] w-[240px]",

  dayCellWrapper: "w-[24px] h-[24px] flex flex-col items-center justify-center relative",

  todayLabel: "absolute -top-[10px] text-[8px] text-purple-500 font-medium leading-none whitespace-nowrap",

  dayButton: (
    isSelected: boolean,
    isToday: boolean,
    isCurrentMonth: boolean,
    isSunday: boolean,
    isSaturday: boolean
  ) => cn(
    "w-[24px] h-[24px] flex items-center justify-center rounded-[4px] text-xs font-normal leading-4 tracking-normal transition-all relative z-10",

    !isCurrentMonth && "text-gray-300 pointer-events-none",

    isCurrentMonth && !isSelected && !isToday && [
      "hover:bg-gray-200",
      isSunday ? "text-[#D82727]" : isSaturday ? "text-gray-500" : "text-gray-900"
    ],

    isSelected && "bg-purple-400 text-white ",

    isToday && !isSelected && "border border-purple-500 text-purple-500 bg-transparent box-border"
  ),
};
