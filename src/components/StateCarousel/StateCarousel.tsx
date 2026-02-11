import { useState } from "react";
import type { StateCarouselProps, ReadingStatus } from "@/components/StateCarousel/StateCarousel.types";
import { STATE_CONFIGS, CAROUSEL_ORDER, styles } from "@/components/StateCarousel/StateCarousel.styles";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons"

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
        <ChevronLeftIcon className="w-6 h-6" />
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
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default StateCarousel;
