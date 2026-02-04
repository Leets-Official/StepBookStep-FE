import AppBar from "@/components/AppBar/AppBar";
import TextField from "@/components/TextField/TextField";
import * as S from "./Setting.styles";
import { useState } from "react";

export default function ChangeNickname() {
  const [newNickname, setNewNickname] = useState("");

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="none" title="닉네임 수정" onBackClick={() => history.back()} />

        <main className={S.content}>
          <section className={S.section}>
            {/* 기존 닉네임 */}
            <p className={S.inputLabel}>기존 닉네임</p>
            <TextField value="기존 닉네임" disabled icon={false} />

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
      </div>
    </div>
  );
}
