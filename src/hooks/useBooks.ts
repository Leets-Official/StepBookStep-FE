import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getBookDetail, searchBooks, filterBooks } from "@/api/books";
import type { FilterBooksParams } from "@/api/types";

/**
 * 도서 상세 정보 조회 훅
 */
export const useBookDetail = (bookId: number, enabled = true) => {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBookDetail(bookId),
    enabled: enabled && !!bookId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * - /books/search API 사용
 * - 서버에서 자동으로 유저 레벨에 맞는 랜덤 4권을 보여줌
 * - 무한 스크롤 아님~
 */
export const useRecommendedBooks = () => {
  return useQuery({
    queryKey: ["books", "recommended"],
    queryFn: () => searchBooks(), // 파라미터 없이 호출 -> 랜덤 4권 반환
    staleTime: 0, // 랜덤 추천이므로 캐싱을 끄거나 짧게 설정 (매번 새로운 책 추천)
  });
};

/**
 * 도서 필터 검색 무한 스크롤 훅 (필터 적용 시)
 * /books/filter API 사용
 */
export const useSearchBooksInfinite = (params: FilterBooksParams) => {
  return useInfiniteQuery({
    queryKey: ["books", "filter", params],
    queryFn: ({ pageParam }) =>
      filterBooks({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      if (lastPage.books.length === 0) return undefined;
      return lastPage.books[lastPage.books.length - 1].bookId;
    },
    enabled: true,
  });
};

/**
 * 단순 도서 검색 훅 (검색어만 있을 때)
 * - /books/search API 사용 (키워드 포함)
 * - 페이지네이션 없음 (리스트 반환)
 */
export const useSearchBooks = (keyword: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["books", "search", keyword],
    queryFn: () => searchBooks({ keyword }),
    enabled: enabled && !!keyword,
    staleTime: 1 * 60 * 1000,
  });
};
