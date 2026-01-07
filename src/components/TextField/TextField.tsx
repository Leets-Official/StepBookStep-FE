import React, { useState } from "react";
import type { TextFieldProps } from "./TextField.types";
import {
  wrapper,
  title,
  inputContainer,
  inputBase,
  inputVariants,
  withIconPadding,
  iconButton,
  helpText,
} from "./TextField.styles";
import { cn } from "@/utils/cn";

// 검색 아이콘 컴포넌트
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_494_380)">
      <path
        d="M10 2C14.4183 2 18 5.58172 18 10C18 11.8486 17.3703 13.5487 16.3174 14.9033L21.707 20.293C22.0976 20.6835 22.0976 21.3165 21.707 21.707C21.3165 22.0976 20.6835 22.0976 20.293 21.707L14.9033 16.3174C13.5487 17.3703 11.8486 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_494_380">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const TextField: React.FC<TextFieldProps> = ({
  title: titleText,
  helpText: helpTextContent,
  icon = true,
  onIconClick,
  className = "",
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(props.value || "");

  const hasValue = String(inputValue).length > 0;

  // 현재 상태에 따른 스타일 결정
  const getInputVariant = () => {
    if (disabled) return inputVariants.disabled;
    if (isFocused) return inputVariants.focus;
    if (hasValue) return inputVariants.filled;
    return inputVariants.default;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    props.onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  //KeyDown 핸들러 - Enter 입력 시 포커스 해제
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur(); // 포커스를 해제하여 Filled 상태로 전환
    }
    props.onKeyDown?.(e);
  };

  return (
    <div className={cn(wrapper, className)}>
      {/* Title 영역 */}
      {titleText && <label className={title}>{titleText}</label>}

      {/* Input 영역 */}
      <div className={inputContainer}>
        <input
          {...props}
          className={cn(
            inputBase,
            getInputVariant(),
            icon && withIconPadding
          )}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        {/* 검색 아이콘 */}
        {icon && (
          <button
            type="button"
            className={iconButton}
            onClick={onIconClick}
            disabled={disabled}
            tabIndex={-1}
          >
            <SearchIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Help Text 영역 */}
      {helpTextContent && (
        <span className={helpText}>{helpTextContent}</span>
      )}
    </div>
  );
};

export default TextField;