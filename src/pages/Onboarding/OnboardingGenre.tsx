import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SegmentedProgress } from "@/components/Progress/SegmentedProgress";
import { Button } from "@/components/Button/Button";
import { ChevronLeftIcon } from "@/assets/icons";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useUserStore } from "@/stores/useUserStore";

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
import { cn } from "@/utils/cn";

type GenreItem = {
  id: number;
  label: string;
  type: "CATEGORY" | "GENRE";
};

const GENRES: readonly GenreItem[] = [
  // 국가별 (categoryIds)
  { id: 50993, label: "한국소설", type: "CATEGORY" },
  { id: 50919, label: "영미소설", type: "CATEGORY" },
  { id: 50998, label: "일본소설", type: "CATEGORY" },
  { id: 50923, label: "중국소설", type: "CATEGORY" },
  { id: 50921, label: "프랑스소설", type: "CATEGORY" },
  { id: 50922, label: "독일소설", type: "CATEGORY" },

  // 장르별 (genreIds)
  { id: 50928, label: "판타지/환상문학", type: "GENRE" },
  { id: 50930, label: "과학소설(SF)", type: "GENRE" },
  { id: 50926, label: "추리/미스터리", type: "GENRE" },
  { id: 50933, label: "액션/스릴러", type: "GENRE" },
  { id: 50935, label: "로맨스", type: "GENRE" },
  { id: 50932, label: "무협소설", type: "GENRE" },
  { id: 50927, label: "라이트노벨", type: "GENRE" },
  { id: 50948, label: "희곡", type: "GENRE" },
  { id: 50929, label: "역사소설", type: "GENRE" },
  { id: 50931, label: "호러/공포소설", type: "GENRE" },
];

const MAX_SELECT = 3;
const UNKNOWN_LABEL = "잘 모르겠어요";

export default function OnboardingGenre() {
  const navigate = useNavigate();
  const { setGenres, setCategories } = useOnboardingStore();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const isUnknownSelected = selectedGenres.length === 0 && selectedCategories.length === 0;

  const toggleItem = (item: GenreItem) => {
    const isGenre = item.type === "GENRE";
    const selected = isGenre ? selectedGenres : selectedCategories;
    const setter = isGenre ? setSelectedGenres : setSelectedCategories;

    if (selected.includes(item.id)) {
      setter(selected.filter((id) => id !== item.id));
      return;
    }

    const totalSelected = selectedGenres.length + selectedCategories.length;
    if (totalSelected >= MAX_SELECT) return;

    setter([...selected, item.id]);
  };

  const selectUnknown = () => {
    setSelectedGenres([]);
    setSelectedCategories([]);
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
          <SegmentedProgress current={5} />
        </div>

        <div className={content}>
          <h1 className={title}>좋아하는 도서 분류를 3개 골라주세요</h1>
          <p className={description}>나중에 마이페이지에서 선택해도 괜찮아요</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {GENRES.map((item) => {
              const active =
                item.type === "GENRE"
                  ? selectedGenres.includes(item.id)
                  : selectedCategories.includes(item.id);

              return (
                <button
                  key={item.id}
                  className={`${chip} ${active ? chipActive : ""}`}
                  onClick={() => toggleItem(item)}
                >
                  {item.label}
                </button>
              );
            })}

            {/* 잘 모르겠어요 */}
            <Button
              label={UNKNOWN_LABEL}
              size="small"
              variant={isUnknownSelected ? "ghost" : "secondaryOutline"}
              disabled={
                !isUnknownSelected && (selectedGenres.length > 0 || selectedCategories.length > 0)
              }
              onClick={selectUnknown}
              className={cn(
                "rounded-full",
                isUnknownSelected
                  ? "bg-lime-400/60 border border-lime-600 text-purple-800 text-sm"
                  : "bg-white text-gray-700 border border-lime-600 text-sm",
              )}
            />
          </div>
        </div>

        <div className={bottomAction}>
          <Button
            label="다음"
            fullWidth
            onClick={() => {
              setGenres(selectedGenres);
              setCategories(selectedCategories);

              setUserInfo({
                genreIds: selectedGenres,
                categoryIds: selectedCategories,
              });

              navigate("/onboarding/result");
            }}
          />
        </div>
      </div>
    </div>
  );
}
