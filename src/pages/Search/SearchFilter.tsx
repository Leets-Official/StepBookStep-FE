import { useState } from "react";
import * as S from "./SearchFilter.styles";
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";
import Button from "@/components/Button/Button";
import { HelpIcon } from "@/assets/icons";
import type { SearchFilterState } from "./Search.types";

interface SearchFilterProps {
  onClose: () => void;
  onApply: (filters: SearchFilterState) => void;
  currentFilters: SearchFilterState;
}

const SearchFilter = ({ onClose, onApply, currentFilters }: SearchFilterProps) => {
  const volumeOptions = ["~200", "250", "350", "500", "650", "651~"];
  const volumeLabels = ["~200", "~250", "~350", "~500", "~650", "651~"];

  const [level, setLevel] = useState<number | null>(currentFilters.level);

  const initialVolume = currentFilters.volume || "";
  const initialIndex = volumeOptions.indexOf(initialVolume);
  const [volumeIndex, setVolumeIndex] = useState<number>(initialIndex !== -1 ? initialIndex : 0);
  const [isVolumeTouched, setIsVolumeTouched] = useState(initialIndex !== -1);

  // 변경: 복수 선택을 위해 배열 상태 관리
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    currentFilters.country || [],
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(currentFilters.genre || []);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(true);
  const [isGenreOpen, setIsGenreOpen] = useState(true);

  const levels = ["Lv.1", "Lv.2", "Lv.3"];
  const countries = ["한국소설", "영미소설", "중국소설", "일본소설", "프랑스소설", "독일소설"];
  const genreRows = [
    ["로맨스", "역사소설", "무협소설"],
    ["판타지/환상문학", "추리/미스테리", "희곡"],
    ["라이트노벨", "과학소설(SF)", "액션/스릴러", "호러/공포소설"]
  ];

  const toggleSelection = (
    item: string,
    currentList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (currentList.includes(item)) {
      setList(currentList.filter((i) => i !== item));
    } else {
      setList([...currentList, item]);
    }
  };

  const handleApplyClick = () => {
    const finalVolume = isVolumeTouched ? volumeOptions[volumeIndex] : null;

    onApply({
      keyword: currentFilters.keyword,
      level,
      volume: finalVolume,
      country: selectedCountries, // 배열 전달
      genre: selectedGenres, // 배열 전달
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeIndex(parseInt(e.target.value));
    setIsVolumeTouched(true);
  };


  const renderChip = (label: string, type: "level" | "country" | "genre") => {
    let isSelected = false;

    if (type === "level") {
      const numLevel = parseInt(label.replace("Lv.", ""));
      isSelected = level === numLevel;
    } else if (type === "country") {
      isSelected = selectedCountries.includes(label);
    } else if (type === "genre") {
      isSelected = selectedGenres.includes(label);
    }

    const handleClick = () => {
      if (type === "level") {
        const numLevel = parseInt(label.replace("Lv.", ""));
        setLevel(level === numLevel ? null : numLevel);
      } else if (type === "country") {
        toggleSelection(label, selectedCountries, setSelectedCountries);
      } else if (type === "genre") {
        toggleSelection(label, selectedGenres, setSelectedGenres);
      }
    };

    const isLevelChip = label.startsWith("Lv.");

    return (
      <Button
        key={label}
        label={label}
        size="small"
        variant="ghost"
        onClick={handleClick}
        className={`rounded-full border transition-all duration-200 font-['Pretendard'] font-normal text-[14px] leading-5 tracking-[0%] ${
          isSelected
            ? "bg-lime-400 border-lime-600 text-purple-800"
            : "bg-gray-50 border-lime-600/25 text-gray-700 hover:bg-gray-100"
        }`}
        style={isLevelChip ? { width: "106.33px" } : undefined}
      />
    );
  };

  return (
    <div className={S.container}>
      <header className={S.header}>
        <button onClick={onClose} className={S.backButton}>
          <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className={S.headerTitle}>필터</h1>
      </header>

      <div className={S.content}>
        <section className={S.section}>
          <div className={`${S.sectionHeader} relative`}>
            <h2 className={S.sectionTitle}>난이도</h2>
            <HelpIcon
              className={S.helpIcon}
              onMouseEnter={() => setIsTooltipOpen(true)}
              onMouseLeave={() => setIsTooltipOpen(false)}
            />
            {isTooltipOpen && (
              <div className={S.tooltipBox}>
                <div className={S.tooltipItem}>
                  <span className={S.tooltipLabel}>Lv.1</span>
                  <span className={S.tooltipDesc}>가볍게 읽기 좋은 난이도예요.</span>
                </div>
                <div className={S.tooltipItem}>
                  <span className={S.tooltipLabel}>Lv.2</span>
                  <span className={S.tooltipDesc}>보통 수준의 도서입니다.</span>
                </div>
                <div className={S.tooltipItem}>
                  <span className={S.tooltipLabel}>Lv.3</span>
                  <span className={S.tooltipDesc}>도전 레벨의 도서입니다.</span>
                </div>
              </div>
            )}
          </div>
          <div className={S.chipWrapper}>{levels.map((lv) => renderChip(lv, "level"))}</div>
        </section>

        <section className={S.section}>
          <div className={S.sectionHeader}>
            <h2 className={S.sectionTitle}>분량 (쪽수)</h2>
          </div>
          <div className={S.volumeSliderContainer}>
            <div className={S.volumeSliderWrapper}>
              <div className={S.volumeTrack} />
              <div
                className={S.volumeFilledTrack}
                style={{
                  width: isVolumeTouched
                    ? `${(volumeIndex / (volumeOptions.length - 1)) * 100}%`
                    : "0%",
                  backgroundColor: isVolumeTouched ? "#5C4FE5" : "transparent",
                }}
              />
              <input
                type="range"
                min="0"
                max={volumeOptions.length - 1}
                step="1"
                value={volumeIndex}
                onChange={handleVolumeChange}
                className={S.volumeSlider}
              />
            </div>
            <div className={S.volumeLabels}>
              {volumeLabels.map((label, idx) => (
                <span
                  key={label}
                  className={`${S.volumeLabel} ${
                    isVolumeTouched && volumeIndex === idx ? S.activeVolumeLabel : ""
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className={S.section}>
          <div className={S.accordionHeader} onClick={() => setIsCountryOpen(!isCountryOpen)}>
            <h2 className={S.sectionTitle}>국가별 분류</h2>
            {isCountryOpen ? (
              <ChevronUpIcon className={S.arrowIcon} />
            ) : (
              <ChevronDownIcon className={S.arrowIcon} />
            )}
          </div>
          {isCountryOpen && (
            <div className={S.chipWrapper}>{countries.map((c) => renderChip(c, "country"))}</div>
          )}
        </section>

        <section className={S.section}>
          <div className={S.accordionHeader} onClick={() => setIsGenreOpen(!isGenreOpen)}>
            <h2 className={S.sectionTitle}>장르별 분류</h2>
            {isGenreOpen ? (
              <ChevronUpIcon className={S.arrowIcon} />
            ) : (
              <ChevronDownIcon className={S.arrowIcon} />
            )}
          </div>
          {isGenreOpen && (
            <div className="flex flex-col gap-2">
              {genreRows.map((row, i) => (
                <div key={i} className="flex flex-wrap gap-2">
                  {row.map((g) => renderChip(g, "genre"))}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className={S.footer}>
        <Button
          label="적용하기"
          variant="primary"
          size="large"
          fullWidth
          onClick={handleApplyClick}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
