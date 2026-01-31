import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookDetail, addBookmark, removeBookmark } from '@/api/books';

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

/**
 * 북마크 추가/제거 훅
 */
export const useBookmark = () => {
  const queryClient = useQueryClient();
  
  const addMutation = useMutation({
    mutationFn: (bookId: number) => addBookmark(bookId),
    onSuccess: (_, bookId) => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
    },
  });
  
  const removeMutation = useMutation({
    mutationFn: (bookId: number) => removeBookmark(bookId),
    onSuccess: (_, bookId) => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
    },
  });
  
  return {
    addBookmark: addMutation.mutate,
    removeBookmark: removeMutation.mutate,
    isLoading: addMutation.isPending || removeMutation.isPending,
  };
};