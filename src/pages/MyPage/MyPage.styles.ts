// 1. 전체 레이아웃 가이드: 프레임을 화면 중앙에 배치합니다.
export const pageWrapper = "min-h-screen bg-white flex justify-center items-center";

// 2. 모바일 앱 프레임: iPhone 13 Mini 규격을 유지하며 테두리와 그림자를 추가합니다.
export const appFrame = "w-[375px] h-[812px] bg-gray-50 flex flex-col overflow-hidden relative border-x border-gray-50";

// 3. 내부 컨텐츠 영역: 스크롤 영역을 담당합니다. (기존 scrollArea 대체)
export const content = "flex-1 overflow-y-auto pb-[90px] scrollbar-hide no-scrollbar";

// 4. 요청하신 텍스트 및 레이아웃 요소들
export const headerSection = "px-5 mt-4 mb-3";
export const headerSubtitle = "text-lg text-black font-semibold";
export const headerTitle = "text-lg font-semibold text-black";
export const headerHighlight = "text-purple-400";
export const sliderWrapper = "relative group";

// 5. 마이페이지 기존 필수 요소들
export const tabContainer = "flex border-b border-gray-100 bg-gray-50 px-5";
export const listWrapper = "flex flex-col gap-4 px-4 py-5";
export const bottomBarFixed = "absolute bottom-0 w-full bg-white border-t border-gray-100 z-50";