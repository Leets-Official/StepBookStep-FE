import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // 파라미터 읽기용 추가
import { Kakao } from "@/components/Kakao/Kakao";
import { initKakao, loginWithKakao, exchangeCodeForToken } from "@/utils/KakaoAuth";
import { kakaoLogin, saveTokens } from "@/services/authService";
import { useUserStore } from "@/stores/useUserStore";
import * as S from "./Login.styles";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const processingRef = useRef(false);
  const { setUserInfo } = useUserStore();

  // 1. 초기화 및 리다이렉트된 "코드" 처리
  useEffect(() => {
    initKakao();

    // 카카오에서 돌아왔을 때 URL에 포함된 'code' 파라미터 확인
    const authCode = searchParams.get("code");

    if (authCode && !processingRef.current) {
      processingRef.current = true;
      handleBackendLogin(authCode);

      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  /**
   * [2단계] 카카오 인증 코드를 백엔드에 전달하여 로그인 완료
   */
  const handleBackendLogin = async (authCode: string) => {
    try {
      setIsLoading(true);
      const socialToken = await exchangeCodeForToken(authCode);

      // authService의 kakaoLogin 호출
      const response = await kakaoLogin(socialToken);
      console.log("전체 응답 데이터:", response.data);

      const isNewUser = response.data.isNewUser;
      const hasDefaultNickname = response.data.nickname === "사용자";

      saveTokens(response.data.accessToken, response.data.refreshToken);
      setUserInfo(response.data.nickname, 1);

      localStorage.setItem("isNewUser", String(isNewUser));

      if (isNewUser || hasDefaultNickname) {
        navigate("/onboarding/set-profile", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (error: any) {
      console.error("백엔드 로그인 실패:", error.message);
      alert("로그인 처리 중 오류가 발생했습니다.");
      // 에러 발생 시 URL의 파라미터를 지우기 위해 경로 초기화
      navigate("/login", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * [1단계] 카카오 로그인 버튼 클릭 (카카오 서버로 리다이렉트)
   */
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
