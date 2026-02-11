import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";
import { TextField } from "@/components/TextField/TextField";
import { Button } from "@/components/Button/Button";
import { ChevronLeftIcon } from "@/assets/icons";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { checkNickname } from "@/api/user";
import { getNicknameErrorMessage } from "@/utils/nickname";

import {
  pageWrapper,
  appFrame,
  header,
  backButton,
  content,
  title,
  description,
  fieldWrapper,
  bottomAction,
} from "./SetProfile.styles";

export default function SetProfile() {
  const [nickname, setNickname] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setNickname: saveNickname } = useOnboardingStore();

  const handleNext = async () => {
    setError(null);
    setAvailable(null);

    const errorMessage = getNicknameErrorMessage(nickname);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      setChecking(true);
      const res = await checkNickname(nickname);

      if (!res.available) {
        setError("이미 사용 중인 닉네임이에요.");
        setAvailable(false);
        return;
      }

      setAvailable(true);
      saveNickname(nickname);
      navigate("/onboarding/level/step-1");
    } catch {
      setError("닉네임 확인 중 오류가 발생했어요.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className={pageWrapper}>
      <div className={appFrame}>
        <div className={header}>
          <button className={backButton} onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="px-5 py-1">
          <SegmentedProgress current={1} />
        </div>

        <div className={content}>
          <h1 className={title}>어떻게 불러드릴까요?</h1>
          <p className={description}>설정에서 다시 변경할 수 있어요.</p>

          <div className={fieldWrapper}>
            <TextField
              title="닉네임"
              placeholder="2~15자 내로 작성해 주세요."
              helpText={
                <>
                  한글, 영문, 숫자만 사용할 수 있어요.
                  <br />
                  특수문자는 사용할 수 없어요.
                  {error && (
                    <>
                      <br />
                      <span style={{ color: "#EF4444" }}>{error}</span>
                    </>
                  )}
                  {available && (
                    <>
                      <br />
                      <span style={{ color: "#22C55E" }}>사용 가능한 닉네임이에요!</span>
                    </>
                  )}
                </>
              }
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError(null);
                setAvailable(null);
              }}
              icon={false}
            />
          </div>
        </div>

        <div className={bottomAction}>
          <Button
            label={checking ? "확인 중..." : "다음"}
            fullWidth
            disabled={!nickname || checking}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
