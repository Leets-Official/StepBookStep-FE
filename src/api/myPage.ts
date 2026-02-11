import apiClient from "./clients";
import type { MyBookParams, MyLibraryResponse } from "@/pages/MyPage/MyPage.types";

/**
 * 내 서재 목록 조회
 * GET /api/v1/my/books
 */
export const getMyBooks = async (params: MyBookParams): Promise<MyLibraryResponse> => {
  const response = await apiClient.get("/my/books", {
    params,
  });

  if (response.data && response.data.data) {
    return response.data.data;
  }
  return response.data;
};
