import apiClient from './clients';
import type { ApiResponse, BookDetailResponse, SearchBooksParams, BookSearchItem, FilterBooksParams, FilterBooksResponse } from './types';

/**
 * 도서 상세 조회
 * GET /api/v1/books/{bookId}
 */
export const getBookDetail = async (bookId: number): Promise<BookDetailResponse> => {
  const response = await apiClient.get<ApiResponse<BookDetailResponse>>(
    `/books/${bookId}`
  );
  
  return response.data.data;
};

/**
 * 도서 검색
 * GET /api/v1/books/search
 */

export const searchBooks = async (params?: SearchBooksParams): Promise<BookSearchItem[]> => {
  const response = await apiClient.get<ApiResponse<BookSearchItem[]>>(
    '/books/search',
    { params }
  );
  
  return response.data.data;
};


/**
 * 도서 필터 검색
 * GET /api/v1/books/filter
 */
export const filterBooks = async (params?: FilterBooksParams): Promise<FilterBooksResponse> => {
  const response = await apiClient.get<ApiResponse<FilterBooksResponse>>(
    '/books/filter',
    { params }
  );
  
  return response.data.data;
};
