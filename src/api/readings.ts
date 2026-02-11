import apiClient from "./clients";
import type {
  ApiResponse,
  RoutineItem,
  RoutineListData,
  Goal,
  CreateReadingLogRequest,
  CreateReadingLogResponse,
  UpdateGoalRequest,
  ReadingDetailData,
} from "./types";

/**
 * 루틴 목록 조회
 * GET /api/v1/routines
 * * 루틴 탭에서 '지금 읽고 있어요' 목록을 불러올 때 사용
 */
export const getRoutines = async (): Promise<RoutineItem[]> => {
  const response = await apiClient.get<ApiResponse<RoutineListData>>("/routines");

  return response.data.data.routines;
};

/**
 * 책 목표 조회
 * GET /api/v1/books/{bookId}/goals
 */
export const getBookGoal = async (bookId: number): Promise<Goal> => {
  const response = await apiClient.get<ApiResponse<Goal>>(`/books/${bookId}/goals`);

  return response.data.data;
};

/**
 * 독서 기록 생성
 * POST /api/v1/books/{bookId}/reading-logs
 */
export const createReadingLog = async (
  bookId: number,
  data: CreateReadingLogRequest,
): Promise<CreateReadingLogResponse> => {
  const response = await apiClient.post<ApiResponse<CreateReadingLogResponse>>(
    `/books/${bookId}/reading-logs`,
    data,
  );

  return response.data.data;
};

/**
 * 독서 목표 생성/수정/삭제
 * PATCH /api/v1/books/{bookId}/goals
 */

export const updateBookGoal = async (bookId: number, data: UpdateGoalRequest): Promise<Goal> => {
  const response = await apiClient.patch<ApiResponse<Goal>>(`/books/${bookId}/goals`, data);

  return response.data.data;
};

/**
 * [NEW] 독서 기록 상세 조회
 * GET /api/v1/books/{bookId}/reading-detail
 */

export const getReadingDetail = async (bookId: number): Promise<ReadingDetailData> => {
  const response = await apiClient.get<ApiResponse<ReadingDetailData>>(
    `/books/${bookId}/reading-detail`
  );
  return response.data.data;
};
