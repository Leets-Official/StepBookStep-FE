import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isSunday,
  isSaturday,
} from "date-fns";
import { ko } from "date-fns/locale";
import { XIcon } from "@/assets/icons";
import type { DatePickerProps } from "./DatePicker.types";
import * as Styles from "@/components/DatePicker/DatePicker.styles";

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  onClose,
  baseDate = new Date(),
}) => {
  const [currentMonth] = useState(selectedDate || baseDate);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <span className={Styles.title}>
          {format(currentMonth, "M월", { locale: ko })}
        </span>
        <button
          type="button"
          onClick={onClose}
          className={Styles.closeButton}
          aria-label="Close"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      <div className={Styles.weekDaysGrid}>
        {weekDays.map((day, index) => (
          <div key={day} className={Styles.weekDay(index)}>
            {day}
          </div>
        ))}
      </div>
      <div className={Styles.daysGrid}>
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const isToday = isSameDay(day, baseDate);

          return (
            <div key={day.toString()} className={Styles.dayCellWrapper}>
              {/* 오늘이면서 선택되지 않았을 때 표시 */}
              {isToday && !isSelected && (
                <span className={Styles.todayLabel}>오늘</span>
              )}

              <button
                type="button"
                onClick={() => isCurrentMonth && onChange(day)}
                disabled={!isCurrentMonth}
                className={Styles.dayButton(
                  isSelected,
                  isToday,
                  isCurrentMonth,
                  isSunday(day),
                  isSaturday(day)
                )}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};