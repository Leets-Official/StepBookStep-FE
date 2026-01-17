import { useState } from "react";
import type { StateCarouselProps, ReadingStatus } from "@/components/StateCarousel/StateCarousel.types";
import { STATE_CONFIGS, CAROUSEL_ORDER, styles } from "@/components/StateCarousel/StateCarousel.styles";

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const StateCarousel = ({ initialStatus = "BEFORE", onChange }: StateCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const idx = CAROUSEL_ORDER.indexOf(initialStatus);
    return idx !== -1 ? idx : 0;
  });

  const currentStatus: ReadingStatus = CAROUSEL_ORDER[currentIndex];
  const config = STATE_CONFIGS[currentStatus];

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onChange?.(CAROUSEL_ORDER[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < CAROUSEL_ORDER.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onChange?.(CAROUSEL_ORDER[newIndex]);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === CAROUSEL_ORDER.length - 1;

  const leftIconColor = isFirst 
    ? "text-gray-300 cursor-not-allowed" 
    : "text-gray-700 hover:bg-gray-50 rounded-full";
    
  const rightIconColor = isLast 
    ? "text-gray-300 cursor-not-allowed" 
    : "text-gray-700 hover:bg-gray-50 rounded-full";

  return (
    <div className={styles.container}>
      {/* Left Chevron */}
      <button 
        onClick={handlePrev} 
        disabled={isFirst}
        className={`${styles.iconButton} ${leftIconColor}`}
        aria-label="Previous state"
      >
        <ChevronLeft />
      </button>

      {/* Text Label */}
      <span className={`${styles.textBase} ${config.textColor}`}>
        {config.label}
      </span>

      {/* Right Chevron */}
      <button 
        onClick={handleNext} 
        disabled={isLast}
        className={`${styles.iconButton} ${rightIconColor}`}
        aria-label="Next state"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default StateCarousel;
