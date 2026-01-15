import { useState } from "react";
import Segment from "@/components/Segment/Segment";
import type { SegmentValue } from "@/components/Segment/Segment";
import Toggle from "@/components/Toggle/Toggle";
import type { ToggleValue } from "@/components/Toggle/Toggle";
import GoalModal from "@/components/GoalModal/GoalModal";

export default function PlayGround() {
  const [segment, setSegment] = useState<SegmentValue>("day");

  const [type, setType] = useState<ToggleValue>("time");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(30);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="mt-10 w-[320px] space-y-6">
        <Segment value={segment} onChange={setSegment} />

        <Toggle
          maxPages={320}
          value={type}
          onChangeType={setType}
          hour={hour}
          minute={minute}
          page={page}
          onHourChange={setHour}
          onMinuteChange={setMinute}
          onPageChange={setPage}
        />
      </div>

      <div className="flex items-center justify-center mt-20">
        {open && (
          <GoalModal
            maxPages={320}
            title="목표 수정하기"
            onClose={() => setOpen(false)}
            onSave={() => {
              console.log({
                segment,
                type,
                hour,
                minute,
                page,
              });
              setOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
