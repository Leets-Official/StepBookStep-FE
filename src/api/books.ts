import apiClient from './clients';
import type { ApiResponse, BookDetailResponse } from './types';

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
 * 도서 북마크 추가 (Swagger 확인 필요)
 * POST /api/v1/books/{bookId}/bookmark
 */
export const addBookmark = async (bookId: number): Promise<void> => {
  await apiClient.put(`/books/${bookId}/bookmark`);
};

/**
 * 도서 북마크 제거 (Swagger 확인 필요)
 * DELETE /api/v1/books/{bookId}/bookmark
 */
export const removeBookmark = async (bookId: number): Promise<void> => {
  await apiClient.delete(`/books/${bookId}/bookmark`);
};
