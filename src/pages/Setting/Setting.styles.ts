/* 전체 프레임 */
export const pageWrapper = "min-h-screen bg-gray-200 flex justify-center items-center";

export const appFrame = "relative w-full max-w-[375px] h-[812px] flex flex-col bg-gray-50";

/* 콘텐츠 */
export const content = "flex-1 overflow-y-auto no-scrollbar";

/* 섹션 */
export const section = "px-5 pt-6";

export const sectionTitle = "text-sm text-gray-500 mb-3 font-semibold";

/* 행 공통 */
export const row = "flex items-center justify-between py-4 min-h-[48px]";

export const kakaoRow = "flex items-center py-4 min-h-[48px]";

export const kakaoRight = "ml-auto flex items-center gap-2";

export const kakaoIcon = "w-3.5 h-3.5 text-gray-500";

export const rowButton = "flex items-center justify-between py-3 min-h-[48px] w-full";

/* 텍스트 */
export const label = "text-md text-gray-900 font-medium";

export const value = "text-sm text-gray-500";

export const chevron = "text-gray-400 text-2xl";

/* 구분선 */
export const divider = "h-[1px] bg-gray-200 mt-3 mb-1 mx-5";

/* 회원 탈퇴 */
export const withdraw = "text-md text-red-500";

/* ===== 닉네임 수정 페이지 ===== */

export const inputLabel = "block text-sm text-gray-800 mb-2 mt-6 first:mt-0 font-semibold";

export const helperText = "mt-3 text-xs text-gray-400 leading-4 font-regular";

export const toastWrapper = `
  absolute
  left-1/2
  -translate-x-1/2
  bottom-[calc(150px)]
  z-50
  `;

export const button = "m-5 mb-6";

/* =========================
   Preference Edit Page
========================= */
export const preferenceContent = "flex-1 px-5 pt-6 overflow-y-auto";

export const preferenceSection = "mb-8";

export const preferenceSectionTitle = "text-lg font-semibold text-gray-900 mb-3";

/* 난이도 */
export const preferenceLevelRow = "flex gap-3 item-between";

export const preferenceLevelChip =
  "px-6 py-2 w-26 rounded-full border border-lime-600 text-sm text-gray-700 leading-5";

export const preferenceLevelChipActive =
  "px-6 py-2 w-26 rounded-full bg-lime-400/60 border border-lime-600 text-purple-800 text-sm";

/* 분류 */
export const preferenceGenreChip = `
  px-4 h-9
  rounded-full
  border border-lime-600
  text-sm text-gray-700 leading-5
  transition-all
  hover:bg-lime-400/30 hover:border-lime-600
`;

export const preferenceGenreChipActive = `
  bg-lime-400/60
  border-lime-600
  text-purple-800
  hover:bg-lime-400/30 hover:border-lime-600
`;
