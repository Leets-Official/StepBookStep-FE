import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import EmptyView from "@/components/EmptyView/EmptyView";
import { GlassesOnBooksGif } from "@/assets/icons";
import * as S from "./MyPage.styles";
import type { ReadStatus, BookItem } from "./MyPage.types";
import { ReadingList, FinishedList, WishList, PausedList, MyPageHeader } from "./components";
import { getMyBooks } from "@/api/myPage"; // API 함수 import

const MyPage = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<ReadStatus>("READING");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 탭 변경 시마다 API 호출
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getMyBooks({
          readStatus: activeStatus,
          page: 0,
          size: 100,
        });
        setBooks(data.items || []);
      } catch (error) {
        console.error("내 서재 불러오기 실패:", error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [activeStatus]);

  const handleBookClick = (bookId: number, status: "reading" | "completed" | "before") => {
    navigate(`/books/${bookId}?status=${status}`);
  };

  const renderContent = () => {
    if (isLoading) return <div className="p-10 text-center">로딩 중...</div>;

    if (books.length === 0) {
      return (
        <EmptyView
          icon={GlassesOnBooksGif}
          title="아직 도서가 없어요."
          description={
            <>
              00님이 좋아하실 도서를 <br /> 고르러 가볼까요?
            </>
          }
          className="pt-37.75"
          actionButton={{
            label: "도서 탐색하기",
            onClick: () => navigate("/search"),
          }}
        />
      );
    }

    const filteredData =
      activeStatus === "BOOKMARKED"
        ? books.filter((b) => !!b.bookmarked)
        : books.filter((b) => b.status === activeStatus);

    if (filteredData.length === 0) {
      return (
        <EmptyView
          icon={GlassesOnBooksGif}
          title="아직 도서가 없어요."
          description={
            <>
              00님이 좋아하실 도서를 <br /> 고르러 가볼까요?
            </>
          }
          className="pt-37.75"
          actionButton={{
            label: "도서 탐색하기",
            onClick: () => navigate("/search"),
          }}
        />
      );
    }

    switch (activeStatus) {
      case "READING":
        return (
          <ReadingList data={filteredData} onBookClick={(id) => handleBookClick(id, "reading")} />
        );
      case "FINISHED":
        return (
          <FinishedList
            data={filteredData}
            onBookClick={(id) => handleBookClick(id, "completed")}
          />
        );
      case "BOOKMARKED":
        return <WishList data={filteredData} onBookClick={(id) => handleBookClick(id, "before")} />;
      case "STOPPED": // PAUSED 대신 STOPPED 사용
        return (
          <PausedList data={filteredData} onBookClick={(id) => handleBookClick(id, "before")} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <div className={S.statusBar} />
        <AppBar mode="logo" />
        <MyPageHeader activeStatus={activeStatus} onTabChange={setActiveStatus} />
        <main className={`${S.content} flex flex-col`}>{renderContent()}</main>
        <div className={S.bottomBarFixed}>
          <BottomBar activeTab="mypage" onTabSelect={(id) => navigate(`/${id}`)} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
