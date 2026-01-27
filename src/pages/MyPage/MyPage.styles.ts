// 1. 전체 레이아웃 가이드
export const pageWrapper = "min-h-screen bg-[#B7B7B7] flex justify-center items-center";

// 2. 모바일 앱 프레임
export const appFrame = "w-[375px] h-[812px] bg-gray-50 flex flex-col overflow-hidden relative border-x border-gray-100 shadow-lg";

// 3. 내부 컨텐츠 영역
export const content = "flex-1 overflow-y-auto pb-[90px] scrollbar-hide no-scrollbar";

// 4. 요청하신 텍스트 및 레이아웃 요소들
export const headerSection = "px-5 mt-4 mb-3";
export const headerSubtitle = "text-lg text-black font-semibold";
export const headerTitle = "text-lg font-semibold text-black";
export const headerHighlight = "text-purple-400";
export const sliderWrapper = "relative group";

// 5. 마이페이지 필수 요소 및 스타일 덮어쓰기
export const tabContainer = "flex border-b border-gray-100 bg-gray-50 px-5";
export const bottomBarFixed = "absolute bottom-0 w-full bg-gray-50 border-t border-gray-50 z-50";

export const listWrapper = `
  flex flex-col gap-4 px-4 py-5
  [&_.flex-wrap]:flex-nowrap 
  [&_.flex-wrap]:gap-xxl 
  [&_.flex-wrap]:overflow-x-auto
  [&_.flex-wrap]:scrollbar-hide
  [&_.inline-flex]:flex-shrink-0
  [&_.inline-flex]:border-gray-200
  [&_.inline-flex]:text-gray-400
  [&_.inline-flex]:bg-gray-50
  [&_.inline-flex_span]:whitespace-nowrap
  [&_.inline-flex_span]:text-[11px]
`;