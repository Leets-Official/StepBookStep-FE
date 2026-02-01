export const wrapper = `
  flex 
  justify-center 
  items-center 
  w-full 
  h-screen 
  bg-[#B7B7B7]

`;

export const container = `
  w-full 
  max-w-[375px] 
  h-full 
  max-h-[812px]
  
  bg-gray-50 
  relative 
  flex 
  flex-col
  
  overflow-hidden
  
  [&_nav]:absolute 
  [&_nav]:bottom-0
  [&_nav]:w-full
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
  bg-gray-50
`;

export const filterBar = `
  w-full 
  px-[20px] 
  py-2
  flex 
  items-center 
  gap-3 
  bg-gray-50 
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
  bg-gray-50 
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
