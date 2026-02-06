import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Kakao } from "@/components/Kakao/Kakao";
import { initKakao, loginWithKakao } from "@/utils/KakaoAuth";
import { kakaoLoginCallback, saveTokens } from "@/services/authService";
import { useUserStore } from "@/stores/useUserStore";
import * as S from "./Login.styles";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const processingRef = useRef(false); // StrictMode 중복 방지
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    initKakao();

    const authCode = searchParams.get("code");

    if (authCode && !processingRef.current) {
      processingRef.current = true;
      handleCodeExchange(authCode);

      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  const handleCodeExchange = async (code: string) => {
    try {
      setIsLoading(true);
      console.log("카카오 토큰 교환 시작...");

      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("client_id", import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
      params.append("redirect_uri", window.location.origin + "/login");
      params.append("code", code);

      const response = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: params,
      });

      const data = await response.json();

      if (!response.ok || !data.access_token) {
        throw new Error(data.error_description || "카카오 토큰 발급 실패");
      }

      console.log("Access Token 발급 성공");

      await handleBackendLogin(data.access_token);
    } catch (error: any) {
      console.error("로그인 프로세스 에러:", error);
      alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
      setIsLoading(false);
      processingRef.current = false; // 실패 시 재시도 허용
      navigate("/login", { replace: true });
    }
  };

  const handleBackendLogin = async (token: string) => {
    try {
      const response = await kakaoLoginCallback(token);
      console.log("전체 응답 데이터:", response.data);

      const { accessToken, refreshToken, nickname, isNewUser } = response.data;
      const hasDefaultNickname = nickname === "사용자";

      saveTokens(accessToken, refreshToken);
      setUserInfo({
        nickname,
        level: 1,
      });

      localStorage.setItem("isNewUser", String(isNewUser));

      if (isNewUser || hasDefaultNickname) {
        navigate("/onboarding/set-profile", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (error: any) {
      console.error("백엔드 로그인 실패:", error.message);
      alert("로그인 처리 중 오류가 발생했습니다.");
      navigate("/login", { replace: true });
    } finally {
      setIsLoading(false);
      processingRef.current = false;
    }
  };

  const handleKakaoLogin = () => {
    console.log("카카오 인증 페이지로 이동...");
    loginWithKakao();
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <main className="flex flex-col items-center justify-center flex-1 px-5">
          <div className="mb-12">
            <img src="/images/Login.png" alt="Reading Character" className="w-80.75 h-80.75" />
          </div>

          <div className="text-center mb-10">
            <h1 className={S.loginTitle}>
              만만한 책부터
              <br />
              탄탄한 습관까지
            </h1>
            <p className={S.loginSubTitle}>한 단계씩 쌓아가는 나의 독서 습관</p>
          </div>

          <div className="mt-3">
            {!isLoading ? (
              <Kakao onClick={handleKakaoLogin} />
            ) : (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mb-2"></div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
