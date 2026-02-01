import { Logo2Icon, OriginLogoIcon } from "@/assets/icons";
import * as S from "./Login.styles";

export default function Splash() {
  return (
    <div className={S.pageWrapper}>
      <div className={`${S.appFrame} justify-center items-center gap-4`}>
        <Logo2Icon />
        <OriginLogoIcon />
      </div>
    </div>
  );
}
