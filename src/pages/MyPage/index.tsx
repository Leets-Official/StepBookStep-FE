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
import { useUserStore } from "@/stores/useUserStore";
import { SkeletonBookList } from "@/components/skeleton"; 

const MyPage = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<ReadStatus>("READING");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 닉네임이 없을 경우를 대비해 기본값 "회원" 설정
  const { nickname } = useUserStore();
  const displayNickname = nickname || "회원";

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const data = await getMyBooks({
          readStatus: activeStatus,
          page: 0,
          size: 100,
        });

        const mappedItems = (data.items || []).map((item) => ({
          ...item,
          coverImage: item.coverUrl,
          isBookmarked: item.isBookmarked ?? item.bookmarked,
          bookmarked: item.isBookmarked ?? item.bookmarked,
        }));

        setBooks(mappedItems);
      } catch (error) {
        console.error("내 서재 불러오기 실패:", error);
        setBooks([]);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchBooks();
  }, [activeStatus]);

  const handleBookClick = (bookId: number, status: "reading" | "completed" | "before") => {
    const book = books.find((b) => b.bookId === bookId);
    navigate(`/books/${bookId}?status=${status}&entrySource=mypage`, {
      state: { isBookmarked: book?.isBookmarked ?? book?.bookmarked ?? false },
    });
  };

  const renderContent = () => {
    // 1. 데이터 로딩 중일 때 스켈레톤 표시
    if (isLoading) {
      return (
        <div className={S.listWrapper}>
          {[...Array(6)].map((_, i) => (
            <SkeletonBookList key={i} />
          ))}
        </div>
      );
    }

    // 2. 전체 데이터가 하나도 없을 때
    if (books.length === 0) {
      return (
        <EmptyView
          icon={GlassesOnBooksGif}
          title="아직 도서가 없어요."
          description={
            <>
              {displayNickname}님이 좋아하실 도서를 <br /> 고르러 가볼까요?
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

    // 3. 상태별 필터링 로직
    let filteredData = books;

    if (activeStatus === "BOOKMARKED") {
      filteredData = books.filter((b) => !!b.bookmarked || !!b.isBookmarked);
    } else if (activeStatus === "STOPPED") {
      filteredData = books.filter((b) => b.status === "STOPPED");
    } else {
      filteredData = books.filter((b) => b.status === activeStatus);
    }

    // 4. 필터링된 데이터가 없을 때
    if (filteredData.length === 0) {
      return (
        <EmptyView
          icon={GlassesOnBooksGif}
          title="아직 도서가 없어요."
          description={
            <>
              {displayNickname}님이 좋아하실 도서를 <br /> 고르러 가볼까요?
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

    // 5. 각 탭 상태에 맞는 리스트 렌더링
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
        <AppBar
          mode="logo"
          onSettingClick={() => {
            navigate("/setting", { state: { from: "/mypage" } });
          }}
        />
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
