import { addBookmark, removeBookmark } from "@/api/books";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SkeletonBookDetailBefore, SkeletonBookDetailReading } from "@/components/skeleton";

import { useParams } from "react-router-dom";
import { useBookDetail, useRoutines, useBookGoal } from "@/hooks/useReadings";

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
import { useBookStore } from "@/stores/useBookStore";
import type { ReadStatus } from "../MyPage/MyPage.types";

import type { TabId } from "@/components/BottomBar/BottomBar.types";

import * as S from "./BookDetail.styles";
import EmptyBookDescription from "@/components/EmptyView/EmptyBookDescription";

export type ReadingStatus = "before" | "reading" | "completed";

export type EntrySource = "home" | "search" | "routine" | "mypage";
type ContentTab = "record" | "info";

interface BookDetailProps {
  entrySource: EntrySource;
  readingStatus: ReadingStatus;
}

export function BookDetail({ entrySource, readingStatus }: BookDetailProps) {
  const { bookId } = useParams();
  const { data: bookData, isLoading: isBookLoading } = useBookDetail(Number(bookId));
  const { data: routines } = useRoutines();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateBookStatus } = useBookStore();
  const isBefore = readingStatus === "before";
  const isLoading = isBookLoading;

  const { data: bookGoal } = useBookGoal(Number(bookId), !isBefore);

  const bookInfo = bookData?.bookInfo;

  const currentGoal =
    routines?.find((r) => r.bookId === Number(bookId)) ||
    (bookGoal && bookData?.bookInfo
      ? {
          goalId: bookGoal.goalId,
          bookId: bookGoal.bookId,
          bookTitle: bookData.bookInfo.title,
          bookAuthor: bookData.bookInfo.author,
          bookCoverImage: bookData.bookInfo.coverImage,
          bookPublisher: bookData.bookInfo.publisher,
          bookPublishYear: parseInt(bookData.bookInfo.pubDate?.substring(0, 4) || "2024"),
          bookTotalPages: bookData.bookInfo.totalPage,
          bookStatus: (readingStatus === "completed" ? "COMPLETED" : "READING") as
            | "READING"
            | "COMPLETED",
          period: bookGoal.period,
          metric: bookGoal.metric,
          targetAmount: bookGoal.targetAmount,
          achievedAmount: bookGoal.achievedAmount,
          remainingAmount: bookGoal.targetAmount - bookGoal.achievedAmount,
        }
      : undefined);

  const [activeTab, setActiveTab] = useState<ContentTab>("record");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [finishedCount, setFinishedCount] = useState<number>(1);
  const [toastAction, setToastAction] = useState<{ label: string; onClick: () => void } | null>(
    null,
  );

  useEffect(() => {
    if (location.state && typeof location.state.isBookmarked === "boolean") {
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

    if (isFinished) {
      const actualCount = data.finishedCount ?? 1;
      setFinishedCount(actualCount);

      setIsReportOpen(false);
      setTimeout(() => {
        setIsFinishedModalOpen(true);
      }, 300);
    } else {
      setIsReportOpen(false);
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
      setIsBookmarked(!newStatus);
      setToastMessage("오류가 발생했습니다. 다시 시도해 주세요.");
      setShowToast(true);
    }
  };

  const handlePenClick = () => {
    if (isBefore) setIsGoalModalOpen(true);
  };
  const handleTimerClick = () => navigate(`/routine/timer/${bookId}`);
  const handleDirectClick = () => setIsReportOpen(true);
  const handleReportClose = () => setIsReportOpen(false);

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
              label={`Lv. ${bookInfo?.level}`}
              type="level"
              className={S.getLevelBadgeClass(bookInfo?.level ?? 1)}
            />
            <h1 className={S.title}>{bookInfo?.title}</h1>
            <p className={S.author}>{bookInfo?.author}</p>
            <p className={S.meta}>
              {bookInfo?.publisher} | {bookData?.bookInfo?.pubDate} | {bookInfo?.totalPage}쪽
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
            {(bookInfo?.tags || []).map((tag, idx) => {
              const displayLabel = /^~?\d+(~\d+)?$/.test(tag) ? `${tag}쪽` : tag;
              return(
                <Badge key={`${tag}-${idx}`} label={displayLabel} type="tag" className={S.tagBadge} />
              );
            })}
              
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

          {/* 컨텐츠 렌더링 영역: tagRow 스타일 영향을 받지 않도록 별도 div 처리 가능 */}
          <div className="flex flex-col w-full">
            {isBefore && (
              <section className="px-5 w-full">
                <h2 className={S.sectionTitle}>책 소개</h2>
                {bookInfo?.description ? (
                  <FullView collapsedHeight={134}>
                    <p className={S.description} 
                    dangerouslySetInnerHTML={{ __html: bookInfo.description }}
                    />
                  </FullView>
                ) : (
                  <div className="flex justify-center w-full py-10">
                    <EmptyBookDescription />
                  </div>
                )}
              </section>
            )}
            <div className={S.tagRow}>
            {!isBefore && resolvedActiveTab === "record" && (
              <ReadingStateDetail bookId={Number(bookId)} />
            )}
            </div>
            {!isBefore && resolvedActiveTab === "info" && (
              <section className="px-5 w-full">
                <h2 className={S.sectionTitle}>책 소개</h2>
                {bookInfo?.description ? (
                  <FullView collapsedHeight={72}>
                    <p className={S.description}
                    dangerouslySetInnerHTML={{ __html: bookInfo.description }}
                    />
                  </FullView>
                ) : (
                  <div className="flex justify-center w-full py-10">
                    <EmptyBookDescription />
                  </div>
                )}
              </section>
            )}
          </div>
        </main>

        {bottomBar.visible && <BottomBar activeTab={bottomBar.activeTab} onTabSelect={() => {}} />}
        <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          className="bottom-24 top-auto"
          action={toastAction}
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
                totalPages={bookInfo?.totalPage}
                initialData={{
                  status: readingStatus === "completed" ? "AFTER" : "READING",
                }}
              />
            </div>
          </>
        )}
      </div>
      {isGoalModalOpen && (
        <GoalModal
          bookId={Number(bookId)}
          maxPages={bookInfo?.totalPage ?? 0}
          title={currentGoal ? "목표 수정하기" : "목표 설정하기"}
          onClose={() => setIsGoalModalOpen(false)}
          onSave={() => {
            setIsGoalModalOpen(false);

            if (currentGoal) {
              setToastMessage("목표가 수정되었습니다!");
              setToastAction(null);
            } else {
              setToastMessage("독서 목표가 저장되었습니다!");
              setToastAction({
                label: "독서 기록하러 가기",
                onClick: () => {
                  navigate(`/books/${bookId}?status=reading&from=routine`, { replace: true });
                },
              });
            }

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
          count={finishedCount}
        />
      )}
    </div>
  );
}

export default BookDetail;
