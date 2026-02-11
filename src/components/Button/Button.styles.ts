import type { Variant, ButtonSize } from "@/components/Button/Button.types";

export const base =
  "inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-100";

export const sizes: Record<ButtonSize, string> = {
  large: "h-[48px] px-6 gap-[10px] text-button-lg text-inherit",
  medium: "h-[40px] px-5 gap-[10px] text-button-md text-inherit",
  small: "h-[32px] px-4 gap-[10px] text-button-sm text-inherit",
};

export const variants: Record<Variant, string> = {
  primary:
    "bg-purple-500 text-white border-transparent hover:bg-purple-400 active:bg-purple-600 disabled:bg-gray-200 disabled:text-gray-300",
  primaryOutline:
    "bg-white text-purple-600 border border-purple-100 hover:bg-purple-500/30 active:bg-purple-500 active:text-white disabled:bg-white disabled:text-gray-300 disabled:border-gray-200",
  secondary:
    "bg-lime-400 text-gray-900 border-transparent hover:bg-lime-300 active:bg-lime-500 disabled:bg-gray-200 disabled:text-gray-300",
  secondaryOutline:
    "bg-white text-lime-600 border border-lime-600 hover:bg-lime-50 hover:border-lime-400 active:bg-lime-400 active:text-black disabled:bg-white disabled:text-gray-300 disabled:border-gray-200 disabled:text-sm",
  ghost: "bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300",
};
