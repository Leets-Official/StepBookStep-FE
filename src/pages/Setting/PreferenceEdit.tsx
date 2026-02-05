import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Setting.styles";
import AppBar from "@/components/AppBar/AppBar";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/cn";

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

  /** 🔹 초기값 (나중에 API response로 교체) */
  const initialLevel: (typeof LEVELS)[number] = "Lv.1";
  const initialGenres: string[] = ["한국소설", "판타지/환상문학"];

  /** 🔹 현재 상태 */
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("Lv.1");
  const [genres, setGenres] = useState<string[]>(initialGenres);

  /* ================= 난이도 ================= */
  const handleLevelClick = (value: (typeof LEVELS)[number]) => {
    setLevel(value);
  };

  /* ================= 분류 (온보딩 로직 그대로) ================= */
  const hasUnknown = genres.includes(UNKNOWN);
  const hasOther = genres.some((g) => g !== UNKNOWN);

  const toggleGenre = (genre: string) => {
    if (genre === UNKNOWN) {
      setGenres(hasUnknown ? [] : [UNKNOWN]);
      return;
    }

    if (hasUnknown) return;

    setGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      }
      if (prev.length >= 3) return prev;
      return [...prev, genre];
    });
  };

  /* ================= 변경 여부 계산 ================= */
  const isLevelChanged = level !== initialLevel;

  const isGenresChanged = useMemo(() => {
    if (initialGenres.length !== genres.length) return true;
    return initialGenres.some((g) => !genres.includes(g));
  }, [genres]);

  const hasChanged = isLevelChanged || isGenresChanged;

  /* ================= 저장 ================= */
  const handleSave = async () => {
    // 1️⃣ 변경사항 없으면 바로 설정 페이지로
    if (!hasChanged) {
      navigate("/settings");
      return;
    }

    // 2️⃣ 변경된 값만 payload 구성
    const payload: {
      level?: string;
      genres?: string[];
    } = {};

    if (isLevelChanged) payload.level = level;
    if (isGenresChanged) payload.genres = genres;

    try {
      // 🔥 TODO: 실제 API 연결
      console.log("PATCH /users/preferences", payload);

      // await updateUserPreference(payload);

      // 3️⃣ 성공 시 설정 페이지로 이동
      navigate("/setting");
    } catch (error) {
      console.error("선호 설정 저장 실패", error);
      // TODO: 토스트 에러 처리
    }
  };

  return (
    <div className={S.pageWrapper}>
      <div className={S.appFrame}>
        <AppBar mode="none" title="선호 레벨/분야 수정" onBackClick={() => navigate(-1)} />

        <main className={S.preferenceContent}>
          {/* 난이도 */}
          <section className={S.preferenceSection}>
            <p className={S.preferenceSectionTitle}>난이도</p>
            <div className={S.preferenceLevelRow}>
              {LEVELS.map((item) => (
                <button
                  key={item}
                  className={level === item ? S.preferenceLevelChipActive : S.preferenceLevelChip}
                  onClick={() => handleLevelClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* 분류 */}
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
                disabled={hasOther}
                onClick={() => toggleGenre(UNKNOWN)}
                className={cn(
                  "rounded-full",
                  !hasUnknown &&
                    !hasOther &&
                    "bg-white text-gray-700 border border-lime-600 text-sm",
                  hasUnknown && "bg-lime-400/60 border border-lime-600 text-purple-800 text-sm",
                )}
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <Button label="저장하기" variant="primary" className={S.button} onClick={handleSave} />
      </div>
    </div>
  );
}
