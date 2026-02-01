import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./BookList.styles";
import AppBar from "@/components/AppBar/AppBar";
import { Tab } from "@/components/Tab/Tab";
import { BookList } from "@/components/BookList/BookList";
import BottomBar from "@/components/BottomBar/BottomBar";
import Statistics from "./Statistics";
import { useRoutines } from "@/hooks/useReadings";


export default function RoutinePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"routine" | "statistics">("routine");
  const [navTab, setNavTab] = useState<"home" | "search" | "routine" | "mypage">("routine");
  const { data: routines, isLoading, isError, refetch } = useRoutines();

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
            <>
              <h2 className={S.sectionTitle}>지금 읽고 있어요</h2>

              {/* 3. 로딩 및 에러 상태 처리 */}
                {isLoading && (
                  <div className="flex flex-col gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-full h-24 bg-gray-100 rounded-lg animate-pulse" />
                    ))}
                  </div>
                )}

                {isError && (
                  <div className="flex flex-col items-center py-10">
                    <p className="text-gray-500 mb-4">루틴을 불러오지 못했습니다.</p>
                    <button 
                      onClick={() => refetch()} 
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                    >
                      다시 시도
                    </button>
                  </div>
                )}

                {/* 4. 실제 데이터 렌더링 */}
                {!isLoading && !isError && routines && routines.length > 0 ? (
                  routines.map((routine) => (
                    <BookList 
                      key={routine.goalId}
                      title={routine.bookTitle}
                      author={routine.bookAuthor}
                      publisher={routine.bookPublisher}
                      publicYear={String(routine.bookPublishYear)}
                      totalPages={routine.bookTotalPages}
                      targetPeriod={
                        routine.period === "DAILY" ? "하루" : 
                        routine.period === "WEEKLY" ? "1주일" : "한 달"
                      }
                      targetAmount={routine.targetAmount}
                      remainingAmount={routine.remainingAmount}
                      isAchieved={routine.remainingAmount <= 0}
                      readingState="readingdetail"

                      onClick={() => navigate(`/books/${routine.bookId}`)}
                    />
                  ))
                ) : (
                  !isLoading && !isError && (
                    <div className="text-center py-20 text-gray-400">
                      엠티뷰가 들어가야함
                    </div>
                  )
                )}
            </>
          ) : (
            <Statistics />
          )}
        </main>

        <BottomBar activeTab={navTab} onTabSelect={setNavTab} />
      </div>
    </div>
  );
}
