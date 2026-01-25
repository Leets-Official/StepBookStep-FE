export const styles = {
  // 전체 컨테이너
  container: `
    fixed bottom-0 

    left-1/2 
    -translate-x-1/2 
    w-full 
    max-w-[375px] 
    bg-white
    border-t border-gray-100 

    flex justify-around items-center 
    z-50
    
    pt-[4px]
    
    pb-[calc(4px+env(safe-area-inset-bottom))]

    min-h-[62px]
  `,

  button: `
    flex flex-col items-center justify-center 
    w-full 
    h-[54px] 
    cursor-pointer 
    transition-colors duration-200 ease-in-out
  `,

  icon: `w-6 h-6 mb-[2px]`,

  label: `
    text-[10px] 
    font-sb        
    leading-[16px] 
  `,
};
