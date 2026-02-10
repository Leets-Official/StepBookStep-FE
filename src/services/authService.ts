import apiClient from "@/api/clients";

// ===== 타입 정의 =====

export interface LoginRequest {
  socialToken: string;
  fcmToken: string;
}

export interface LoginResponse {
  success: boolean;
  status: number;
  code: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    email: string;
    isNewUser: boolean;
  };
  error?: Array<{
    field: string;
    message: string;
  }>;
}

// ===== API 호출 =====

export const kakaoLoginCallback = async (
  token: string,
  fcmToken: string = "",
): Promise<LoginResponse> => {
  console.log("백엔드 카카오 로그인 API 호출");

  const { data } = await apiClient.post<LoginResponse>("/auth/login/kakao", {
    socialToken: token,
    fcmToken,
  } satisfies LoginRequest);

  if (!data.success) {
    throw new Error(data.message || "로그인에 실패했습니다.");
  }

  return data;
};

// ===== 토큰 관리 =====

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("토큰 저장 완료");
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const isAuthenticated = () => !!getAccessToken();

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const logout = async (resetUserStore?: () => void) => {
  try {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      await apiClient.post("/auth/logout", {
        refreshToken,
      });
    }
  } catch (error) {
    console.error("로그아웃 API 호출 실패:", error);
  } finally {
    clearTokens();
    resetUserStore?.();
  }
};
