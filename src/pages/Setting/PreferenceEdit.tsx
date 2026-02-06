import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Setting.styles";
import AppBar from "@/components/AppBar/AppBar";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/cn";

import { patchPreferences } from "@/api/settings";
import { useUserStore } from "@/stores/useUserStore";

const LEVELS = ["Lv.1", "Lv.2", "Lv.3"] as const;
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

export default function PreferenceEditPage() {
  const navigate = useNavigate();

  const storedLevel = useUserStore((state) => state.level);
  const storedGenres = useUserStore((state) => state.genres);
  const nickname = useUserStore((state) => state.nickname);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [level, setLevel] = useState<(typeof LEVELS)[number] | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    if (storedLevel) {
      const lv = storedLevel === 1 ? "Lv.1" : storedLevel === 2 ? "Lv.2" : "Lv.3";
      setLevel(lv);
    }

    if (storedGenres.length > 0) {
      setGenres(storedGenres);
    }
  }, [storedLevel, storedGenres]);

  const hasUnknown = genres.includes(UNKNOWN);
  const hasOther = genres.some((g) => g !== UNKNOWN);

  const toggleGenre = (genre: string) => {
    if (genre === UNKNOWN) {
      setGenres(hasUnknown ? [] : [UNKNOWN]);
      return;
    }

    if (hasUnknown) return;

    setGenres((prev) => {
      if (prev.includes(genre)) return prev.filter((g) => g !== genre);
      if (prev.length >= 3) return prev;
      return [...prev, genre];
    });
  };

  const initialLevel = storedLevel === 1 ? "Lv.1" : storedLevel === 2 ? "Lv.2" : "Lv.3";
  const initialGenres = storedGenres;

  const isLevelChanged = level !== initialLevel;

  const isGenresChanged = useMemo(() => {
    if (initialGenres.length !== genres.length) return true;
    return initialGenres.some((g) => !genres.includes(g));
  }, [genres, initialGenres]);

  const hasChanged = isLevelChanged || isGenresChanged;

  /* ================= 저장 ================= */
  const handleSave = async () => {
    if (!hasChanged || !level) {
      navigate("/setting");
      return;
    }

    try {
      await patchPreferences(0, {
        level: Number(level.replace("Lv.", "")),
        categoryIds: [],
        genreIds: [],
      });

      setUserInfo({
        nickname,
        level: Number(level.replace("Lv.", "")),
        genres,
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
              {GENRES.map((genre) => {
                const active = genres.includes(genre);

                return (
                  <button
                    key={genre}
                    className={cn(S.preferenceGenreChip, active && S.preferenceGenreChipActive)}
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
                disabled={!hasUnknown && hasOther}
                onClick={() => toggleGenre(UNKNOWN)}
                className={cn(
                  "rounded-full text-sm border border-lime-600",
                  hasUnknown ? "bg-lime-400/60 text-purple-800" : "bg-white text-gray-700",
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
