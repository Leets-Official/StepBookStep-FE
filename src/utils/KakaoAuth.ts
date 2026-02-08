interface KakaoAuth {
  authorize: (options: { redirectUri: string }) => void;
  logout: (callback: () => void) => void;
}

interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
}

declare global {
  interface Window {
    Kakao: Kakao | undefined;
  }
}

export const initKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    console.log("카카오 SDK 초기화 완료");
  }
};

export const loginWithKakao = () => {
  if (!window.Kakao) return;

  const redirectUri = window.location.origin + "/login";
  window.Kakao.Auth.authorize({ redirectUri });
};

export const logoutKakao = () => {
  window.Kakao?.Auth.logout(() => {
    console.log("카카오 로그아웃 완료");
  });
};
