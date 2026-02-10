import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Timer.styles";
import AppBar from "@/components/AppBar/AppBar";
import Button from "@/components/Button/Button";
import { PlayIcon, PauseIcon } from '@/assets/icons';
import { BookReport } from "@/components/BookReport/BookReport";
import type { BookReportData } from "@/components/BookReport/BookReport.types";
import { useParams } from "react-router-dom";
import { useBookDetail, useRoutines } from "@/hooks/useReadings";

export type TimerStatus = "ready" | "running" | "paused" | "finished";

export default function TimerPage() {
  const { bookId } = useParams();
  const { data: bookData } = useBookDetail(Number(bookId));
  const { data: routines } = useRoutines();

  const currentRoutine = routines?.find(r => r.bookId === Number(bookId));

  const targetSeconds = currentRoutine?.metric === "TIME" 
    ? currentRoutine.targetAmount * 60 
    : 0;

  const [status, setStatus] = useState<TimerStatus>("ready");
  const [seconds, setSeconds] = useState(0);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // 1. 한국어 포맷 함수 
  const formatKoreanTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}분 ${s.toString().padStart(2, "0")}초`;
};

  const bookInfo = bookData?.bookInfo || {
    title: "로딩 중...",
    author: "로딩 중..."
  };

  const handleSave = () => {
    setIsReportOpen(true);
  };

  const handleReportClose = () => {
    setIsReportOpen(false);
  };

  const handleReportSave = (data: BookReportData) => {
    console.log("저장된 독서 기록:", data);
    setIsReportOpen(false);
    navigate("/routine/booklist", { 
      state: { 
        showToast: true, 
        toastMessage: "독서 기록이 저장되었습니다!" 
      } 
    });
  };

  const clearCurrentTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  useEffect(() => {
    if (status === "running") {
      timerRef.current = window.setInterval(() => setSeconds(prev => prev + 1), 1000);
    } else {
      clearCurrentTimer();
    }
    return () => clearCurrentTimer();
  }, [status]);

  const hasReachedTarget = seconds >= targetSeconds;
  const hasReachedDouble = seconds >= targetSeconds * 2;

  const baseCircleColor = currentRoutine?.metric === "PAGE" 
  ? "#A9AAFB"
  : hasReachedTarget ? "#91D654" : "#A9AAFB";

  const progressColor = hasReachedTarget ? "#4931D4" : "#91D654";
  const radius = 155; 
  const circumference = 2 * Math.PI * radius;

  let strokeDashoffset: number;
  if (hasReachedDouble) {
    strokeDashoffset = 0;
  } else if (hasReachedTarget) {
    const currentProgress = seconds % targetSeconds;
    strokeDashoffset = circumference - (currentProgress / targetSeconds * circumference);
  } else {
    strokeDashoffset = circumference - (seconds / targetSeconds * circumference);
  }

    const isResetMoment = seconds === targetSeconds;
  
    return (
      <div className={S.pageWrapper}>
        <div className={S.appFrame}>
          <header className="flex flex-col w-full z-50 bg-white">
            <div className={S.statusBar} />
            <AppBar mode="none" title="타이머로 기록하기" onBackClick={() => window.history.back()} />
          </header>
  
          <main className={S.content}>
            <div className={S.timerCircleContainer}>
              <svg className={S.svgContainer} viewBox="0 0 335 335">
                <circle cx="167.5" cy="167.5" r={radius} fill="none" stroke={baseCircleColor} strokeWidth="8" />
                
                {status !== "ready" && currentRoutine?.metric === "TIME" && (
                  <circle 
                    cx="167.5" cy="167.5" r={radius} fill="none" 
                    stroke={progressColor} strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      transition: isResetMoment ? "none" : (hasReachedDouble ? "stroke-dashoffset 0.5s ease-out" : "stroke-dashoffset 1s linear")
                    }}
                  />
                )}
              </svg>
  
              <div className={S.timerTextContent}>
                <span className={S.statusLabel}>
                  {currentRoutine?.metric === "TIME" && hasReachedTarget && status !== "finished" && "목표를 달성했어요!"}
                  {status === "finished" && "끝났어요!"}
                </span>
                
                <h1 className={S.digitalTime}>{formatTime(seconds)}</h1>
                
                <div className={S.iconWrapper}>
                  {(status === "running" || status === "ready") ? (
                    <PauseIcon className={`${S.controlIcon} ${ status === "ready" ? 'text-gray-300 cursor-not-allowed pointer-events-none' : 'text-purple-500'}`} onClick={() => setStatus("paused")} />
                  ) : (
                    <PlayIcon 
                      className={`${S.controlIcon} ${status === "finished" ? 'text-gray-300 cursor-not-allowed pointer-events-none' : 'text-purple-500'}`}
                      onClick={() => setStatus("running")}
                    />
                  )}
                </div>
              </div>
            </div>
  
            <div className={S.bookInfoContainer}>
              <p className={S.bookTitle}>{bookInfo.title}</p>
              <p className={S.bookAuthor}>{bookInfo.author}</p>
            </div>
          </main>
  
          <footer className={S.footer}>
            {status === "ready" && <Button label="시작하기" fullWidth onClick={() => setStatus("running")} />}
            {(status === "paused" || status ==="running") && (
              <>
                <Button label="재설정" variant="primaryOutline" className="flex-1" onClick={() => { setSeconds(0); setStatus("ready"); }} />
                <Button label="종료" variant="primary" className="flex-1" onClick={() => setStatus("finished")} />
              </>
            )}
            {status === "finished" && <Button label="기록 저장하기" fullWidth onClick={handleSave} />}
          </footer>
  
          {isReportOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300"
                onClick={handleReportClose}
              />
              <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[101] animate-[slideUp_0.3s_ease-out]">
                <BookReport
                  bookId={Number(bookId)}
                  onClose={handleReportClose}
                  onSave={handleReportSave}
                  isTimerMode={true}
                  initialData={{
                    duration: formatKoreanTime(seconds)
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
