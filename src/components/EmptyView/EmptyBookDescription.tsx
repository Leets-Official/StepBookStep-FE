import { SpeechBubbleIcon, QuestionMarkIcon } from "@/assets/icons";
import * as S from "./EmptyBookDescription.styles";

export default function EmptyBookDescription() {
  return (
    <div className={S.container}>
      <div className={S.iconWrapper}>
        <SpeechBubbleIcon className={S.bubble} />
        <QuestionMarkIcon className={S.question} />
      </div>

      <p className={S.text}>책 소개가 등록되지 않았어요.</p>
    </div>
  );
}
