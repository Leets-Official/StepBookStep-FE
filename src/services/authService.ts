const API_BASE_URL = import.meta.env.VITE_STEPBOOKSTEP_BASE_URL ;

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
    newUser: boolean;
  };
  error?: Array<{
    field: string;
    message: string;
  }>;
}

// ===== API 호출 함수 =====

/**
 * 카카오 로그인 API 호출
 */
export const kakaoLogin = async (
  socialToken: string,
  fcmToken: string = ''
): Promise<LoginResponse> => {
  try {
    console.log('백엔드 로그인 API 호출 시작...');
    
    const response = await fetch(`${API_BASE_URL}/auth/login/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialToken,
        fcmToken,
      }),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      console.error('API 응답 에러:', response.status, data);
      throw new Error(data.message || `로그인 실패: ${response.status}`);
    }

    if (!data.success) {
      console.error('로그인 실패:', data.message);
      throw new Error(data.message || '로그인에 실패했습니다.');
    }

    console.log('로그인 성공!');
    console.log('닉네임:', data.data.nickname);
    console.log('신규 유저:', data.data.newUser);
    
    return data;
  } catch (error) {
    console.error('로그인 API 호출 중 에러:', error);
    throw error;
  }
};

// ===== 토큰 관리 함수 =====

/**
 * 토큰을 localStorage에 저장
 */
export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  console.log('토큰 저장 완료');
};

/**
 * accessToken 가져오기
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

/**
 * refreshToken 가져오기
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

/**
 * 로그인 상태 확인
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

/**
 * 토큰 삭제 (로그아웃)
 */
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  console.log('토큰 삭제 완료');
};

/**
 * 로그아웃 (토큰 삭제 + Zustand store 초기화)
 */
export const logout = (resetUserStore?: () => void) => {
  clearTokens();
  if (resetUserStore) {
    resetUserStore();
  }
};
