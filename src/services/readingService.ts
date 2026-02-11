import apiClient from '@/api/clients';
import type { ApiResponse } from '@/api/types';

/**
 * 루틴 생성 (새로운 루틴 추가)
 * POST /api/v1/routines
 */
export const createRoutine = async (bookId: number, targetAmount: number) => {
  const response = await apiClient.post<ApiResponse<any>>('/routines', {
    bookId: bookId,
    period: "DAILY",    // 임시 고정
    metric: "PAGE",     // 임시 고정
    targetAmount: targetAmount
  });
  return response.data;
};

/**
 * 루틴 삭제 
 * DELETE /api/v1/routines/{goalId}
 */
export const deleteRoutine = async (goalId: number) => {
  const response = await apiClient.delete<ApiResponse<any>>(`/routines/${goalId}`);
  return response.data;
};
