export interface DatePickerProps {
  /** 현재 선택된 날짜 (null일 수 있음) */
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  onClose: () => void;
  /** 달력의 기준이 되는 날짜 - 기본값은 금일임 */
  baseDate?: Date;
}
