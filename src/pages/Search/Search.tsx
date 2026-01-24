import { useState } from "react";
import * as S from "./Search.styles";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import { BookList } from "@/components/BookList/BookList";
import TextField from "@/components/TextField/TextField";
import { Chip } from "@/components/Chip/Chip";
import { FilterIcon } from "@/assets/icons";
import { dummySearchResults } from "./dummyData";
import SearchFilter from "./SearchFilter";
import type { SearchFilterState } from "./Search.types";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilterState>({
    keyword: "",
    level: null,
    volume: null,
    country: null,
    genre: null,
  });

  const handleFocus = () => {
    setIsSearchMode(true);
  };

  const handleBackClick = () => {
    setIsSearchMode(false);
    setSearchText("");
  };

  const handleApplyFilter = (newFilters: SearchFilterState) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const handleDeleteChip = (key: keyof SearchFilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  return (
    <>
      <style>{`
        .search-page-wrapper span[class*="inline-flex"] {
          border-width: 1px !important;
          border-color: rgb(209 213 219) !important;
          background-color: white !important;
        }
        .search-page-wrapper span[class*="inline-flex"] span {
          font-family: 'Pretendard', sans-serif !important;
          font-weight: 600 !important;
          font-size: 12px !important;
          line-height: 16px !important;
          letter-spacing: 0% !important;
          color: rgb(107 114 128) !important;
        }
        .search-page-wrapper h3 {
          font-family: 'Pretendard', sans-serif !important;
          font-weight: 600 !important;
          font-size: 16px !important;
          line-height: 20px !important;
          color: rgb(17 24 39) !important;
        }
        .search-page-wrapper h3 + p {
          font-family: 'Pretendard', sans-serif !important;
          font-weight: 600 !important;
          font-size: 12px !important;
          line-height: 16px !important;
          color: rgb(17 24 39) !important;
        }
        .search-page-wrapper h3 + p + p {
          font-family: 'Pretendard', sans-serif !important;
          font-weight: 400 !important;
          font-size: 12px !important;
          line-height: 16px !important;
          letter-spacing: 0% !important;
          color: rgb(75 85 99) !important;
        }
      `}</style>

      <div className={S.wrapper}>
        <div className={`${S.container} search-page-wrapper`}>
          {/* 헤더 영역 */}
          {isSearchMode ? (
            <AppBar
              mode="search"
              searchText={searchText}
              onSearchTextChange={(e) => setSearchText(e.target.value)}
              onBackClick={handleBackClick}
              searchPlaceholder="검색어를 입력해 주세요"
            />
          ) : (
            <div className={S.headerWrapper}>
              <TextField
                placeholder="검색어를 입력해 주세요"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={handleFocus}
                icon={true}
              />
            </div>
          )}

          {/* 필터 버튼 + 칩 리스트 */}
          {isSearchMode ? (
            <div className={S.filterBar}>
              {/* 필터 버튼 */}
              <button className={S.filterButton} onClick={() => setIsFilterOpen(true)}>
                {FilterIcon && <FilterIcon className="w-6 h-6 text-gray-500" />}
                <span className={S.filterText}>필터</span>
              </button>

              {/* 가로 스크롤 */}
              <div className={S.chipList}>
                {filters.level && (
                  <Chip label={`Lv.${filters.level}`} onDelete={() => handleDeleteChip("level")} />
                )}
                {filters.volume && (
                  <Chip label={filters.volume} onDelete={() => handleDeleteChip("volume")} />
                )}
                {filters.country && (
                  <Chip label={filters.country} onDelete={() => handleDeleteChip("country")} />
                )}
                {filters.genre && (
                  <Chip label={filters.genre} onDelete={() => handleDeleteChip("genre")} />
                )}
              </div>
            </div>
          ) : (
            <div className={S.subHeader}>
              <h2 className={S.sectionTitle}>
                유저들이 많이 선택한 <span className="text-purple-500">Lv.1</span> 도서
              </h2>
            </div>
          )}

          {/* 3. 컨텐츠 영역 */}
          <div className={S.contentArea}>
            <div className={S.listWrapper}>
              {dummySearchResults.slice(0, 4).map((book, index) => (
                <BookList key={index} {...book} readingState="before" />
              ))}
            </div>
          </div>

          {/* 4. 하단바 */}
          <BottomBar defaultTab="search" />

          {/* 5. 필터 페이지(모달) */}
          {isFilterOpen && (
            <SearchFilter
              currentFilters={filters} // 현재 상태 전달
              onApply={handleApplyFilter} // 적용 핸들러 전달
              onClose={() => setIsFilterOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
