export const pageWrapper = "w-full h-screen bg-gray-200 flex justify-center overflow-hidden";
export const appFrame = "w-full max-w-[375px] h-full max-h-[812px] bg-gray-50 flex flex-col relative";
export const headerWrapper = "w-full flex-shrink-0 bg-gray-50 z-50";

// 메인 컨텐츠 영역 (공통 여백 및 스크롤)
export const content = "flex-1 px-0.5 py-2 w-full box-border flex flex-col gap-8 pb-32 overflow-y-auto no-scrollbar touch-pan-y";

// 섹션 공통 스타일
export const sectionTitle = "text-lg font-['pretendard'] font-semibold text-black mb-1";
export const sectionSubtitle = "text-sm font-['pretendard'] font-regular text-gray-400 mb-3";

// 카드 공통 스타일 (하얀 배경 + 라운드 + 테두리)
const baseCard = "bg-gray-50 rounded-xl p-6 border border-purple-100";
export const preferenceContainer = `flex flex-col items-center justify-between gap-2`;

// 얼마나 읽었나요? (회색 배경 카드)
export const weightCard = "bg-gray-50 rounded-xl p-5 border border-purple-100 flex items-center gap-4";
export const weightGraphicBox = "w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center text-center";
export const weightInfo = "flex-1";
export const weightMainText = "text-xl font-['pretendard'] font-medium text-black";

// 독서 그래프
export const chartCard = `${baseCard} p-5 flex flex-col`; // 기본 카드 스타일 재사용
export const chartContainer = "w-full min-h-[150px] relative mt-4";
export const yearSelector = "flex items-center justify-center gap-6 mb-6";
export const yearButton = "w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors";

// 누적 독서 시간 & 목표 달성
export const statsCard = `${baseCard} text-center`;
export const bigValueText = "text-[28px] font-['pretendard'] font-semibold text-gray-900 mb-1";

// 선호 분야 (Pie Chart)
export const genreCard = baseCard;
export const chartLayout = "flex justify-center mb-6";
export const chartWrapper = "relative w-[200px] h-[200px]";
export const chartCenterText = "absolute inset-0 flex items-center justify-center flex-col pointer-events-none";
export const genreList = "space-y-3";
export const genreItem = "flex items-center gap-3";
export const genreDot = "w-3 h-3 rounded-full flex-shrink-0";

// 유틸리티
export const centerBox = "flex items-center justify-center h-full w-full";
export const loadingText = "text-gray-400";
