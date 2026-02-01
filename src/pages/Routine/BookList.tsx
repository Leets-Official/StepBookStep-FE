import { useState } from "react";
import * as S from "./BookList.styles";
import AppBar from "@/components/AppBar/AppBar";
import { Tab } from "@/components/Tab/Tab";
import { BookList } from "@/components/BookList/BookList";
import BottomBar from "@/components/BottomBar/BottomBar";
import Statistics from "./Statistics";
import { DUMMY_BOOKS } from "@/mocks/booklist.mock";
import EmptyView from "@/components/EmptyView/EmptyView"; //
import { GlassesOnBooksGif } from "@/assets/icons"; //

export default function RoutinePage() {
  const [activeTab, setActiveTab] = useState<"routine" | "statistics">("routine");
  const [navTab, setNavTab] = useState<"home" | "search" | "routine" | "mypage">("routine");

  //  true로 설정하면 데이터가 있어도 루틴 탭에서 엠티뷰가 나타남(테스트용)
  const isTestMode = true;

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
        <main className={`${S.content} flex flex-col`}>
          {activeTab === "routine" ? (
            DUMMY_BOOKS.length === 0 || isTestMode ? (
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
                  onClick: () => setNavTab("search"),
                }}
              />
            ) : (
              <>
                <h2 className={S.sectionTitle}>지금 읽고 있어요</h2>
                <div className="flex flex-col gap-4 w-full items-stretch">
                  {DUMMY_BOOKS.map((book, index) => (
                    <BookList key={index} {...book} />
                  ))}
                </div>
              </>
            )
          ) : (
            <Statistics />
          )}
        </main>

        <BottomBar activeTab={navTab} onTabSelect={setNavTab} />
      </div>
    </div>
  );
}
