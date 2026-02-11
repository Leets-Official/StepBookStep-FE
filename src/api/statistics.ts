import apiClient from './clients';
import type { ApiResponse, StatisticsResponse, GetStatisticsParams } from './types';

/**
 * 통계 조회
 * GET /api/v1/statistics
 */

export const getStatistics = async (params?: GetStatisticsParams): Promise<StatisticsResponse> => {
  const response = await apiClient.get<ApiResponse<StatisticsResponse>>(
    '/statistics',
    { params }
  );
  
  return response.data.data;
};
