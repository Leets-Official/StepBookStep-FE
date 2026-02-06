import { addBookmark, removeBookmark } from "@/api/books";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SkeletonBookDetailBefore, SkeletonBookDetailReading } from "@/components/skeleton";

import { useParams } from "react-router-dom";
import { useBookDetail } from "@/hooks/useReadings";
import { useRoutines } from "@/hooks/useReadings";

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
import { FinishedModal } from "./components/FinishedModal/FinishedModal";
import { useFinishedBookCount } from "@/hooks/useFinishedBookCount";

import { useBookStore } from "@/stores/useBookStore";
import type { ReadStatus } from "../MyPage/MyPage.types";

import { BOOK_DETAIL_MOCK } from "@/mocks/bookDetail.mock";
import type { ReadingStatus } from "@/mocks/bookDetail.mock";
import type { TabId } from "@/components/BottomBar/BottomBar.types";

import * as S from "./BookDetail.styles";
import EmptyBookDescription from "@/components/EmptyView/EmptyBookDescription";

export type EntrySource = "home" | "search" | "routine" | "mypage";
type ContentTab = "record" | "info";

interface BookDetailProps {
  entrySource: EntrySource;
  readingStatus: ReadingStatus;
}

export function BookDetail({ entrySource, readingStatus }: BookDetailProps) {
  const finishedBookCount = useFinishedBookCount();
  const { bookId } = useParams();
  const { data: bookData, isLoading: isBookLoading } = useBookDetail(Number(bookId));
  
  const { data: routines } = useRoutines();
  
  const navigate = useNavigate();
  const location = useLocation();
  const { updateBookStatus } = useBookStore();

  const isBefore = readingStatus === "before";
  const isLoading = isBookLoading;

  const bookInfo = bookData?.bookInfo || BOOK_DETAIL_MOCK;

  const currentGoal = routines?.find((r) => r.bookId === Number(bookId));

  const [activeTab, setActiveTab] = useState<ContentTab>("record");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // location.state?.isBookmarked가 있으면 우선 적용
    if (location.state && typeof location.state.isBookmarked === 'boolean') {
      setIsBookmarked(location.state.isBookmarked);
    } else if (bookData) {
      setIsBookmarked(bookData.bookmarked ?? false);
    }
  }, [bookData, location.state]);

  useEffect(() => {
    if (location.state?.showToast && location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setShowToast(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const resolvedActiveTab: ContentTab = isBefore ? "info" : activeTab;

  const bottomBarConfig: Record<EntrySource, { visible: boolean; activeTab: TabId }> = {
    home: { visible: true, activeTab: "home" },
    search: { visible: true, activeTab: "search" },
    routine: { visible: true, activeTab: "routine" },
    mypage: { visible: true, activeTab: "mypage" },
  };

  const bottomBar = bottomBarConfig[entrySource];

  const handleSaveRecord = (data: BookReportData) => {
    const statusMap: Record<string, ReadStatus> = {
      READING: "READING",
      AFTER: "FINISHED",
      FINISHED: "FINISHED",
      BEFORE: "BOOKMARKED",
      STOP: "STOPPED",
    };

    const mappedStatus = statusMap[data.status] || "READING";
    updateBookStatus(Number(bookId), mappedStatus, data.rating);

    const isFinished = data.status === "AFTER";

    setIsReportOpen(false);

    if (isFinished) {
      setTimeout(() => {
        setIsFinishedModalOpen(true);
      }, 300);
    } else {
      setTimeout(() => {
        setToastMessage("독서 기록이 저장되었습니다!");
        setShowToast(true);
      }, 300);
    }
  };

  const handleBookmarkClick = async () => {
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);

    try {
      if (newStatus) {
        await addBookmark(Number(bookId));
        setToastMessage("북마크에 저장되었습니다.");
      } else {
        await removeBookmark(Number(bookId));
        setToastMessage("북마크가 해제되었습니다.");
      }
      setShowToast(true);
    } catch (error) {
      console.error("북마크 변경 실패:", error);

      setIsBookmarked(!newStatus);
      setToastMessage("오류가 발생했습니다. 다시 시도해 주세요.");
      setShowToast(true);
    }
  };

  const handlePenClick = () => {
    if (isBefore) {
      setIsGoalModalOpen(true);
    }
  };

  const handleTimerClick = () => {
    navigate(`/routine/timer/${bookId}`);
  };

  const handleDirectClick = () => {
    setIsReportOpen(true);
  };

  const handleReportClose = () => {
    setIsReportOpen(false);
  };

  if (isLoading) {
    return (
      <div className={S.pageWrapper}>
        <div className={S.appFrame}>
          <AppBar
            mode="title"
            onBackClick={() => navigate(-1)}
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
      </div>
    );
  }

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar
          mode="title"
          onBackClick={() => navigate(-1)}
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
            <div
              className={S.coverImage}
              style={{
                backgroundImage: `url(${bookData?.bookInfo?.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          <section className={S.infoSection}>
            <Badge
              label={`Lv. ${bookInfo.level}`}
              type="level"
              className={S.getLevelBadgeClass(bookInfo.level)}
            />
            <h1 className={S.title}>{bookInfo.title}</h1>
            <p className={S.author}>{bookInfo.author}</p>
            <p className={S.meta}>
              {bookInfo.publisher} | {bookData?.bookInfo?.pubDate} | {bookInfo.totalPage}쪽
            </p>
            <p className={S.priceRow}>
              <span className={S.priceText}>
                {bookData?.bookInfo?.priceStandard?.toLocaleString()}원
              </span>
              <a
                href={bookData?.bookInfo?.link}
                target="_blank"
                rel="noopener noreferrer"
                className={S.storeLink}
              >
                알라딘에서 보기
              </a>
            </p>
          </section>

          <div className={S.tagRow}>
            {bookInfo.tags.map((tag, idx) => (
              <Badge key={`${tag}-${idx}`} label={tag} type="tag" className={S.tagBadge} />
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
            <section className="px-5">
              <h2 className={S.sectionTitle}>책 소개</h2>
              {bookInfo.description ? (
                <FullView collapsedHeight={134}>
                  <p className={S.description}>{bookInfo.description}</p>
                </FullView>
              ) : (
                <EmptyBookDescription />
              )}
            </section>
          )}

          {!isBefore && resolvedActiveTab === "record" && currentGoal && (
            <ReadingStateDetail
              goal={currentGoal}
              totalPage={bookInfo.totalPage}
            />
          )}

          {!isBefore && resolvedActiveTab === "info" && (
            <section className="px-5">
              <h2 className={S.sectionTitle}>책 소개</h2>
              {bookInfo.description ? (
                <FullView collapsedHeight={72}>
                  <p className={S.description}>{bookInfo.description}</p>
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
          className="bottom-20 top-auto"
        />

        {isReportOpen && (
          <>
            <div
              className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm"
              onClick={handleReportClose}
            />
            <div className="fixed bottom-0 left-0 right-0 z-101 flex justify-center">
              <BookReport
                bookId={Number(bookId)}
                onClose={handleReportClose}
                onSave={handleSaveRecord}
                isTimerMode={false}
                goalMetric={currentGoal?.metric}
                initialData={{
                  status:
                    readingStatus === "reading"
                      ? "READING"
                      : readingStatus === "completed"
                        ? "AFTER"
                        : "BEFORE",
                }}
              />
            </div>
          </>
        )}
      </div>

      {isGoalModalOpen && (
        <GoalModal
          bookId={Number(bookId)}
          maxPages={bookInfo.totalPage}
          title={currentGoal ? "목표 수정하기" : "목표 설정하기"}
          onClose={() => setIsGoalModalOpen(false)}
          onSave={() => {
            setIsGoalModalOpen(false);
            setToastMessage(
              currentGoal 
                ? "목표가 수정되었습니다!" 
                : "목표가 저장되었습니다!"
            ); 
            setShowToast(true);
          }}
          count={1}
        />
      )}

      {isFinishedModalOpen && (
        <FinishedModal
          onClose={() => {
            setIsFinishedModalOpen(false);
            navigate("/mypage");
          }}
          count={finishedBookCount}
        />
      )}
    </div>
  );
}

export default BookDetail;
