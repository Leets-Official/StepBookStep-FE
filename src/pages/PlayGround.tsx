<<<<<<< Updated upstream
import StateCarousel from "@/components/StateCarousel/StateCarousel";
import type{ ReadingStatus } from "@/components/StateCarousel/StateCarousel.types";
import { useState } from "react";

const PlayGround = () => {
  const [, setCurrentStatus] = useState<ReadingStatus>("BEFORE");

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
=======
import { ReadingStateDetail } from "@/components/ReadingStateDetail/ReadingStateDetail";
import { MOCK_READING_DATA, MOCK_COMPLETED_DATA } from "@/mocks/readingState.mock";
export default function PlayGround() {

  return (
         <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
          <section>
            <h2 className="mb-4 text-gray-400">읽는 중 상태</h2>
            <ReadingStateDetail data={MOCK_READING_DATA} />
          </section>

          <section>
            <h2 className="mb-4 text-gray-400">완독 상태</h2>
            <ReadingStateDetail data={MOCK_COMPLETED_DATA} />
          </section>
        </div>
>>>>>>> Stashed changes
  );
};

export default PlayGround;
