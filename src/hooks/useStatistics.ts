import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '@/api/statistics';

/**
 * 통계 조회 훅
 */
export const useStatistics = (year?: number) => {
  return useQuery({
    queryKey: ['statistics', year],
    queryFn: () => getStatistics(year ? { year } : undefined),
    staleTime: 5 * 60 * 1000, 
  });
};
