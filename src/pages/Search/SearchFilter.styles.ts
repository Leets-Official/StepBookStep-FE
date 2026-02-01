export const container = `
  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
  w-full max-w-[375px] h-full max-h-[812px]
  bg-gray-50 flex flex-col pt-11 overflow-hidden
`;

export const header = `flex items-center h-[56px] px-[20px] bg-gray-50 sticky top-0 z-10`;
export const backButton = `w-[44px] h-[44px] flex items-center justify-center -ml-3 cursor-pointer`;
export const headerTitle = `font-['Pretendard'] font-semibold text-[16px] leading-[20px] text-gray-900`;

export const content = `flex-1 overflow-y-auto px-[20px] py-2 pb-32 scrollbar-hide`;
export const section = `mb-8`;
export const sectionHeader = `flex items-center gap-1 mb-3`;
export const sectionTitle = `font-['Pretendard'] font-semibold text-[16px] leading-[20px] text-gray-900`;

// 분량 필터 컨테이너
export const volumeSliderContainer = `
  w-full flex flex-col items-center mt-4 overflow-x-hidden
`;

// 막대 (인디케이터) 설정: 335x6, Radius round
export const volumeSliderWrapper = `
  relative w-[335px] h-[28px] mb-4 flex items-center
`;

export const volumeTrack = `
  absolute top-1/2 -translate-y-1/2 left-0 w-full h-[6px] bg-[#E6E6FA] rounded-full
`;

export const volumeFilledTrack = `
  absolute top-1/2 -translate-y-1/2 left-0 h-[6px] bg-[#5C4FE5] rounded-full transition-all duration-200
`;

export const volumeSlider = `
  absolute top-1/2 left-0 -translate-y-1/2 z-20
  w-full h-8 bg-transparent cursor-pointer appearance-none m-0
  
  /* 크기: 약 14px (13.9583px 반올림), 보더: 4px */
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-[14px]
  [&::-webkit-slider-thumb]:h-[14px]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:border-[4px] 
  [&::-webkit-slider-thumb]:border-[#5C4FE5]
  [&::-webkit-slider-thumb]:cursor-pointer
  [&::-webkit-slider-thumb]:shadow-sm

  [&::-moz-range-thumb]:w-[14px]
  [&::-moz-range-thumb]:h-[14px]
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-[4px]
  [&::-moz-range-thumb]:border-[#5C4FE5]
  [&::-moz-range-thumb]:cursor-pointer
  [&::-moz-range-thumb]:border-solid
`;

// 텍스트 설정: 간격 24px, 폰트 weight 500, size xs
export const volumeLabels = `
  flex justify-between items-center w-full px-0
`;

export const volumeLabel = `
  font-['Pretendard'] font-medium text-[12px] leading-[14px] text-[#A0A0A0] whitespace-nowrap
`;

export const activeVolumeLabel = `
  text-[#5C4FE5]
`;

// 기타 스타일 (기존 유지)
export const chipWrapper = `flex flex-wrap gap-2`;
export const accordionHeader = `flex items-center justify-between w-full mb-3 cursor-pointer py-1`;
export const arrowIcon = `w-6 h-6 text-gray-400`;
export const helpIcon = `w-[18px] h-[18px] text-gray-300 cursor-pointer hover:text-gray-500 transition-colors`;
export const tooltipBox = `absolute top-[34px] left-0 z-20 bg-gray-50 border border-purple-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl p-4 w-[280px]`;
export const tooltipItem = `flex gap-2 mb-1.5 last:mb-0`;
export const tooltipLabel = `text-[11px] font-semibold text-gray-900 shrink-0 w-6`;
export const tooltipDesc = `text-[11px] text-gray-500 leading-[1.4]`;
export const footer = `absolute bottom-0 w-full px-[20px] pb-[30px] pt-4 bg-gray-50 border-t border-gray-50`;