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
  helpTextBase,
  helpTextVariants,
} from "./TextField.styles";
import { cn } from "@/utils/cn";
import { AlertCircleIcon, CheckIcon, SearchIcon } from "@/assets/icons";

export const TextField: React.FC<TextFieldProps> = ({
  title: titleText,
  helpText: helpTextContent,
  icon = true,
  onIconClick,
  className = "",
  disabled = false,
  state = "default",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(props.value || "");

  const hasValue = String(inputValue).length > 0;

  const getInputVariant = () => {
    if (disabled) return inputVariants.disabled;
    if (state === "success") return inputVariants.success;
    if (state === "error") return inputVariants.error;
    if (isFocused) return inputVariants.focus;
    if (hasValue) return inputVariants.filled;
    return inputVariants.default;
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (state === "success") {
      return <CheckIcon className="text-[#0530EE]" />;
    }
    if (state === "error") {
      return <AlertCircleIcon className="text-error" />;
    }

    return <SearchIcon className="text-gray-500" />;
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
    props.onKeyDown?.(e);
  };

  return (
    <div className={cn(wrapper, className)}>
      {titleText && <label className={title}>{titleText}</label>}

      <div className={inputContainer}>
        <input
          {...props}
          className={cn(inputBase, getInputVariant(), icon && withIconPadding)}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        {icon && (
          <button
            type="button"
            className={iconButton}
            onClick={onIconClick}
            disabled={disabled}
            tabIndex={-1}
          >
            {renderIcon()}
          </button>
        )}
      </div>

      {helpTextContent && (
        <span className={cn(helpTextBase, helpTextVariants[state])}>{helpTextContent}</span>
      )}
    </div>
  );
};

export default TextField;
