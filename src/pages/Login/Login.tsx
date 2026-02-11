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
  const processingRef = useRef(false);
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    initKakao();

    const code = searchParams.get("code");
    if (code && !processingRef.current) {
      processingRef.current = true;
      handleCodeExchange(code);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  const handleCodeExchange = async (code: string) => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("client_id", import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
      params.append("redirect_uri", window.location.origin + "/login");
      params.append("code", code);

      const res = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: params,
      });

      const data = await res.json();
      if (!res.ok || !data.access_token) {
        throw new Error("카카오 토큰 발급 실패");
      }

      await handleBackendLogin(data.access_token);
    } catch (e: any) {
      alert(e.message);
      navigate("/login", { replace: true });
    } finally {
      setIsLoading(false);
      processingRef.current = false;
    }
  };

  const handleBackendLogin = async (kakaoAccessToken: string) => {
    const res = await kakaoLoginCallback(kakaoAccessToken);

    const { accessToken, refreshToken, nickname, signupType, email } = res.data;

    saveTokens(accessToken, refreshToken);

    setUserInfo({
      nickname,
      email,
      level: 1,
    });

    if (signupType !== "EXISTING") {
      navigate("/onboarding/set-profile", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <main className="flex flex-col items-center justify-center flex-1 px-5">
          <img src="/images/Login.png" className="w-80.75 h-80.75 mb-12" />
          <h1 className={S.loginTitle}>
            만만한 책부터
            <br />
            탄탄한 습관까지
          </h1>
          <p className={S.loginSubTitle}>한 단계씩 쌓아가는 나의 독서 습관</p>

          <div className="mt-6">
            {!isLoading ? (
              <Kakao onClick={loginWithKakao} />
            ) : (
              <div className="animate-spin h-8 w-8 border-b-2 border-yellow-400 rounded-full" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
