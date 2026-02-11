import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookGoal, getRoutines } from "@/api/readings";
import { getBookDetail } from "@/api/books";
import { createReadingLog, updateBookGoal, getReadingDetail } from "@/api/readings";
import type { CreateReadingLogRequest, UpdateGoalRequest } from "@/api/types";

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

/** 4. 독서 기록 생성 훅 */
export const useCreateReadingLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookId, data }: { bookId: number; data: CreateReadingLogRequest }) => 
      createReadingLog(bookId, data),
    onSuccess: (_, variables) => {
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['bookDetail', variables.bookId] });
      queryClient.invalidateQueries({ queryKey: ['goal', variables.bookId] });
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });
};

/** 6. 독서 목표 생성/수정/삭제 훅 */
export const useUpdateBookGoal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookId, data }: { bookId: number; data: UpdateGoalRequest }) => 
      updateBookGoal(bookId, data),
    onSuccess: (_, variables) => {
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['goal', variables.bookId] });
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });
};

/** [NEW] 7. 독서 기록 상세 조회 훅 */
export const useReadingDetail = (bookId: number) => {
  return useQuery({
    queryKey: ['readingDetail', bookId],
    queryFn: () => getReadingDetail(bookId),
    enabled: !!bookId, // bookId가 있을 때만 실행
  });
};
