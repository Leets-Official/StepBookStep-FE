import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getBookDetail, searchBooks, filterBooks } from "@/api/books";
import type { FilterBooksParams } from "@/api/types";

export const useBookDetail = (bookId: number, enabled = true) => {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBookDetail(bookId),
    enabled: enabled && !!bookId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useRecommendedBooks = () => {
  return useQuery({
    queryKey: ["books", "recommended"],
    queryFn: () => searchBooks(),
    staleTime: 10 * 60 * 1000,
  });
};

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
