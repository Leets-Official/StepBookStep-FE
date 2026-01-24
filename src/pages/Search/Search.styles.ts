export const wrapper = `
  flex 
  justify-center 
  w-full 
  min-h-screen 
  bg-gray-50
  pt-11
`;

export const container = `
  w-full 
  max-w-[375px] 
  mx-auto 
  min-h-screen 
  bg-white 
  relative 
  flex flex-col
  pt-11

  [&_nav]:bg-white 
  [&_nav]:z-50

`;

export const contentArea = `
  flex-1 
  overflow-y-auto 
  px-[20px] 
  pb-[130px] 
  scrollbar-hide
`;

export const headerWrapper = `
  w-full 
  h-[64px] 
  px-[20px] 
  flex 
  items-center 
  bg-white
`;

export const filterBar = `
  w-full 
  px-[20px] 
  py-2
  flex 
  items-center 
  gap-3 
  bg-white 
  sticky 
  top-0 
  z-10
  overflow-hidden
`;

export const chipList = `
  flex 
  gap-2 
  overflow-x-auto 
  scrollbar-hide 
  items-center
  flex-1
`;

export const listWrapper = `
  flex 
  flex-col 
  gap-[12px]
`;

export const subHeader = `
  w-full 
  px-[20px] 
  h-[56px]
  flex 
  items-center 
  bg-white 
  sticky 
  top-0 
  z-10
`;

export const filterButton = `
  flex 
  flex-row
  items-center 
  justify-center
  w-[73px] 
  h-[44px] 
  gap-[4px]
  rounded-full
  transition-all 
  duration-150 
  cursor-pointer 
  bg-transparent  
  hover:bg-gray-50 
  active:bg-purple-100/40
  whitespace-nowrap
  -ml-2
  flex-shrink-0
`;

export const filterText = `
  text-[14px] 
  font-medium 
  text-gray-600
`;

export const sectionTitle = `
  font-['Pretendard'] 
  font-semibold 
  text-[16px] 
  leading-[20px] 
  tracking-[0%] 
  text-gray-900 
`;
