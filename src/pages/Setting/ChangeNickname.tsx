import { useState } from "react";

import AppBar from "@/components/AppBar/AppBar";
import TextField from "@/components/TextField/TextField";
import Button from "@/components/Button/Button";
import { Toast } from "@/components/Toast/Toast";

import * as S from "./Setting.styles";

export default function ChangeNickname() {
  // 현재(기존) 닉네임
  const [currentNickname, setCurrentNickname] = useState("기존 닉네임");

  // 새 닉네임 입력값
  const [newNickname, setNewNickname] = useState("");

  // 토스트 노출 여부
  const [showToast, setShowToast] = useState(false);

  // 버튼 활성화 조건
  const isDisabled = newNickname.trim().length === 0;

  const handleSubmit = () => {
    if (isDisabled) return;

    // 1️⃣ 기존 닉네임을 새 닉네임으로 갱신
    setCurrentNickname(newNickname);

    // 2️⃣ 새 닉네임 입력 초기화 → 버튼 다시 disabled
    setNewNickname("");

    // 3️⃣ 토스트 표시
    setShowToast(true);
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="none" title="닉네임 수정" onBackClick={() => history.back()} />

        <main className={S.content}>
          <section className={S.section}>
            {/* 기존 닉네임 */}
            <p className={S.inputLabel}>기존 닉네임</p>
            <TextField value={currentNickname} disabled icon={false} />

            {/* 새 닉네임 */}
            <p className={S.inputLabel}>새 닉네임</p>
            <TextField
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="2~15자 이내로 작성해주세요."
              state="default"
              icon={false}
            />

            {/* 안내 문구 */}
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
              isVisible={true}
              message="닉네임이 변경되었습니다."
              onClose={() => setShowToast(false)}
            />
          </div>
        )}

        {/* 하단 버튼 */}
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
