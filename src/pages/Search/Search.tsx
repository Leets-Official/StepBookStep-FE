import { useState, useMemo } from "react"; // [추가] useMemo
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

  // 필터 상태
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

    setFilters({
      keyword: "",
      level: null,
      volume: null,
      country: null,
      genre: null,
    });
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

  const filteredBooks = useMemo(() => {
    return dummySearchResults.filter((book) => {
      if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        const matchTitle = book.title.toLowerCase().includes(lowerSearch);
        const matchAuthor = book.author.toLowerCase().includes(lowerSearch);
        if (!matchTitle && !matchAuthor) return false;
      }
      if (filters.level !== null && book.level !== filters.level) {
        return false;
      }

      if (filters.country && book.country !== filters.country) {
        return false;
      }

      if (filters.genre && filters.genre !== "장르" && book.genre !== filters.genre) {
        return false;
      }

      if (filters.volume) {
        const pages = book.totalPages;
        if (filters.volume === "~200쪽" && pages > 200) return false;
        if (filters.volume === "200~250쪽" && (pages < 200 || pages > 250)) return false;
        if (filters.volume === "251쪽~" && pages < 251) return false;
      }

      return true;
    });
  }, [searchText, filters]);

  return (
    <>
      <style>{`
        /* 기존 스타일 오버라이드 유지 */
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
          {/* 1. 헤더 */}
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

          {/* 2. 서브 헤더 (필터 + 칩) */}
          {isSearchMode ? (
            <div className={S.filterBar}>
              <button className={S.filterButton} onClick={() => setIsFilterOpen(true)}>
                {FilterIcon && <FilterIcon className="w-6 h-6 text-gray-500" />}
                <span className={S.filterText}>필터</span>
              </button>

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
                {filters.genre && filters.genre !== "장르" && (
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

          {/* 3. 리스트 영역 */}
          <div className={S.contentArea}>
            <div className={S.listWrapper}>
              {/* 검색 모드거나 필터가 하나라도 있으면 -> filteredBooks 전체 노출
                아무것도 안 한 초기 상태면 -> 추천 도서 4개만 노출 (기존 로직 유지) 
              */}
              {isSearchMode ||
              searchText ||
              filters.level ||
              filters.volume ||
              filters.country ||
              filters.genre ? (
                filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <BookList key={index} {...book} readingState="before" />
                  ))
                ) : (
                  <div className="flex justify-center items-center py-20 text-gray-400">
                    검색 결과가 없습니다.
                  </div>
                )
              ) : (
                dummySearchResults
                  .slice(0, 4)
                  .map((book, index) => <BookList key={index} {...book} readingState="before" />)
              )}
            </div>
          </div>

          <BottomBar defaultTab="search" />

          {isFilterOpen && (
            <SearchFilter
              currentFilters={filters}
              onApply={handleApplyFilter}
              onClose={() => setIsFilterOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
