import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@/components/AppBar/AppBar";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { KakaoIcon } from "@/assets/icons";

import * as S from "./Setting.styles";

export default function Setting() {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="none" title="설정" onBackClick={() => history.back()} />

        <main className={S.content}>
          {/* 내 정보 */}
          <section className={S.section}>
            <p className={S.sectionTitle}>내 정보</p>

            {/* 연결된 계정 */}
            <div className={S.kakaoRow}>
              <span className={S.label}>연결된 계정</span>

              <div className={S.kakaoRight}>
                <KakaoIcon className={S.kakaoIcon} />
                <span className={S.value}>gbo@gmail.com</span>
              </div>
            </div>

            {/* 닉네임 수정 */}
            <button className={S.rowButton} onClick={() => navigate("/setting/nickname")}>
              <span className={S.label}>닉네임 수정</span>
              <span className={S.chevron}>›</span>
            </button>

            {/* 선호 레벨/분야 수정 (추후 구현) */}
            <button className={S.rowButton}>
              <span className={S.label}>선호 레벨/분야 수정</span>
              <span className={S.chevron}>›</span>
            </button>
          </section>

          <div className={S.divider} />

          {/* 기타 */}
          <section className={S.section}>
            <p className={S.sectionTitle}>기타</p>

            <div className={S.row}>
              <span className={S.label}>버전 정보</span>
              <span className={S.value}>1.0.0</span>
            </div>

            <button className={S.rowButton} onClick={() => setIsLogoutOpen(true)}>
              <span className={S.label}>로그아웃</span>
            </button>

            {/* 회원 탈퇴 */}
            <button className={S.rowButton} onClick={() => setIsWithdrawOpen(true)}>
              <span className={S.withdraw}>회원 탈퇴</span>
            </button>
          </section>
        </main>
      </div>

      {/* 로그아웃 확인 모달 */}
      <ConfirmModal
        open={isLogoutOpen}
        title="로그아웃 하시겠습니까?"
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          // TODO: 로그아웃 API 연동
        }}
      />

      {/* 탈퇴 확인 모달 */}
      <ConfirmModal
        open={isWithdrawOpen}
        title="정말 탈퇴하시겠어요?"
        description={`회원 탈퇴 시 독서 기록 및 계정 정보가 삭제되며 복구할 수 없습니다.`}
        onCancel={() => setIsWithdrawOpen(false)}
        onConfirm={() => {
          // TODO: 회원 탈퇴 API 연동
        }}
      />
    </div>
  );
}
