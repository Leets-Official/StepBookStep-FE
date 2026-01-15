import { useState } from "react";
import Segment from "@/components/Segment/Segment";
import type { SegmentValue } from "@/components/Segment/Segment";

export default function PlayGround() {
  const [value, setValue] = useState<SegmentValue>("day");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[320px]">
        <Segment value={value} onChange={setValue} />
      </div>
    </div>
  );
}
