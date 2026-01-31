import { Kakao } from "@/components/Kakao/Kakao";
import * as S from "./Login.styles";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 연결
    console.log("카카오 로그인 시작");
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <main className="flex flex-col items-center justify-center flex-1 px-5">
          <div className="mb-12">
            <img 
              src="/images/Login.png" 
              alt="Reading Character" 
              className="w-[280px] h-auto"
            />
          </div>

          <div className="text-center mb-10">
            <h1 className={S.loginTitle}>
              만만한 책부터<br />탄탄한 습관까지
            </h1>
            <p className={S.loginSubTitle}>
              한 단계씩 쌓아가는 나의 독서 습관
            </p>
          </div>

          <div className="mt-3">
            <Kakao onClick={handleKakaoLogin} />
          </div>
        </main>
      </div>
    </div>
  );
}
