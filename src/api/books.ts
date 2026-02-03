import apiClient from "./clients";
import type {
  ApiResponse,
  BookDetailResponse,
  SearchBooksParams,
  BookSearchItem,
  FilterBooksParams,
  FilterBooksResponse,
} from "./types";

/**
 * 도서 상세 조회
 * GET /api/v1/books/{bookId}
 * - 도서 ID로 상세 정보를 조회(북마크 여부 포함)
 */
export const getBookDetail = async (bookId: number): Promise<BookDetailResponse> => {
  const response = await apiClient.get<ApiResponse<BookDetailResponse>>(`/books/${bookId}`);

  return response.data.data;
};

/**
 * 도서 검색 (단순 검색 및 추천)
 * GET /api/v1/books/search
 * - 키워드 입력 시: 제목, 저자, 출판사에서 검색
 * - 키워드 미입력 시: 사용자 등급에 맞는 추천 도서 4권 반환 (페이징 없음)
 */
export const searchBooks = async (params?: SearchBooksParams): Promise<BookSearchItem[]> => {
  const response = await apiClient.get<ApiResponse<BookSearchItem[]>>("/books/search", { params });

  return response.data.data;
};

/**
 * 도서 필터 검색 (무한 스크롤)
 * GET /api/v1/books/filter
 * - 난이도, 분량, 국가, 장르, 키워드 등의 조건으로 도서를 검색
 * - 커서 기반 페이지네이션을 지원
 */
export const filterBooks = async (params?: FilterBooksParams): Promise<FilterBooksResponse> => {
  const response = await apiClient.get<ApiResponse<FilterBooksResponse>>("/books/filter", {
    params,
  });

  return response.data.data;
};
