import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./BookDetail.styles";
import AppBar from "@/components/AppBar/AppBar";
import { Tab } from "@/components/Tab/Tab";
import { Badge } from "@/components/Badge/Badge";
import BottomBar from "@/components/BottomBar/BottomBar";
import { ReadingStateDetail } from "@/components/ReadingStateDetail/ReadingStateDetail";
import { BookReport } from "@/components/BookReport/BookReport";
import type { BookReportData } from "@/components/BookReport/BookReport.types";
import GoalModal from "@/components/GoalModal/GoalModal";
import { Toast } from "@/components/Toast/Toast";

import { MOCK_BOOK_DETAIL } from "@/mocks/bookdetail.mock";
import { MOCK_READING_DATA } from "@/mocks/readingState.mock";

export default function BookDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"record" | "info">("record");
  
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const info = MOCK_BOOK_DETAIL;

  useEffect(() => {
    if (location.state?.showToast && location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setShowToast(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleAladinClick = () => {
    window.open(info.aladinUrl, "_blank");
  };

  const handlePenClick = () => {

  };

  const handleTimerClick = () => {
    navigate("/routine/timer");
  };

  function handleDirectClick() {
    setIsReportOpen(true);
  }

  const handleReportClose = () => {
    setIsReportOpen(false);
  };

  const handleReportSave = (data: BookReportData) => {
    console.log("저장된 독서 기록:", data);
    setIsReportOpen(false);
    setToastMessage("독서 기록이 저장되었습니다!");
    setShowToast(true);
  };

  const handleGoalOpen = () => {
    setIsGoalOpen(true);
  };

  const handleGoalClose = () => {
    setIsGoalOpen(false);
  };

  const handleGoalSave = () => {
    console.log("목표가 저장되었습니다!");
    setIsGoalOpen(false);
    setToastMessage("목표가 저장되었습니다!");
    setShowToast(true);
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
            onPenClick={handlePenClick}
            onTimerClick={handleTimerClick}
            onDirectClick={handleDirectClick}
            onGoalClick={handleGoalOpen}
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
                    className=" border-gray-300 text-gray-500"
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
          message={toastMessage} 
          isVisible={showToast} 
          onClose={() => setShowToast(false)}
          className="bottom-[80px] top-auto"
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

        {isGoalOpen && (
          <>
            <div 
              className={S.overlay}
              onClick={handleGoalClose}
            />
            <div className={S.modalContainer}>
              <GoalModal
                maxPages={info.totalPages}
                title="목표 수정하기"
                onClose={handleGoalClose}
                onSave={handleGoalSave}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
