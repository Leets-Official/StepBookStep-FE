import { useState } from "react";
import * as S from "./BookList.styles"; 
import AppBar from "@/components/AppBar/AppBar";
import { Tab } from "@/components/Tab/Tab";
import { BookList } from "@/components/BookList/BookList";
import BottomBar from "@/components/BottomBar/BottomBar";

export default function RoutinePage() {
  const [activeTab, setActiveTab] = useState<"routine" | "statistics">("routine");
  const [navTab, setNavTab] = useState<"home" | "search" | "routine" | "mypage">("routine");

  const dummyBooks = Array(4).fill({
    readingState: "readingdetail",
    title: "책 제목을 입력합니다, 최대 1줄",
    author: "지은이, 옮긴이",
    publisher: "출판사",
    publicYear: "1998",
    totalPages: 130,
    targetPeriod: "1주일",
    targetAmount: 100,
    remainingAmount: 82,
    isAchieved: false,
  });

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        
        <div className={S.statusBar} />
        
        <header className={S.headerWrapper}> 
           <AppBar mode="logo" onSettingClick={() => {}} />
        </header>

        <nav className={S.tabContainer}>
          <div className="flex">
            <Tab 
              label="루틴" 
              isActive={activeTab === "routine"} 
              onClick={() => setActiveTab("routine")} 
              className="w-[167.5px]"
            />
          </div>
          <div className="flex">
            <Tab 
              label="통계" 
              isActive={activeTab === "statistics"} 
              onClick={() => setActiveTab("statistics")} 
              className="w-[167.5px]"
            />
          </div>
        </nav>

        <main className={S.content}>
          {activeTab === "routine" ? (
            <>
              <h2 className={S.sectionTitle}>지금 읽고 있어요</h2>
              <div className="flex flex-col gap-4 w-full items-stretch">
                {dummyBooks.map((book, index) => (
                  <BookList key={index} {...book} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 font-medium">
              통계 준비 중
            </div>
          )}
        </main>

        <BottomBar defaultTab="routine" onTabSelect={(id) => setNavTab(id)} />
        
      </div>
    </div>
  );
}
