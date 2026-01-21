import React, { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { XIcon, CalendarIcon, StarEmptyIcon, StarFilledIcon } from "@/assets/icons";
import { StateCarousel } from "@/components/StateCarousel/StateCarousel";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import TextField from "@/components/TextField/TextField";
import type { ReadingStatus } from "@/components/StateCarousel/StateCarousel.types";
import type { BookReportProps } from "./BookReport.types";
import * as Styles from "./BookReport.styles";

type StarState = "FULL" | "HALF" | "EMPTY";

const StarIcon = ({ state }: { state: StarState }) => {
  if (state === "FULL") {
    return <StarFilledIcon className={Styles.starBase} />;
  }

  if (state === "HALF") {
    return (
      <div className={Styles.starWrapper}>
        <StarEmptyIcon className={`absolute top-0 left-0 ${Styles.starBase}`} />
        <div className={Styles.starHalfOverlay}>
          <StarFilledIcon className={Styles.starBase} />
        </div>
      </div>
    );
  }

  return <StarEmptyIcon className={Styles.starBase} />;
};

export const BookReport: React.FC<BookReportProps> = ({
  onClose,
  onSave,
  initialData,
  isTimerMode = false,
}) => {
  const [status, setStatus] = useState<ReadingStatus>(initialData?.status || "READING");
  const [date, setDate] = useState<Date | null>(initialData?.date || null);
  const [pages, setPages] = useState<string>(initialData?.pages || "");
  const [duration, setDuration] = useState<string>(initialData?.duration || "");
  const [rating, setRating] = useState<number>(initialData?.rating || 0);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsDatePickerOpen(false);
  };

  const handleSaveClick = () => {
    if (onSave) {
      let cleanDuration = duration;
      let cleanPages = pages;
      let cleanRating = rating;

      // 읽기 전이면 기록 데이터 모두 초기화
      if (status === "BEFORE") {
        cleanDuration = "";
        cleanPages = "";
        cleanRating = 0;
      }

      if (status === "AFTER" || status === "STOP") {
        cleanDuration = "";
        cleanPages = ""; // 만약 완독 시에도 쪽수를 저장해야 한다면 이 줄은 삭제
      }

      if (status === "READING") {
        cleanRating = 0;
      }

      onSave({
        status,
        date,
        pages: cleanPages,
        duration: cleanDuration,
        rating: cleanRating,
      });
    }
  };

  const isInputMode = status === "BEFORE" || status === "READING";
  const isRatingMode = status === "AFTER" || status === "STOP";

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.mainContainer}>
        {/* Header */}
        <div className={Styles.header}>
          <h2 className={Styles.headerTitle}>독서 기록하기</h2>
          <button type="button" onClick={onClose} className={Styles.closeButton} aria-label="닫기">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form Fields */}
        <div className={Styles.formGroup}>
          <div className={Styles.inputBlock}>
            <span className={Styles.label}>독서 상태</span>
            <StateCarousel initialStatus={status} onChange={setStatus} />
          </div>

          <div className={Styles.inputBlock}>
            <span className={Styles.label}>기록일</span>
            <div
              className={Styles.dateInput}
              onClick={() => setIsDatePickerOpen(true)}
              role="button"
              tabIndex={0}
            >
              {date ? (
                <span className={Styles.dateValue}>
                  {format(date, "yyyy.MM.dd", { locale: ko })}
                </span>
              ) : (
                <span className={Styles.datePlaceholder}>날짜를 선택해 주세요</span>
              )}
              <CalendarIcon className="w-6 h-6 text-gray-500" />
            </div>
          </div>

          {isInputMode && (
            <>
              <TextField
                title="어디까지 읽었나요?"
                placeholder="쪽수를 입력해 주세요"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                inputMode="numeric"
                icon={false}
              />
              {isTimerMode && (
                <TextField
                  title="얼마나 걸렸나요?"
                  placeholder="시간을 입력해 주세요"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  icon={false}
                />
              )}
            </>
          )}

          {isRatingMode && (
            <div className={Styles.inputBlock}>
              <span className={Styles.label}>난이도는 어땠나요?</span>
              <div className={Styles.starContainer}>
                {[1, 2, 3, 4, 5].map((index) => {
                  let starState: StarState = "EMPTY";
                  if (rating >= index) starState = "FULL";
                  else if (rating === index - 0.5) starState = "HALF";

                  return (
                    <div key={index} className={Styles.starInteractiveContainer}>
                      <StarIcon state={starState} />
                      <div
                        className={Styles.starClickLeft}
                        onClick={() => setRating(index - 0.5)}
                        aria-label={`${index - 0.5}점`}
                      />
                      <div
                        className={Styles.starClickRight}
                        onClick={() => setRating(index)}
                        aria-label={`${index}점`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={Styles.saveButtonContainer}>
        <button type="button" onClick={handleSaveClick} className={Styles.saveButton}>
          저장하기
        </button>
      </div>

      <div className={Styles.bottomSpacer} />

      {isDatePickerOpen && (
        <div className={Styles.datePickerOverlay}>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <DatePicker
              selectedDate={date}
              onChange={handleDateSelect}
              onClose={() => setIsDatePickerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookReport;
