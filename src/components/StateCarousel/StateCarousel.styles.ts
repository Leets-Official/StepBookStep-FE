import type{ ReadingStatus, StateConfig } from "@/components/StateCarousel/StateCarousel.types";

export const STATE_CONFIGS: Record<ReadingStatus, StateConfig> = {
  BEFORE: {
    label: "읽고 싶은",
    value: "BEFORE",
    textColor: "text-purple-400",
  },
  READING: {
    label: "읽는 중",
    value: "READING",
    textColor: "text-purple-500",
  },
  AFTER: {
    label: "완독!",
    value: "AFTER",
    textColor: "text-purple-800",
  },
  STOP: {
    label: "중단한",
    value: "STOP",
    textColor: "text-gray-500",
  },
};

export const CAROUSEL_ORDER: ReadingStatus[] = ["BEFORE", "READING", "AFTER", "STOP"];

// 공통 스타일
export const styles = {
  container: "relative flex items-center justify-between w-[335px] h-[48px] bg-gray-50 rounded-[999px] border border-gray-300 px-[2px] py-0 select-none",
  
  textBase: "font-semibold text-lg leading-tight tracking-[0%] text-center", // Title 2 Typography
  
  iconButton: "flex items-center justify-center w-[44px] h-[44px] p-2 cursor-pointer transition-colors duration-200",
};
