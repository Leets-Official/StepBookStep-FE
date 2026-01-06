import { useState } from "react";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";
import { LinearProgress } from "@/components/Progress/LinearProgress";

export default function PlayGround() {
  const [step3, setStep3] = useState(1);
  const [step2, setStep2] = useState(1);

  // 📘 책 페이지용
  const TOTAL_PAGES = 120;
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-white p-8 space-y-10">
      {/* 3단계 Progress */}
      <section className="space-y-4">
        <SegmentedProgress total={3} current={step3} />

        <div className="flex gap-2">
          <button
            onClick={() => setStep3((s) => Math.max(1, s - 1))}
            className="px-3 py-1 rounded bg-gray-200"
          >
            이전
          </button>

          <button
            onClick={() => setStep3((s) => Math.min(3, s + 1))}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            다음
          </button>
        </div>
      </section>

      {/* 2단계 Progress */}
      <section className="space-y-4">
        <SegmentedProgress total={2} current={step2} />

        <div className="flex gap-2">
          <button
            onClick={() => setStep2((s) => Math.max(1, s - 1))}
            className="px-3 py-1 rounded bg-gray-200"
          >
            이전
          </button>

          <button
            onClick={() => setStep2((s) => Math.min(2, s + 1))}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            다음
          </button>
        </div>
      </section>

      {/* 📘 페이지 Progress (추가된 부분) */}
      <section className="space-y-4">
        <LinearProgress total={TOTAL_PAGES} current={page} />

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded bg-gray-200"
          >
            이전 페이지
          </button>

          <button
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            다음 페이지
          </button>
        </div>
      </section>
    </div>
  );
}
