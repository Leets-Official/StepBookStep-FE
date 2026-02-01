import { useQuery } from '@tanstack/react-query';
import { getBookGoal, getRoutines } from '@/api/readings';
import { getBookDetail } from '@/api/books';

/** 1. 도서 상세 정보 조회 훅 */
export const useBookDetail = (bookId: number) => {
  return useQuery({
    queryKey: ['bookDetail', bookId],
    queryFn: () => getBookDetail(bookId),
    enabled: !!bookId,
  });
};

/** 2. 책 목표 조회 훅 */
export const useBookGoal = (bookId: number, enabled = true) => {
  return useQuery({
    queryKey: ['goal', bookId],
    queryFn: () => getBookGoal(bookId),
    enabled: enabled && !!bookId,
    retry: false, // 목표가 없을 때 404가 뜨는 경우를 대비
  });
};

/** 3. 루틴 목록 조회 훅 (RoutinePage용) */

export const useRoutines = () => {
  return useQuery({
    queryKey: ["routines"],
    queryFn: async () => {
      const data = await getRoutines(); 
      return data;
    },
  });
};

/** 4. 목표 생성/수정/삭제 훅 */
