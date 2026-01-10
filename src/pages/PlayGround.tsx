import { useState } from 'react';
import BottomBar from '../components/BottomBar/BottomBar';
import type { TabId } from '../components/BottomBar/BottomBar.types';

export default function PlayGround() {
  const [currentPage, setCurrentPage] = useState<TabId>('home');

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-4xl font-bold">홈 페이지</h1>
    
          </div>
        );
      case 'search':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-4xl font-bold">탐색 페이지</h1>
          </div>
        );
      case 'routine':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-4xl font-bold">루틴 페이지</h1>
          </div>
        );
      case 'mypage':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-4xl font-bold">마이페이지</h1>
          </div>
        );
      default:
        return <div>페이지를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <main className="w-full h-screen pb-[60px] p-4">
          {renderPageContent()}
      </main>
      <BottomBar 
        defaultTab="home"
        onTabSelect={(tabId) => {
          console.log(`[PlayGround] 탭 변경됨: ${tabId}`); // 콘솔 확인용
          setCurrentPage(tabId); // 화면 내용 변경
        }} 
      />
    </div>
  );
}