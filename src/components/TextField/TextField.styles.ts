export const wrapper = "flex flex-col gap-2 w-full";

export const title =
  "font-['Pretendard'] text-[12px] font-semibold leading-[16px] tracking-[0%] text-gray-900";

export const inputContainer = "relative w-full";

export const inputBase =
  "w-full h-12 px-6 rounded-full transition-all duration-200 focus:outline-none disabled:cursor-not-allowed " +
  "font-['Pretendard'] text-[14px] font-normal leading-[20px] tracking-[0%] " +
  "text-gray-900 placeholder:text-gray-300";

export const inputVariants = {
  default: "border border-gray-300 bg-gray-50",
  focus: "border border-gray-900 bg-gray-50",
  filled: "border border-gray-300 bg-gray-50",
  disabled: "border border-gray-300 bg-gray-100",
  success: "border border-success bg-white focus:border-success",
  error: "border border-error bg-white focus:border-error",
};

export const withIconPadding = "pr-14";

export const iconButton =
  "absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer";

export const helpTextBase = "text-xs font-normal leading-4 tracking-normal whitespace-pre-line";

export const helpTextVariants = {
  default: "text-gray-500",
  error: "text-error",
  success: "text-success",
};
