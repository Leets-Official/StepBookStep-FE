import StateCarousel from "@/components/StateCarousel/StateCarousel";
import type{ ReadingStatus } from "@/components/StateCarousel/StateCarousel.types";
import { useState } from "react";

const PlayGround = () => {
  const [currentStatus, setCurrentStatus] = useState<ReadingStatus>("BEFORE");

  const handleStatusChange = (newStatus: ReadingStatus) => {
    setCurrentStatus(newStatus);
    console.log("변경된 독서 상태:", newStatus);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12">

      {/* 테스트할 컴포넌트 */}
        <StateCarousel 
          initialStatus="BEFORE" 
          onChange={handleStatusChange} 
        />

    </div>
  );
};

export default PlayGround;