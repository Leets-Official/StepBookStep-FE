import { KakaoIcon } from '@/assets/icons';
import { cn } from "@/utils/cn";
import { kakaoBase, kakaoLayout } from "./Kakao.styles";

interface KakaoProps {
  onClick?: () => void;
}

export const Kakao = ({ onClick }: KakaoProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(kakaoBase, kakaoLayout.container, "bg-[#FEE500] border-none")}
    >
      <div className="flex items-center justify-center w-[18px] h-[18px]">
        <KakaoIcon />
      </div>

      <span className={cn(kakaoLayout.text, "text-[#191919]")}>
        카카오로 시작하기
      </span>
    </button>
  );
};