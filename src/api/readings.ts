import apiClient from './clients';
import type { ApiResponse, RoutineItem, RoutineListData, Goal } from './types';

/**
 * 루틴 목록 조회
 * GET /api/v1/routines
 * * 루틴 탭에서 '지금 읽고 있어요' 목록을 불러올 때 사용
 */
export const getRoutines = async (): Promise<RoutineItem[]> => {
  const response = await apiClient.get<ApiResponse<RoutineListData>>(
    '/routines'
  );
  
  return response.data.data.routines;
};

/**
 * 책 목표 조회
 * GET /api/v1/books/{bookId}/goals
 */
export const getBookGoal = async (bookId: number): Promise<Goal> => {
  const response = await apiClient.get<ApiResponse<Goal>>(
    `/books/${bookId}/goals`
  );
  
  return response.data.data;
};


/**
 * 목표 생성/수정/삭제
 * PATCH /api/v1/books/{bookId}/goals
 */

// 여기 수정/추가필요해요!! **************\
