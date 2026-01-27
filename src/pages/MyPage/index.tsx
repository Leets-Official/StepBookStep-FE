// src/pages/MyPage/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "@/stores/useBookStore";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import * as S from "./MyPage.styles";
import type { ReadStatus } from "./MyPage.types";
import { ReadingList, FinishedList, WishList, PausedList, MyPageHeader } from "./components";

const MyPage = () => {
  const navigate = useNavigate();
  const { books } = useBookStore();
  const [activeStatus, setActiveStatus] = useState<ReadStatus>("READING");

  const handleBookClick = (status: "reading" | "completed" | "before") => {
    navigate(`/bookdetail?status=${status}`);
  };

  const renderContent = () => {
    const filteredData = books.filter((b) => b.status === activeStatus);

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
        <main className={S.content}>{renderContent()}</main>
        <div className={S.bottomBarFixed}>
          <BottomBar activeTab="mypage" onTabSelect={(id) => navigate(`/${id}`)} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
