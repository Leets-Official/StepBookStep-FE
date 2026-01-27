import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./RoutineWrite.styles";
import AppBar from "@/components/AppBar/AppBar";
import { Tab } from "@/components/Tab/Tab";
import { Badge } from "@/components/Badge/Badge";
import BottomBar from "@/components/BottomBar/BottomBar";
import { ReadingStateDetail } from "@/components/ReadingStateDetail/ReadingStateDetail";
import { BookReport } from "@/components/BookReport/BookReport";
import type { BookReportData } from "@/components/BookReport/BookReport.types";
import { Toast } from "@/components/Toast/Toast";

import { MOCK_BOOK_DETAIL } from "@/mocks/bookdetail.mock";
import { MOCK_READING_DATA } from "@/mocks/readingState.mock";

export default function RoutineWritePage() {
  const [activeTab, setActiveTab] = useState<"record" | "info">("record");
  const [isReportOpen, setIsReportOpen] = useState(true); 
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const info = MOCK_BOOK_DETAIL;

  useEffect(() => {
    setIsReportOpen(true);
  }, []);

  const handleAladinClick = () => {
    window.open(info.aladinUrl, "_blank");
  };

  const handleReportClose = () => {
    setIsReportOpen(false);
    navigate(-1);
  };

  const handleReportSave = (data: BookReportData) => {
    console.log("저장된 독서 기록:", data);
    setIsReportOpen(false);
    setShowToast(true);
    setTimeout(() => {
      navigate("/bookdetail");
    }, 2000);
  };

  const handleDirectRecordClick = () => {
    setIsReportOpen(true);
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <div className={S.headerGroup}>
          <div className={S.statusBar} />
          <AppBar 
            mode="title" 
            title="" 
            onBackClick={() => window.history.back()}
            onPenClick={handleDirectRecordClick}
          />
        </div>

        <main className={S.content}>
          <section className={S.coverBgSection}>
            <div className={S.coverPlaceholder} />
          </section>

          <section className={S.infoSection}>
            <div className="mb-2">
              <Badge 
                label={info.level} 
                type="level" 
                className="bg-purple-50 border-purple-400 text-purple-800" 
              />
            </div>
            
            <h1 className={S.title}>{info.title}</h1>
            <p className={S.authorText}>{info.author}</p>
            <p className={S.metaText}>
              {info.publisher} | {info.publishedYear} | {info.totalPages}쪽
            </p>

            <div className={S.priceRow}>
              <span className={S.priceLabel}>{info.price}원</span>
              <button onClick={handleAladinClick} className={S.aladinLink}>
                알라딘에서 보기
              </button>
            </div>

            <div className={S.tagList}>
              {info.tags.map((tag, idx) => (
                <Badge 
                  key={idx} 
                  label={tag} 
                  type="tag"
                  className="border-gray-300 text-gray-500"
                />
              ))}
            </div>

            <hr className={S.divider} />

            <nav className={S.tabContainer}>
              <div className="flex-1 flex justify-center">
                <Tab 
                  label="독서 기록" 
                  isActive={activeTab === "record"} 
                  onClick={() => setActiveTab("record")} 
                  className="w-[167.5px]"
                />
              </div>
              <div className="flex-1 flex justify-center">
                <Tab 
                  label="도서 정보" 
                  isActive={activeTab === "info"} 
                  onClick={() => setActiveTab("info")} 
                  className="w-[167.5px]"
                />
              </div>
            </nav>

            <div className="mt-2">
              {activeTab === "record" ? (
                <ReadingStateDetail data={MOCK_READING_DATA} />
              ) : (
                <div className="py-20 text-center text-gray-400">
                  도서 상세 정보 준비 중입니다.
                </div>
              )}
            </div>
          </section>
        </main>

        <div className={S.bottomBarContainer}>
          <BottomBar activeTab="routine" onTabSelect={(id) => {id}} />
        </div>

        <Toast 
          message="독서 기록이 저장되었습니다!" 
          isVisible={showToast} 
          onClose={() => setShowToast(false)}
          className="bottom-[70px] top-auto"
        />

        {isReportOpen && (
          <>
            <div 
              className={S.overlay}
              onClick={handleReportClose}
            />
            <div className={S.reportContainer}>
              <BookReport
                onClose={handleReportClose}
                onSave={handleReportSave}
                isTimerMode={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
