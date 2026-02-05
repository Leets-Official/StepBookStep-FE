import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import EmptyView from "@/components/EmptyView/EmptyView";
import { GlassesOnBooksGif } from "@/assets/icons";
import * as S from "./MyPage.styles";
import type { ReadStatus, BookItem } from "./MyPage.types";
import { ReadingList, FinishedList, WishList, PausedList, MyPageHeader } from "./components";
import { getMyBooks } from "@/api/myPage";

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

        // 👇 [핵심 수정] 서버 데이터와 화면 컴포넌트의 변수명 차이를 여기서 해결합니다!
        const mappedItems = (data.items || []).map((item) => ({
          ...item,
          // 1. 이미지 연결 (API는 coverUrl, 컴포넌트는 coverImage를 찾음)
          coverImage: item.coverUrl,

          // 2. 북마크 연결 (API는 isBookmarked, 컴포넌트는 bookmarked를 찾음)
          // 둘 중 하나라도 있으면 true로 인식되도록 설정
          isBookmarked: item.isBookmarked ?? item.bookmarked,
          bookmarked: item.isBookmarked ?? item.bookmarked,
        }));

        setBooks(mappedItems);
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

    // 1. 데이터 없음 처리 (API 응답 자체가 비어있을 때)
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

    // 2. 탭별 필터링 로직
    let filteredData = books;

    if (activeStatus === "BOOKMARKED") {
      // 🟢 [읽고 싶은 탭]
      // 북마크된 책은 상태(status)와 상관없이 모두 보여줍니다.
      // (중단된 책이라도 북마크가 되어 있으면 여기서도 보입니다)
      filteredData = books.filter((b) => !!b.bookmarked || !!b.isBookmarked);
    } else if (activeStatus === "STOPPED") {
      // 🔴 [중단한 탭]
      // 상태가 정확히 'STOPPED'인 책만 보여줍니다.
      filteredData = books.filter((b) => b.status === "STOPPED");
    } else {
      // 🔵 [읽는 중 / 완독한 탭]
      // 현재 탭 상태와 일치하는 책만 보여줍니다.
      filteredData = books.filter((b) => b.status === activeStatus);
    }

    // 3. 필터링 후 결과 없음 처리
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

    // 4. 렌더링
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
      case "STOPPED":
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
