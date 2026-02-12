import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Setting.styles";
import AppBar from "@/components/AppBar/AppBar";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/cn";

import { patchPreferences } from "@/api/settings";
import { useUserStore } from "@/stores/useUserStore";

const LEVELS = ["Lv.1", "Lv.2", "Lv.3"] as const;

type GenreItem = {
  id: number;
  label: string;
  type: "CATEGORY" | "GENRE";
};

const GENRES: readonly GenreItem[] = [
  { id: 50993, label: "한국소설", type: "CATEGORY" },
  { id: 50919, label: "영미소설", type: "CATEGORY" },
  { id: 50998, label: "일본소설", type: "CATEGORY" },
  { id: 50923, label: "중국소설", type: "CATEGORY" },
  { id: 50921, label: "프랑스소설", type: "CATEGORY" },
  { id: 50922, label: "독일소설", type: "CATEGORY" },

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
const UNKNOWN = "잘 모르겠어요";

export default function PreferenceEditPage() {
  const navigate = useNavigate();

  const storedLevel = useUserStore((state) => state.level);
  const storedGenreIds = useUserStore((state) => state.genreIds);
  const storedCategoryIds = useUserStore((state) => state.categoryIds);
  const nickname = useUserStore((state) => state.nickname);
  const userId = useUserStore((state) => state.userId);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [isUnknownSelected, setIsUnknownSelected] = useState(false);

  const [level, setLevel] = useState<(typeof LEVELS)[number] | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    if (storedLevel) {
      const lv = storedLevel === 1 ? "Lv.1" : storedLevel === 2 ? "Lv.2" : "Lv.3";
      setLevel(lv);
    }

    setSelectedGenres(storedGenreIds);
    setSelectedCategories(storedCategoryIds);
  }, [storedLevel, storedGenreIds, storedCategoryIds]);

  const totalSelected = selectedGenres.length + selectedCategories.length;

  const toggleItem = (item: GenreItem) => {
    setIsUnknownSelected(false);
    const isGenre = item.type === "GENRE";
    const selected = isGenre ? selectedGenres : selectedCategories;
    const setter = isGenre ? setSelectedGenres : setSelectedCategories;

    if (selected.includes(item.id)) {
      setter(selected.filter((id) => id !== item.id));
      return;
    }

    if (totalSelected >= MAX_SELECT) return;

    setter([...selected, item.id]);
  };

  const selectUnknown = () => {
    setSelectedGenres([]);
    setSelectedCategories([]);
    setIsUnknownSelected(true);
  };

  const initialLevel = storedLevel === 1 ? "Lv.1" : storedLevel === 2 ? "Lv.2" : "Lv.3";

  const isLevelChanged = level !== initialLevel;

  const isGenresChanged = useMemo(() => {
    if (
      storedGenreIds.length !== selectedGenres.length ||
      storedCategoryIds.length !== selectedCategories.length
    )
      return true;

    return (
      storedGenreIds.some((id) => !selectedGenres.includes(id)) ||
      storedCategoryIds.some((id) => !selectedCategories.includes(id))
    );
  }, [selectedGenres, selectedCategories, storedGenreIds, storedCategoryIds]);

  const hasChanged = isLevelChanged || isGenresChanged;

  const handleSave = async () => {
    if (!hasChanged || !level) {
      navigate("/setting");
      return;
    }

    try {
      await patchPreferences(userId!, {
        level: Number(level.replace("Lv.", "")),
        categoryIds: selectedCategories,
        genreIds: selectedGenres,
      });

      setUserInfo({
        nickname,
        level: Number(level.replace("Lv.", "")),
        genreIds: selectedGenres,
        categoryIds: selectedCategories,
      });

      navigate("/setting");
    } catch (error) {
      console.error("선호 설정 저장 실패", error);
    }
  };

  if (!level) return null;

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="none" title="선호 레벨/분야 수정" onBackClick={() => navigate("/setting")} />

        <main className={S.preferenceContent}>
          <section className={S.preferenceSection}>
            <p className={S.preferenceSectionTitle}>난이도</p>
            <div className={S.preferenceLevelRow}>
              {LEVELS.map((item) => (
                <button
                  key={item}
                  className={level === item ? S.preferenceLevelChipActive : S.preferenceLevelChip}
                  onClick={() => setLevel(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className={S.preferenceSection}>
            <p className={S.preferenceSectionTitle}>분류</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {GENRES.map((item) => {
                const active =
                  item.type === "GENRE"
                    ? selectedGenres.includes(item.id)
                    : selectedCategories.includes(item.id);

                return (
                  <button
                    key={item.id}
                    className={cn(S.preferenceGenreChip, active && S.preferenceGenreChipActive)}
                    onClick={() => toggleItem(item)}
                  >
                    {item.label}
                  </button>
                );
              })}

              <Button
                label={UNKNOWN}
                size="small"
                variant="secondaryOutline"
                disabled={!isUnknownSelected && totalSelected > 0}
                onClick={selectUnknown}
                className={cn(
                  "rounded-full text-sm border border-lime-600",
                  isUnknownSelected ? "bg-lime-400/60 text-purple-800" : "bg-white text-gray-700",
                )}
              />
            </div>
          </section>
        </main>

        <Button label="저장하기" variant="primary" className={S.button} onClick={handleSave} />
      </div>
    </div>
  );
}
