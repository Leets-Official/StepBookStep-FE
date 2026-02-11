import React, { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { XIcon, CalendarIcon, StarEmptyIcon, StarFilledIcon } from "@/assets/icons";
import { StateCarousel } from "@/components/StateCarousel/StateCarousel";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import TextField from "@/components/TextField/TextField";
import type { ReadingStatus } from "@/components/StateCarousel/StateCarousel.types";
import type { BookReportProps } from "./BookReport.types";
import { useCreateReadingLog } from "@/hooks/useReadings";
import * as Styles from "./BookReport.styles";
import type { CreateReadingLogRequest } from "@/api/types";

type StarState = "FULL" | "HALF" | "EMPTY";

const StarIcon = ({ state }: { state: StarState }) => {
  if (state === "FULL") return <StarFilledIcon className={Styles.starBase} />;
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
  bookId,
  onClose,
  onSave,
  initialData,
  isTimerMode = false,
  totalPages = 0,
  goalMetric,
}) => {
  const [status, setStatus] = useState<ReadingStatus>(() => {
    const initial = initialData?.status || "READING";
    return initial === "BEFORE" ? "READING" : initial;
  });
  const [date, setDate] = useState<Date | null>(initialData?.date || new Date());
  const [pages, setPages] = useState<string>(initialData?.pages || "");
  const [duration, setDuration] = useState<string>(initialData?.duration || "");
  const [rating, setRating] = useState<number>(initialData?.rating || 0);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const createReadingLogMutation = useCreateReadingLog();

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsDatePickerOpen(false);
  };

  const handleSaveClick = async () => {
    let totalSeconds = 0;
    
    const hourMatch = duration.match(/(\d+)\s*시간/);
    const minuteMatch = duration.match(/(\d+)\s*분/);
    const secondMatch = duration.match(/(\d+)\s*초/);

    if (hourMatch || minuteMatch || secondMatch) {
      if (hourMatch) totalSeconds += parseInt(hourMatch[1]) * 3600;
      if (minuteMatch) totalSeconds += parseInt(minuteMatch[1]) * 60;
      if (secondMatch) totalSeconds += parseInt(secondMatch[1]);
    } else {
      const timeMatch = duration.match(/\d+/g);
      if (timeMatch) {
        if (timeMatch.length === 3) {
          totalSeconds =
            parseInt(timeMatch[0]) * 3600 + parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]);
        } else if (timeMatch.length === 2) {
          totalSeconds = parseInt(timeMatch[0]) * 60 + parseInt(timeMatch[1]);
        } else if (timeMatch.length === 1) {
          totalSeconds = parseInt(timeMatch[0]) * 60;
        }
      }
    }

    const statusMap: Record<ReadingStatus, "READING" | "FINISHED" | "STOPPED"> = {
      BEFORE: "READING",
      READING: "READING",
      AFTER: "FINISHED",
      STOP: "STOPPED",
    };

    try {
      let finalReadQuantity = parseInt(pages, 10) || 0;
      if (statusMap[status] === "FINISHED" && finalReadQuantity === 0 && totalPages > 0) {
        finalReadQuantity = totalPages;
      }
      if (finalReadQuantity < 1) finalReadQuantity = 1;

      const requestData: CreateReadingLogRequest = {
        bookStatus: statusMap[status],
        recordDate: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        durationSeconds: totalSeconds > 0 ? totalSeconds : undefined,
        readQuantity: finalReadQuantity,
        rating: status === "AFTER" || status === "STOP" ? rating : undefined,
      };
      const response = await createReadingLogMutation.mutateAsync({
        bookId: Number(bookId),
        data: requestData,
      });

      if (onSave) {
        onSave({
          status,
          date,
          pages,
          duration,
          rating,
          finishedCount: response.finishedCount,
        });
      }
      onClose?.();
    } catch (error) {
      alert("독서 기록 저장에 실패했습니다.");
    }
  };

  const isInputMode = status === "READING";
  const isRatingMode = status === "AFTER" || status === "STOP";

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.mainContainer}>
        <div className={Styles.header}>
          <h2 className={Styles.headerTitle}>독서 기록하기</h2>
          <button type="button" onClick={onClose} className={Styles.closeButton} aria-label="닫기">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

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
                  {format(date, "yyyy. MM. dd", { locale: ko })}
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
              {(isTimerMode || goalMetric === "TIME") && (
                <TextField
                  title="얼마나 걸렸나요?"
                  placeholder="예: 30분"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  icon={false}
                  disabled={isTimerMode}
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
        <button
          type="button"
          onClick={handleSaveClick}
          className={Styles.saveButton}
          disabled={createReadingLogMutation.isPending}
        >
          {createReadingLogMutation.isPending ? "저장 중..." : "저장하기"}
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
