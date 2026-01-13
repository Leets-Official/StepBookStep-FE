<<<<<<< HEAD
import React, { useState } from "react";
import AppBar from "@/components/AppBar/AppBar";

export default function PlayGround() {
  // 1. 검색어 상태 관리 (입력 테스트용)
  const [searchText, setSearchText] = useState("");

  // 2. 이벤트 핸들러
  const handleBack = () => console.log("뒤로가기 클릭");
  const handleSetting = () => console.log("설정 클릭");
  const handleBookmark = () => console.log("북마크 클릭");
  const handlePen = () => console.log("수정(Pen) 클릭");

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    console.log("현재 검색어:", e.target.value);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-10 bg-gray-100">
      
      {/* 1. 로고 있는 버전 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700">1. 로고 있는 버전 (Home)</h2>
        <div className="border border-gray-300 bg-white">
          <AppBar 
            mode="logo" 
            onSettingClick={handleSetting} 
          />
        </div>
      </div>

      {/* 2. 로고 없는 버전 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700">2. 로고 없는 버전 (Title)</h2>
        <div className="border border-gray-300 bg-white">
          <AppBar 
            mode="title" 
            title="독서 기록" 
            onBackClick={handleBack}
            onBookmarkClick={handleBookmark}
            onPenClick={handlePen}
          />
        </div>
      </div>

      {/* 3. 검색 버전 (탐색 탭)*/}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700">3. 검색 버전 (Search)</h2>
        
        <div className="border border-gray-300 bg-white">
          <AppBar 
            mode="search"
            searchText={searchText}
            onSearchTextChange={handleSearchChange}
            onBackClick={handleBack}
            searchPlaceholder="책 제목, 작가, 출판사 검색"
          />
        </div>
      </div>

=======
import { BookList } from "@/components/BookList/BookList";

export default function PlayGround() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-4">
      <BookList
        readingState="before"
        title="책 제목을 입력합니다, 최대 1줄"
        author="지은이, 옮긴이"
        publisher="출판사"
        publicYear="1999"
        totalPages={130}
        tags={["태그 키워드", "태그 키워드", "태그 키워드"]}
      />

      <BookList
        readingState="reading"
        title="책 제목을 입력합니다, 최대 1줄"
        author="지은이, 옮긴이"
        publisher="출판사"
        publicYear="1998"
        totalPages={130}
        startDate="2000. 08. 04"
        currentPage={13}
      />

      <BookList
        readingState="after"
        title="책 제목을 입력합니다, 최대 1줄"
        author="지은이, 옮긴이"
        publisher="출판사"
        publicYear="2001"
        totalPages={130}
        startDate="2000. 08. 04"
        endDate="2000. 08. 04"
        rating={5.0}
      />
>>>>>>> develop
    </div>
  );
}
