import { useQuery } from '@tanstack/react-query';
import { getBookDetail } from '@/api/books';

/**
 * 도서 상세 정보 조회 훅
 */
export const useBookDetail = (bookId: number, enabled = true) => {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookDetail(bookId),
    enabled: enabled && !!bookId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 2,
  });
};
