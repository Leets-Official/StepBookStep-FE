import { useState, useEffect, useRef } from "react";
import * as S from "./Timer.styles";
import AppBar from "@/components/AppBar/AppBar";
import Button from "@/components/Button/Button";
import { PlayIcon, PauseIcon } from '@/assets/icons';

type TimerStatus = "ready" | "running" | "paused" | "finished";

export default function TimerPage() {
  const [status, setStatus] = useState<TimerStatus>("ready");
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  const targetSeconds = 5; 

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

  const baseCircleColor = hasReachedTarget ? "#91D654" : "#A9AAFB";

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

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <div className={S.headerGroup}>
          <div className={S.statusBar} />
          <AppBar mode="none" title="타이머로 기록하기" onBackClick={() => window.history.back()} />
        </div>

        <main className={S.content}>
          <div className={S.timerCircleContainer}>
            <svg className={S.svgContainer} viewBox="0 0 335 335">
              <circle cx="167.5" cy="167.5" r={radius} fill="none" stroke={baseCircleColor} strokeWidth="12" />
              
              {status !== "ready" && (
                <circle 
                  cx="167.5" cy="167.5" r={radius} fill="none" 
                  stroke={progressColor} strokeWidth="12"
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
                {hasReachedTarget && status !== "finished" && "목표를 달성했어요!"}
                {status === "finished" && "끝났어요!"}
              </span>
              
              <h1 className={S.digitalTime}>{formatTime(seconds)}</h1>
              
              <div className="flex justify-center items-center h-14">
                {status === "running" ? (
                  <PauseIcon className={`${S.controlIcon} text-gray-300`} onClick={() => setStatus("paused")} />
                ) : (
                  <PlayIcon 
                    className={`${S.controlIcon} ${status === 'ready' ? 'text-gray-300' : status === "finished" ? 'text-gray-300' : 'text-purple-500'}`} 
                    onClick={() => setStatus("running")} 
                  />
                )}
              </div>
            </div>
          </div>

          <div className={S.bookInfoContainer}>
            <p className={S.bookTitle}>제목은두줄넘어가면안보이게설정해야해...</p>
            <p className={S.bookAuthor}>지은이, 옮긴이</p>
          </div>
        </main>

        <footer className={S.footer}>
          {status === "ready" && <Button label="시작하기" fullWidth onClick={() => setStatus("running")} />}
          {status === "running" && <Button label="종료하기" fullWidth onClick={() => setStatus("finished")} />}
          {status === "paused" && (
            <>
              <Button label="재설정" variant="primaryOutline" className="flex-1" onClick={() => { setSeconds(0); setStatus("ready"); }} />
              <Button label="종료" variant="primary" className="flex-1" onClick={() => setStatus("finished")} />
            </>
          )}
          {status === "finished" && <Button label="기록 저장하기" fullWidth onClick={() => alert("저장!")} />}
        </footer>
      </div>
    </div>
  );
}
