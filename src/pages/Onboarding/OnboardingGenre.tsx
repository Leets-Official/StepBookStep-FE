import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";
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
  chip,
  chipActive,
  bottomAction,
} from "./OnboardingGenre.styles";
import { cn } from "@/utils/cn.ts";

const GENRES = [
  "한국소설",
  "영미소설",
  "중국소설",
  "일본소설",
  "프랑스소설",
  "독일소설",
  "로맨스",
  "역사소설",
  "무협소설",
  "판타지/환상문학",
  "추리/미스터리",
  "희곡",
  "라이트노벨",
  "과학소설(SF)",
  "액션/스릴러",
  "호러/공포소설",
];

const UNKNOWN = "잘 모르겠어요";

export default function OnboardingGenre() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const hasUnknown = selected.includes(UNKNOWN);
  const hasOther = selected.some((g) => g !== UNKNOWN);

  const toggleGenre = (genre: string) => {
    if (genre === UNKNOWN) {
      if (hasUnknown) {
        setSelected([]);
      } else {
        setSelected([UNKNOWN]);
      }
      return;
    }

    if (hasUnknown) return;

    setSelected((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      }

      if (prev.length >= 3) return prev;

      return [...prev, genre];
    });
  };

  const isNextEnabled = selected.length > 0 && (hasUnknown || selected.length === 3);

  return (
    <div className={pageWrapper}>
      <div className={appFrame}>
        <div className={header}>
          <button className={backButton} onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="px-5 py-1">
          <SegmentedProgress current={5} />
        </div>

        <div className={content}>
          <h1 className={title}>좋아하는 도서 분류를 3개 골라주세요</h1>
          <p className={description}>나중에 마이페이지에서 선택해도 괜찮아요</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {GENRES.map((genre) => {
              const active = selected.includes(genre);

              return (
                <button
                  key={genre}
                  className={`${chip} ${active ? chipActive : ""}`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              );
            })}

            <Button
              label={UNKNOWN}
              size="small"
              variant={hasUnknown ? "ghost" : "secondaryOutline"}
              disabled={hasOther}
              onClick={() => toggleGenre(UNKNOWN)}
              className={cn(
                "rounded-full",
                !hasUnknown && !hasOther && "bg-white text-gray-700 border border-lime-600",
                hasUnknown && "bg-lime-400/60 border border-lime-600 text-purple-800",
              )}
            />
          </div>
        </div>

        <div className={bottomAction}>
          <Button
            label="다음"
            fullWidth
            disabled={!isNextEnabled}
            onClick={() => {
              console.log("선택한 취향:", selected);
              navigate("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}
