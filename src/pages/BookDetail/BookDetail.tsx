import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SkeletonBookDetailBefore, SkeletonBookDetailReading } from "@/components/skeleton";

import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import { Badge } from "@/components/Badge/Badge";
import { Tab } from "@/components/Tab/Tab";
import { FullView } from "@/components/FullView/FullView";
import { ReadingStateDetail } from "@/components/ReadingStateDetail/ReadingStateDetail";
import { BookReport } from "@/components/BookReport/BookReport";
import type { BookReportData } from "@/components/BookReport/BookReport.types";
import GoalModal from "@/components/GoalModal/GoalModal";
import { Toast } from "@/components/Toast/Toast";

import { BOOK_DETAIL_MOCK } from "@/mocks/bookDetail.mock";
import type { ReadingStatus } from "@/mocks/bookDetail.mock";

import { MOCK_READING_DATA, MOCK_COMPLETED_DATA } from "@/mocks/readingState.mock";
import type { ReadingDetailData } from "@/mocks/readingState.mock";

import type { TabId } from "@/components/BottomBar/BottomBar.types";
import * as S from "./BookDetail.styles";
import EmptyBookDescription from "@/components/EmptyView/EmptyBookDescription";

type EntrySource = "home" | "search" | "routine" | "mypage";
type ContentTab = "record" | "info";

interface BookDetailProps {
  entrySource: EntrySource;
  readingStatus: ReadingStatus;
}

export default function BookDetail({ entrySource, readingStatus }: BookDetailProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isBefore = readingStatus === "before";
  const isLoading = false;

  const [activeTab, setActiveTab] = useState<ContentTab>("record");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (location.state?.showToast && location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setShowToast(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const resolvedActiveTab: ContentTab = isBefore ? "info" : activeTab;

  const readingDataMap: Record<Exclude<ReadingStatus, "before">, ReadingDetailData> = {
    reading: MOCK_READING_DATA,
    completed: MOCK_COMPLETED_DATA,
  };

  const readingData = isBefore ? null : readingDataMap[readingStatus];

  const bottomBarConfig: Record<EntrySource, { visible: boolean; activeTab: TabId }> = {
    home: { visible: true, activeTab: "home" },
    search: { visible: true, activeTab: "search" },
    routine: { visible: true, activeTab: "routine" },
    mypage: { visible: true, activeTab: "mypage" },
  };

  const bottomBar = bottomBarConfig[entrySource];

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handlePenClick = () => {
    if (isBefore) {
      setIsGoalModalOpen(true);
    }
  };

  const handleTimerClick = () => {
    navigate("/routine/timer");
  };

  const handleDirectClick = () => {
    setIsReportOpen(true);
  };

  const handleReportClose = () => {
    setIsReportOpen(false);
  };

  const handleReportSave = (data: BookReportData) => {
    setIsReportOpen(false);
    setToastMessage("독서 기록이 저장되었습니다!");
    setShowToast(true);
  };

  if (isLoading) {
    return (
      <div className={S.pageWrapper}>
        <div className={S.appFrame}>
          <AppBar
            mode="title"
            onBackClick={() => {}}
            isBookmarked={isBookmarked}
            onBookmarkClick={handleBookmarkClick}
            showPenDropdown={!isBefore}
            onPenClick={handlePenClick}
          />
          <main className={S.content}>
            {isBefore ? <SkeletonBookDetailBefore /> : <SkeletonBookDetailReading />}
          </main>
          {bottomBar.visible && (
            <BottomBar activeTab={bottomBar.activeTab} onTabSelect={() => {}} />
          )}
        </div>

        {isGoalModalOpen && (
          <GoalModal
            maxPages={BOOK_DETAIL_MOCK.totalPage}
            title="독서 목표 설정"
            onClose={() => setIsGoalModalOpen(false)}
            onSave={() => {
              setIsGoalModalOpen(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar
          mode="title"
          onBackClick={() => {}}
          isBookmarked={isBookmarked}
          onBookmarkClick={handleBookmarkClick}
          showPenDropdown={!isBefore}
          onPenClick={handlePenClick}
          onTimerClick={handleTimerClick}
          onDirectClick={handleDirectClick}
          onGoalClick={() => setIsGoalModalOpen(true)}
        />

        <main className={S.content}>
          <div className={S.coverWrapper}>
            <div className={S.coverImage} />
          </div>

          <section className={S.infoSection}>
            <Badge
              label={`Lv. ${BOOK_DETAIL_MOCK.level}`}
              type="level"
              className={S.getLevelBadgeClass(BOOK_DETAIL_MOCK.level)}
            />
            <h1 className={S.title}>{BOOK_DETAIL_MOCK.title}</h1>
            <p className={S.author}>{BOOK_DETAIL_MOCK.author}</p>
            <p className={S.meta}>
              {BOOK_DETAIL_MOCK.publisher} | {BOOK_DETAIL_MOCK.publishYear} |{" "}
              {BOOK_DETAIL_MOCK.totalPage}쪽
            </p>
            <p className={S.priceRow}>
              <span className={S.priceText}>{BOOK_DETAIL_MOCK.price.toLocaleString()}원</span>
              <a
                href={BOOK_DETAIL_MOCK.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className={S.storeLink}
              >
                알라딘에서 보기
              </a>
            </p>
          </section>

          <div className={S.tagRow}>
            {BOOK_DETAIL_MOCK.tags.map((tag) => (
              <Badge key={tag} label={tag} type="tag" className={S.tags} />
            ))}
          </div>

          <div className={S.divider} />

          {!isBefore && (
            <div className={S.tabRow}>
              <Tab
                label="독서 기록"
                isActive={resolvedActiveTab === "record"}
                onClick={() => setActiveTab("record")}
                className="flex-1"
              />
              <Tab
                label="도서 정보"
                isActive={resolvedActiveTab === "info"}
                onClick={() => setActiveTab("info")}
                className="flex-1"
              />
            </div>
          )}

          {isBefore && (
            <section>
              <h2 className={S.sectionTitle}>책 소개</h2>

              {BOOK_DETAIL_MOCK.description ? (
                <FullView collapsedHeight={134}>
                  <p className={S.description}>{BOOK_DETAIL_MOCK.description}</p>
                </FullView>
              ) : (
                <EmptyBookDescription />
              )}
            </section>
          )}

          {!isBefore && resolvedActiveTab === "record" && readingData && (
            <ReadingStateDetail data={readingData} />
          )}

          {!isBefore && resolvedActiveTab === "info" && (
            <section className="px-5">
              <h2 className={S.sectionTitle}>책 소개</h2>

              {BOOK_DETAIL_MOCK.description ? (
                <FullView collapsedHeight={72}>
                  <p className={S.description}>{BOOK_DETAIL_MOCK.description}</p>
                </FullView>
              ) : (
                <EmptyBookDescription />
              )}
            </section>
          )}
        </main>

        {bottomBar.visible && <BottomBar activeTab={bottomBar.activeTab} onTabSelect={() => {}} />}
      
        <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          className="bottom-[80px] top-auto"
        />

        {isReportOpen && (
          <>
            <div className={S.overlay} onClick={handleReportClose} />
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

      {isGoalModalOpen && (
        <GoalModal
          maxPages={BOOK_DETAIL_MOCK.totalPage}
          title="목표 설정하기"
          onClose={() => setIsGoalModalOpen(false)}
          onSave={() => {
            setIsGoalModalOpen(false);
            setToastMessage("목표가 저장되었습니다!");
            setShowToast(true);
          }}
        />
      )}
    </div>
  );
}
