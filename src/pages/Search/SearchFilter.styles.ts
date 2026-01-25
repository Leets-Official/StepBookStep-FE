export const container = `
  fixed 
  top-1/2 
  left-1/2 
  -translate-x-1/2 
  -translate-y-1/2
  z-50 
  
  w-full 
  max-w-[375px] 
  h-full 
  max-h-[812px]
  
  bg-white 
  flex 
  flex-col 
  pt-11

  rounded-[30px] overflow-hidden
`;

export const header = `
  flex 
  items-center 
  h-[56px] 
  px-[20px] 
  bg-white
  sticky 
  top-0 
  z-10
`;

export const backButton = `
  w-[44px] 
  h-[44px] 
  flex 
  items-center 
  justify-center 
  -ml-3 
  cursor-pointer
`;

export const headerTitle = `
  font-['Pretendard'] 
  font-semibold 
  text-[16px] 
  leading-[20px] 
  tracking-[0%] 
  text-gray-900
`;

export const content = `
  flex-1 
  overflow-y-auto 
  px-[20px] 
  py-2
  pb-32 
  scrollbar-hide
`;

export const section = `
  mb-8
`;

export const sectionHeader = `
  flex 
  items-center 
  gap-1 
  mb-3
`;

export const sectionTitle = `
  font-['Pretendard'] 
  font-semibold 
  text-[16px] 
  leading-[20px] 
  tracking-[0%] 
  text-gray-900
`;

export const helpIcon = `
  w-[18px]
  h-[18px]
  text-gray-300 
  cursor-pointer 
  hover:text-gray-500
  transition-colors
`;

export const chipWrapper = `
  flex 
  flex-wrap 
  gap-2
`;

export const unselectedChip = `
  border 
  border-gray-200 
  bg-white 
  text-gray-600 
`;

export const accordionHeader = `
  flex 
  items-center 
  justify-between 
  w-full 
  mb-3 
  cursor-pointer
  py-1
`;

export const arrowIcon = `
  w-6 
  h-6 
  text-gray-400
`;

// 툴팁 박스
export const tooltipBox = `
  absolute 
  top-[34px] 
  left-0 
  z-20 
  bg-white 
  border 
  border-purple-100 
  shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
  rounded-xl 
  p-4 
  w-[280px]
`;

export const tooltipItem = `
  flex 
  gap-2 
  mb-1.5 
  last:mb-0
`;

export const tooltipLabel = `
  text-[11px] 
  font-semibold 
  text-gray-900 
  shrink-0
  w-6
`;

export const tooltipDesc = `
  text-[11px] 
  text-gray-500 
  leading-[1.4]
`;

export const footer = `
  absolute 
  bottom-0 
  w-full 
  px-[20px] 
  pb-[30px] 
  pt-4
  bg-white
  border-t
  border-gray-50
`;

export const chipStyle = `
  font-['Pretendard'] 
  font-normal 
  text-[14px] 
  leading-[20px] 
  tracking-[0%]
`;
