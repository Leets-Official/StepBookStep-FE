import { useState } from "react";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";

export default function PlayGround() {
  // 총 step = 1 + 3 + 1 = 5
  const MAX_STEP = 5;

  const [current, setCurrent] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
      {/* items-center 환경에서도 width 유지 */}
      <div className="w-[320px]">
        <SegmentedProgress current={current} />
      </div>

      <div className="text-sm text-gray-600">
        step {current} / {MAX_STEP}
      </div>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 rounded bg-gray-200"
          onClick={() => setCurrent((v) => Math.max(1, v - 1))}
        >
          - 단계
        </button>

        <button
          className="px-4 py-2 rounded bg-purple-500 text-white"
          onClick={() => setCurrent((v) => Math.min(MAX_STEP, v + 1))}
        >
          + 단계
        </button>
      </div>
    </div>
  );
}
