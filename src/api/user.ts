import axios from "axios";

const BASE_URL = import.meta.env.VITE_STEPBOOKSTEP_BASE_URL;

export interface CheckNicknameResponse {
  nickname: string;
  available: boolean;
}

export const checkNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const res = await axios.get(`${BASE_URL}/users/check`, {
    params: { nickname },
    withCredentials: true,
  });

  return res.data;
};
