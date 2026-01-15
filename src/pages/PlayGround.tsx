import { useState } from "react";
import Segment from "@/components/Segment/Segment";
import type { SegmentValue } from "@/components/Segment/Segment";

import Toggle from "@/components/Toggle/Toggle";

export default function PlayGround() {
  const [value, setValue] = useState<SegmentValue>("day");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[320px] space-y-6">
        {/* 기존 Segment 예시 */}
        <Segment value={value} onChange={setValue} />

        {/* Toggle 예시 */}
        <Toggle maxPages={320} />
      </div>
    </div>
  );
}
