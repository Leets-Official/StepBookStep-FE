// 카카오 SDK 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

// 카카오 SDK 초기화
export const initKakao = () => {
  const kakaoKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  
  if (!kakaoKey) {
    console.error('Kakao JavaScript key is not set in environment variables');
    return;
  }
  
  if (window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
      console.log('카카오 SDK 초기화 완료');
    }
  } else {
    console.error('Kakao SDK is not loaded');
  }
};

// 카카오 로그인 함수
export const loginWithKakao = () => {
  if (!window.Kakao) return;

  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:5173/login', 
  });
};

// 카카오 로그아웃
export const logoutKakao = () => {
  if (window.Kakao?.Auth) {
    window.Kakao.Auth.logout(() => {
      console.log('카카오 로그아웃 완료');
    });
  }
};

/**
 * 인가 코드를 카카오 액세스 토큰으로 교환하는 함수
 */
export const exchangeCodeForToken = async (code: string) => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY; // [주의] REST API 키가 필요합니다!
  const REDIRECT_URI = 'http://localhost:5173/login';

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', REST_API_KEY);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('code', code);

  params.append('client_secret', import.meta.env.VITE_KAKAO_CLIENT_SECRET);

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: params,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || '토큰 교환 실패');
  }

  return data.access_token; 
};
