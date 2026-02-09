import apiClient from "@/api/clients";
import type { ApiResponse } from "@/api/types";
import type { HomeResponse } from "@/types/home";

export const getHome = async (): Promise<HomeResponse> => {
  const res = await apiClient.get<ApiResponse<HomeResponse>>("/home");
  return res.data.data;
};
