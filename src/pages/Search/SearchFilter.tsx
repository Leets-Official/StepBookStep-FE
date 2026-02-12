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

  // 슬라이더 아래 표시될 라벨
  const volumeLabels = ["~200", "~250", "~350", "~500", "~650", "651~"];

  const [level, setLevel] = useState<number | null>(currentFilters.level);

  const initialVolume = currentFilters.volume || "";
  const initialIndex = volumeOptions.indexOf(initialVolume);

  // 기존 설정값이 있으면 그 위치, 없으면 0(맨앞에)
  const [volumeIndex, setVolumeIndex] = useState<number>(initialIndex !== -1 ? initialIndex : 0);

  // 사용자가 슬라이더를 건드렸는지 확인 - 기존 필터가 없었다면 false
  const [isVolumeTouched, setIsVolumeTouched] = useState(initialIndex !== -1);
  const [country, setCountry] = useState<string | null>(currentFilters.country);
  const [genre, setGenre] = useState<string | null>(currentFilters.genre);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(true);
  const [isGenreOpen, setIsGenreOpen] = useState(true);

  const levels = ["Lv.1", "Lv.2", "Lv.3"];
  const countries = ["한국소설", "영미소설", "중국소설", "일본소설", "프랑스소설", "독일소설"];
  const genres = ["로맨스", "역사소설", "무협소설", "판타지", "추리/미스테리", "희곡"];

  const handleApplyClick = () => {
    // 슬라이더를 조작했거나 기존 값이 있을 때만 값을 보냄, 아니면 null
    const finalVolume = isVolumeTouched ? volumeOptions[volumeIndex] : null;

    onApply({
      keyword: currentFilters.keyword,
      level,
      volume: finalVolume,
      country,
      genre,
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeIndex(parseInt(e.target.value));
    setIsVolumeTouched(true);
  };

  // 단일 선택(난이도)과 복수 선택(국가/장르) 분리
  const renderChip = (
    label: string,
    selectedValue: string | number | null,
    onSelect: (val: any) => void,
  
  ) => {
    const isSelected =
      selectedValue === label || (typeof label === "string" && label === `Lv.${selectedValue}`);
  

    // 난이도(Lv.1, Lv.2, Lv.3) 버튼에만 width 적용
    const isLevelChip = label.startsWith("Lv.");

    return (
      <Button
        key={label}
        label={label}
        size="small"
        variant="ghost"
        onClick={() => {
          if (label.startsWith("Lv.")) {
       
            const numLevel = parseInt(label.replace("Lv.", ""));
            onSelect(selectedValue === numLevel ? null : numLevel);
          } else {
            onSelect(selectedValue === label ? null : label);
          }
        }}
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
          <div className={S.chipWrapper}>{levels.map((lv) => renderChip(lv, level, setLevel))}</div>
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
            <div className={S.chipWrapper}>
              {countries.map((c) => renderChip(c, country, setCountry))}
            </div>
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
            <div className={S.chipWrapper}>
              {genres.map((g) => renderChip(g, genre, setGenre))}
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
