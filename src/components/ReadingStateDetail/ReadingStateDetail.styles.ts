// 전체 컨테이너
export const container = "flex flex-col w-full max-w-[400px] gap-4 p-4 bg-white";

// 상단 헤더 영역 (태그와 제목)
export const header = "flex items-center gap-2";
export const title = "text-lg font-bd text-black";

// 읽은 분량 및 퍼센트 텍스트 영역
export const progressTextContainer = "flex flex-col gap-1 mt-2";
export const progressHighlight = "text-xl font-bd text-purple-600";
export const progressSub = "text-lg font-md text-black";

// 날짜 정보 영역 (시작일, 종료일)
export const dateInfoContainer = "flex justify-between mt-4";
export const dateItem = "flex flex-col gap-1";
export const dateLabel = "text-md font-bd text-black";
export const dateValue = "text-md font-rg text-gray-600";

// 하단 독서 기록 리스트 영역
export const recordListContainer = "flex flex-col gap-3 p-4 mt-2 bg-gray-50 rounded-2xl";
export const recordItem = "flex justify-between items-center";
export const recordDate = "text-md font-rg text-gray-600";
export const recordDetail = "text-md font-rg text-gray-800";