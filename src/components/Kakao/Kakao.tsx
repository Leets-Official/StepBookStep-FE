import { KakaoIcon } from '@/assets/icons';
import { cn } from "@/utils/cn";
import { kakaoBase, kakaoLayout } from "@/components/Kakao/Kakao.styles";

interface KakaoProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Kakao = ({ onClick, disabled = false }: KakaoProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        kakaoBase, 
        kakaoLayout.container, 
        "bg-[#FEE500] border-none",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-center justify-center w-4.5 h-4.5">
        <KakaoIcon />
      </div>

      <span className={cn(kakaoLayout.text, "text-[#191919]")}>
        카카오로 시작하기
      </span>
    </button>
  );
};
