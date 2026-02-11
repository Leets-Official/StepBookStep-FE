import { useState } from "react";

import AppBar from "@/components/AppBar/AppBar";
import TextField from "@/components/TextField/TextField";
import Button from "@/components/Button/Button";
import { Toast } from "@/components/Toast/Toast";

import * as S from "./Setting.styles";
import { patchNickname } from "@/api/settings";
import { useUserStore } from "@/stores/useUserStore";

export default function ChangeNickname() {
  const nickname = useUserStore((state) => state.nickname);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [newNickname, setNewNickname] = useState("");
  const [showToast, setShowToast] = useState(false);

  const isDisabled = newNickname.trim().length === 0;

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      await patchNickname(0, newNickname);
      setUserInfo({
        nickname: newNickname,
      });

      setNewNickname("");
      setShowToast(true);

      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("닉네임 변경 실패", error);
    }
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="none" title="닉네임 수정" onBackClick={() => history.back()} />

        <main className={S.content}>
          <section className={S.section}>
            <p className={S.inputLabel}>기존 닉네임</p>
            <TextField value={nickname ?? ""} disabled icon={false} />

            <p className={S.inputLabel}>새 닉네임</p>
            <TextField
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="2~15자 이내로 작성해주세요."
              state="default"
              icon={false}
            />

            <p className={S.helperText}>
              한글, 영문, 숫자만 사용할 수 있어요.
              <br />
              특수문자(@#$%^&*+=~`-_.)는 사용할 수 없어요.
            </p>
          </section>
        </main>

        {showToast && (
          <div className={S.toastWrapper}>
            <Toast
              isVisible
              message="닉네임이 변경되었습니다."
              onClose={() => setShowToast(false)}
            />
          </div>
        )}

        <Button
          label="수정하기"
          variant="primary"
          className={S.button}
          disabled={isDisabled}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
