import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "@/stores/useBookStore";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import EmptyView from "@/components/EmptyView/EmptyView";
import { GlassesOnBooksGif } from "@/assets/icons";
import * as S from "./MyPage.styles";
import type { ReadStatus } from "./MyPage.types";
import { ReadingList, FinishedList, WishList, PausedList, MyPageHeader } from "./components";

const MyPage = () => {
  const navigate = useNavigate();
  const { books } = useBookStore();
  const [activeStatus, setActiveStatus] = useState<ReadStatus>("READING");

  //엠티뷰가 제대로 만들어졌는지 확인하려고 작성해둔 코드(확인완료후삭제필요)
  const isTestMode = true;

  const handleBookClick = (status: "reading" | "completed" | "before") => {
    navigate(`/bookdetail?status=${status}`);
  };

  const renderContent = () => {
    const filteredData = books.filter((b) => b.status === activeStatus);

    if (filteredData.length === 0 || isTestMode) {
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
        return <ReadingList data={filteredData} onBookClick={() => handleBookClick("reading")} />;
      case "FINISHED":
        return (
          <FinishedList data={filteredData} onBookClick={() => handleBookClick("completed")} />
        );
      case "BOOKMARKED":
        return <WishList data={filteredData} onBookClick={() => handleBookClick("before")} />;
      case "PAUSED":
        return <PausedList data={filteredData} onBookClick={() => handleBookClick("before")} />;
    }
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
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
