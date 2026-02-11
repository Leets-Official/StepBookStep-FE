import apiClient from "@/api/clients";

export interface CheckNicknameResponse {
  nickname: string;
  available: boolean;
}

export const checkNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const res = await apiClient.get<CheckNicknameResponse>("/users/check", {
    params: { nickname },
  });

  return res.data;
};
