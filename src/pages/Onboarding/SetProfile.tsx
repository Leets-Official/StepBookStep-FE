import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";
import { TextField } from "@/components/TextField/TextField";
import { Button } from "@/components/Button/Button";
import { ChevronLeftIcon } from "@/assets/icons";

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
  const navigate = useNavigate();

  const isButtonActive = nickname.length > 0;

  const handleNext = () => {
    navigate("/onboarding/level/step-1", {
      state: {
        nickname,
      },
    });
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              icon={false}
            />
          </div>
        </div>

        <div className={bottomAction}>
          <Button label="다음" fullWidth disabled={!isButtonActive} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
