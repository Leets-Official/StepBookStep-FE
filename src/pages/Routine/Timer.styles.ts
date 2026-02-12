export const pageWrapper = "w-full h-screen flex justify-center items-center bg-gray-200 overflow-hidden";
export const appFrame = "w-full max-w-[375px] h-[812px] bg-gray-50 flex flex-col relative flex-shrink-0";

export const headerGroup = "w-full z-50 bg-white flex-shrink-0";
export const statusBar = "h-[44px] w-full bg-white flex-shrink-0";

export const content = "flex-1 px-5 pt-4 flex flex-col items-center overflow-hidden";

export const timerCircleContainer = "relative w-[335px] h-[335px] flex items-center justify-center mb-8 flex-shrink-0";
export const svgContainer = "absolute inset-0 -rotate-90";
export const controlIcon = "w-14 h-14 cursor-pointer transition-transform active:scale-95";

export const timerTextContent = "absolute inset-0 z-10"; 

export const statusLabel = `
  absolute top-[32%] left-1/2 -translate-x-1/2
  text-gray-700 text-lg font-medium h-7 whitespace-nowrap
`; 

export const digitalTime = `
  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
  text-[48px] font-semibold text-black tracking-tight leading-none font-['Pretendard']
`; 

export const iconWrapper = `
  absolute top-[68%] left-1/2 -translate-x-1/2
  flex justify-center items-center h-14
`;
export const bookInfoContainer = "text-center mt-auto mb-30 flex flex-col items-center w-full";

export const bookTitle = `
  text-lg font-semibold text-gray-900 
  w-full           
  truncate            
  px-4 text-center    
`;

export const bookAuthor = "text-md font-semibold text-gray-700 leading-5";

export const footer = `
  px-5 pb-30 pt-4
  sticky bottom-0
  bg-gray-50
  flex gap-3
  w-full
`;
