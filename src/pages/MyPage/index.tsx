import { useState } from "react";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import * as S from "./MyPage.styles"; 
import type { ReadStatus } from "./MyPage.types";
import { MOCK_BOOKS as MOCK_DATA } from "./MyPage.mookDate";
import { useNavigate } from "react-router-dom";
import { 
  ReadingList, 
  FinishedList, 
  WishList, 
  PausedList, 
  MyPageHeader 
} from "./components";

const MyPage = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<ReadStatus>("READING");

  const renderContent = () => {
    const filteredData = MOCK_DATA.filter(b => b.status === activeStatus);
    switch (activeStatus) {
      case "READING": return <ReadingList data={filteredData} />;
      case "FINISHED": return <FinishedList data={filteredData} />;
      case "BOOKMARKED": return <WishList data={filteredData} />;
      case "PAUSED": return <PausedList data={filteredData} />;
    }
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="logo" onSettingClick={() => {}} />
        <MyPageHeader activeStatus={activeStatus} onTabChange={setActiveStatus} />
        <main className={S.content}>
          {renderContent()}
        </main>
        <div className={S.bottomBarFixed}>
          <BottomBar 
            activeTab="mypage" 
            onTabSelect={(id) => navigate(`/${id}`)} 
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;