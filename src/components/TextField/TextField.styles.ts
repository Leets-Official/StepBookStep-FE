export const wrapper = "flex flex-col gap-2 w-full";

export const title = "text-xs font-semibold leading-4 tracking-normal text-gray-900";

export const inputContainer = "relative w-full";

export const inputBase =
  "w-full h-12 px-6 rounded-full text-base transition-all duration-200 focus:outline-none placeholder:text-gray-300 disabled:cursor-not-allowed";

export const inputVariants = {
  // 기본 상태(active=false, focus=false)
  default: "border border-gray-300 bg-gray-50 text-gray-300",

  // 포커스 상태(active=false, focus=true)
  focus: "border border-gray-900 bg-gray-50 text-gray-900",

  // 값 입력 상태(active=true, focus=true)
  filled: "border border-gray-300 bg-gray-50 text-gray-900",

  // active=true, focus=false
  disabled: "border border-gray-300 bg-gray-50 text-gray-900",

  success: "border border-success bg-white text-gray-900 focus:border-success",

  error: "border border-error bg-white text-gray-900 focus:border-error",
};

export const withIconPadding = "pr-14";

export const iconButton =
  "absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer";

export const helpTextBase = "text-xs font-medium leading-4 tracking-normal whitespace-pre-line";

export const helpTextVariants = {
  default: "text-gray-500",
  error: "text-error",
  success: "text-success",
};
