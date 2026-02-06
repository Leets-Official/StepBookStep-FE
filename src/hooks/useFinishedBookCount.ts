import { useEffect, useState } from "react";
import { getStatistics } from "@/api/statistics";

export function useFinishedBookCount() {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    async function fetchCount() {
      try {
        const stats = await getStatistics();
        setCount(stats.bookSummary.finishedBookCount || 1);
      } catch {
        setCount(1);
      }
    }
    fetchCount();
  }, []);

  return count;
}
