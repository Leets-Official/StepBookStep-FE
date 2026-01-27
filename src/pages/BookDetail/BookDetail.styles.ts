/* 전체 프레임 */
export const pageWrapper = "min-h-screen bg-white flex justify-center items-center";

export const appFrame = "w-full max-w-[375px] h-[812px] flex flex-col self-center bg-gray-050";

/* 콘텐츠 영역 */
export const content = "flex-1 overflow-y-auto pb-8 no-scrollbar";

/* 책 커버 */
export const coverWrapper = "flex justify-center mb-5 bg-gray-100 py-5";

export const coverImage =
  "w-[110px] h-[160px] bg-gray-200 shadow-[0_4px_6px_color-mix(in_srgb,var(--color-purple-500)_15%,transparent)]";

/* 책 기본 정보 */
export const infoSection = "mb-4 px-5";

export function getLevelBadgeClass(level: string) {
  switch (level) {
    case "Lv.1":
      return "bg-purple-100 border-purple-400 text-purple-800";
    case "Lv.2":
      return "bg-purple-200 border-purple-500 text-purple-800";
    case "Lv.3":
      return "bg-purple-400 border-purple-500 text-white";
    default:
      return "bg-purple-200 border-purple-500 text-purple-800";
  }
}
export const title = "text-xl font-bold text-black leading-6 mt-3";

export const author = "mt-2 text-lg font-semibold text-gray-800";

export const meta = "text-sm font-normal text-gray-900";

export const priceRow = "text-sm mt-3";

export const priceText = "text-gray-500 font-normal";

export const storeLink =
  "ml-2 text-purple-400 font-normal underline underline-offset-2 hover:text-purple-700";
/* 태그 */
export const tagRow = "flex gap-2 mt-3 mb-6 flex-wrap px-5";

export const tags = "text-gray-500 border border-gray-500 bg-transparent";

/* 구분선 */
export const divider = "w-full h-px bg-gray-200 my-6 self-stretch px-5";

/* 탭 */
export const tabRow =
  "flex border-md border-transparent mb-4 px-5 text-lg font-semibold text-gray-900";

/* 섹션 */
export const sectionTitle = "text-lg font-semibold text-gray-900 mb-2";

export const description = "text-sm text-gray-700 leading-5";

/* 카드형 영역 (독서 기록) */
export const card = "bg-white rounded-xl shadow-sm p-4 mb-4";

/* 하단 영역 */
export const bottomAction = "px-5 pb-2.5 bottom-0 bg-gray-050";
