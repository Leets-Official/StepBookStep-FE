import { clappingGif } from "@/assets/icons";
import * as S from "./FinishedModal.styles";

interface FinishedModalProps {
  onClose: () => void;
  count?: number;
}

export const FinishedModal = ({ onClose, count = 1 }: FinishedModalProps) => {
  return (
    <div className={S.overlay} onClick={onClose}>
      <div className={S.container} onClick={(e) => e.stopPropagation()}>
        <img src={clappingGif} alt="완독 축하" className={S.gifImage} />

        <div className={S.textWrapper}>
          <h2 className={S.title}>
            <span className={S.highlight}>{count}번째</span> 완독했어요!
          </h2>
          <p className={S.subTitle}>
            끝까지 읽었어요! 정말 대단해요.<br />
            꾸준히 읽는 습관이 쌓이고 있어요.
          </p>
        </div>

        <button type="button" onClick={onClose} className={S.linkButton}>
          다른 책 보러 가기
        </button>
      </div>
    </div>
  );
};
