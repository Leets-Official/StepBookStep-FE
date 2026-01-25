import { useState } from "react";
import * as S from "./BookDetail.styles";
import AppBar from "@/components/AppBar/AppBar";
import { Tab } from "@/components/Tab/Tab";
import { Badge } from "@/components/Badge/Badge";
import BottomBar from "@/components/BottomBar/BottomBar";
import { ReadingStateDetail } from "@/components/ReadingStateDetail/ReadingStateDetail";

// 페이지용 데이터와 기존 독서기록 데이터를 각각 가져옵니다.
import { MOCK_BOOK_DETAIL } from "@/mocks/bookdetail.mock";
import { MOCK_READING_DATA } from "@/mocks/readingState.mock"; // 기존 mock 경로 사용

export default function BookDetailPage() {
  const [activeTab, setActiveTab] = useState<"record" | "info">("record");
  const info = MOCK_BOOK_DETAIL;

  const handleAladinClick = () => {
    window.open(info.aladinUrl, "_blank");
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        {/* 상단 고정: 상태바 + 앱바 */}
        <div className={S.headerGroup}>
          <div className={S.statusBar} />
          <AppBar mode="title" title="" onBackClick={() => window.history.back()} />
        </div>

        {/* 중앙 스크롤 영역 */}
        <main className={S.content}>
          {/* 이미지 섹션 */}
          <section className={S.coverBgSection}>
            <div className={S.coverPlaceholder} />
          </section>

          {/* 도서 상세 정보 섹션 */}
          <section className={S.infoSection}>
            <div className="mb-2">
                <Badge 
                label={info.level} 
                type="level" 
                className="bg-purple-50 border-purple-400 text-purple-800" 
                />
            </div>
            
            <h1 className={S.title}>{info.title}</h1>
            <p className={S.authorText}>{info.author}</p>
            <p className={S.metaText}>
              {info.publisher} | {info.publishedYear} | {info.totalPages}쪽
            </p>

            <div className={S.priceRow}>
              <span className={S.priceLabel}>{info.price}원</span>
              <button onClick={handleAladinClick} className={S.aladinLink}>
                알라딘에서 보기
              </button>
            </div>

            <div className={S.tagList}>
                {info.tags.map((tag, idx) => (
                <Badge 
                    key={idx} 
                    label={tag} 
                    type="tag"
                    className=" border-gray-300 text-gray-500"
                />
                ))}
            </div>

            <hr className={S.divider} />

            {/* 탭 메뉴 */}
            <nav className={S.tabContainer}>
              <div className="flex-1 flex justify-center">
                <Tab 
                  label="독서 기록" 
                  isActive={activeTab === "record"} 
                  onClick={() => setActiveTab("record")} 
                  className="w-[167.5px]"
                />
              </div>
              <div className="flex-1 flex justify-center">
                <Tab 
                  label="도서 정보" 
                  isActive={activeTab === "info"} 
                  onClick={() => setActiveTab("info")} 
                  className="w-[167.5px]"
                />
              </div>
            </nav>

            {/* 컨텐츠 하단부: 기존 컴포넌트와 데이터 연결 */}
            <div className="mt-2">
              {activeTab === "record" ? (
                // 건들지 않아도 되는 기존 데이터 전달
                <ReadingStateDetail data={MOCK_READING_DATA} />
              ) : (
                <div className="py-20 text-center text-gray-400">
                  도서 상세 정보 준비 중입니다.
                </div>
              )}
            </div>
          </section>
        </main>

        <div className={S.bottomBarContainer}>
          <BottomBar activeTab="routine" onTabSelect={(id) => {id}} />
        </div>
      </div>
    </div>
  );
}
