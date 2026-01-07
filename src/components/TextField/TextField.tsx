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
import { SearchIcon } from "@/assets/icons";


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
            <SearchIcon />
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