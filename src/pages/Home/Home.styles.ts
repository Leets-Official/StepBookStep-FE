export const pageWrapper = "min-h-screen bg-gray-200 flex justify-center items-center";

export const appFrame = "w-full max-w-[375px] h-[812px] flex flex-col self-center bg-gray-50";

export const content = "flex-1 overflow-y-auto pb-2 no-scrollbar";

export const headerSection = "px-5 mt-4 mb-3";

export const headerSubtitle = "text-lg text-black font-semibold";

export const headerTitle = "text-lg font-semibold text-black";

export const headerHighlight = "text-purple-400";

export const sliderWrapper = "relative group";

export const horizontalBookList = `
  flex gap-3 px-5 mb-4
  overflow-x-auto no-scrollbar
  scroll-smooth
`;

export const bookItem = "flex-shrink-0";

export const arrowBase =
  "absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/60 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity";

export const arrowLeft = `${arrowBase} left-2`;

export const arrowRight = `${arrowBase} right-2`;

export const recommendSection = "px-5 mb-3 mt-7.5";

export const recommendTitle = "text-lg font-semibold text-black mb-3";

export const recommendHighlight = "text-purple-400";

export const recommendButtons = "flex gap-1";

export const chip =
  "px-3 h-8 rounded-full border border-lime-600 font-normal text-sm text-gray-700 leading-5 transition-all";

export const chipActive = "bg-lime-400/60 border-lime-600 text-purple-800";

export const statsCard =
  "h-[165px] mx-5 bg-white rounded-xl \
   shadow-[0_4px_6px_color-mix(in_srgb,var(--color-purple-500)_15%,transparent)] \
   px-4 py-3 mb-4 flex flex-col";

export const statsSection = "flex-1 flex items-center justify-center";

export const statsHeader = "w-full mt-10 px-5 flex items-center justify-between mb-3";

export const statsTitle = "text-lg font-semibold text-gray-900";

export const statsArrow = "text-gray-500";

export const statsGrid = "grid grid-cols-2 gap-4";

export const statItem = "w-[148px] flex items-center gap-3";

export const statIconBox =
  "w-10 h-10 p-2 rounded-lg bg-purple-100/70 flex items-center justify-center";

export const statIcon = "w-6 h-6 text-gray-500";

export const statLabel = "text-xs font-medium text-gray-400";

export const statValue = "text-xl font-bold text-purple-500";

export const divider = "w-full h-px bg-gray-200 my-4";
