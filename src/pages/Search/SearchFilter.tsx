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
  const [level, setLevel] = useState<number | null>(currentFilters.level);
  const [volume, setVolume] = useState<string | null>(currentFilters.volume);
  const [country, setCountry] = useState<string | null>(currentFilters.country);
  const [genre, setGenre] = useState<string | null>(currentFilters.genre);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(true);
  const [isGenreOpen, setIsGenreOpen] = useState(true);

  const levels = ["Lv.1", "Lv.2", "Lv.3"];
  const volumes = ["~200쪽", "200~250쪽", "251쪽~"];
  const countries = ["한국소설", "영미소설", "중국소설", "일본소설", "프랑스소설", "독일소설"];
  const genres = ["장르", "뭐뭐받아올수있지...", "뭐가있지...", "뭐가..", "있을까..", "음..."];

  const handleApplyClick = () => {
    onApply({
      keyword: currentFilters.keyword,
      level,
      volume,
      country,
      genre,
    });
  };

  const renderChip = (
    label: string,
    selectedValue: string | number | null,
    onSelect: (val: any) => void,
  ) => {
    const isSelected =
      selectedValue === label || (typeof label === "string" && label === `Lv.${selectedValue}`);

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
        className={`    rounded-full border transition-all duration-200    font-['Pretendard'] font-normal text-[14px] leading-5 tracking-[0%]    ${isSelected ? "bg-lime-400 border-lime-600 text-purple-800" : "bg-white border-lime-400 text-gray-700 hover:bg-gray-50"}
  `}
      />
    );
  };

  return (
    <div className={S.container}>
      {/* 1. 헤더 */}
      <header className={S.header}>
        <button onClick={onClose} className={S.backButton}>
          <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className={S.headerTitle}>필터</h1>
      </header>

      {/* 2. 컨텐츠 */}
      <div className={S.content}>
        {/* 난이도 섹션 */}
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
                  <span className={S.tooltipDesc}>익숙한 언어로 술술 읽히는 난이도예요.</span>
                </div>
                <div className={S.tooltipItem}>
                  <span className={S.tooltipLabel}>Lv.3</span>
                  <span className={S.tooltipDesc}>깊이 있는 읽기를 요구하는 난이도예요.</span>
                </div>
              </div>
            )}
          </div>
          <div className={S.chipWrapper}>{levels.map((lv) => renderChip(lv, level, setLevel))}</div>
        </section>

        {/* 분량 섹션 */}
        <section className={S.section}>
          <div className={S.sectionHeader}>
            <h2 className={S.sectionTitle}>분량</h2>
          </div>
          <div className={S.chipWrapper}>
            {volumes.map((vol) => renderChip(vol, volume, setVolume))}
          </div>
        </section>

        {/* 국가별 분류 */}
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

        {/* 장르별 분류 */}
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
            <div className={S.chipWrapper}>{genres.map((g) => renderChip(g, genre, setGenre))}</div>
          )}
        </section>
      </div>

      {/* 3. 하단 버튼 */}
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
