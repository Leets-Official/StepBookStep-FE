import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.styles";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import { BookList } from "@/components/BookList/BookList";
import TextField from "@/components/TextField/TextField";
import { Chip } from "@/components/Chip/Chip";
import { FilterIcon, TwoSpeechBubblesGif } from "@/assets/icons";
import { dummySearchResults } from "./dummyData";
import SearchFilter from "./SearchFilter";
import type { SearchFilterState } from "./Search.types";
import EmptyView from "@/components/EmptyView/EmptyView";

const Search = () => {
  const navigate = useNavigate();
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

  const handleFocus = () => setIsSearchMode(true);

  const handleBackClick = () => {
    setIsSearchMode(false);
    setSearchText("");
    setFilters({ keyword: "", level: null, volume: null, country: null, genre: null });
  };

  const handleApplyFilter = (newFilters: SearchFilterState) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const handleDeleteChip = (key: keyof SearchFilterState) => {
    setFilters((prev) => ({ ...prev, [key]: null }));
  };

  const handleBookClick = () => {
    navigate("/books/1?status=before");
  };

  const filteredBooks = useMemo(() => {
    return dummySearchResults.filter((book) => {
      if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        if (
          !book.title.toLowerCase().includes(lowerSearch) &&
          !book.author.toLowerCase().includes(lowerSearch)
        )
          return false;
      }
      if (filters.level !== null && book.level !== filters.level) return false;
      if (filters.country && book.country !== filters.country) return false;
      if (filters.genre && filters.genre !== "장르" && book.genre !== filters.genre) return false;
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
    <div className={S.wrapper}>
      <div className={`${S.container} search-page-wrapper`}>
        <div className={S.statusBar} />
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

        {isSearchMode ? (
          <div className={S.filterBar}>
            <button className={S.filterButton} onClick={() => setIsFilterOpen(true)}>
              <FilterIcon className="w-6 h-6 text-gray-500" />
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

        <div className={S.contentArea}>
          <div className={S.listWrapper}>
            {isSearchMode ||
            searchText ||
            Object.values(filters).some((v) => v !== null && v !== "" && v !== "장르") ? (
              filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <BookList key={index} {...book} readingState="before" onClick={handleBookClick} />
                ))
              ) : (
                <EmptyView
                  icon={TwoSpeechBubblesGif}
                  title="검색 결과가 없어요."
                  description={
                    <>
                      검색어나 필터를 변경하고 <br /> 다시 시도해 보세요.
                    </>
                  }
                  className="pt-37.75" //필터 박스와의 간격 151px
                  actionButton={{
                    label: "필터 초기화하기",
                    onClick: handleBackClick,
                  }}
                />
              )
            ) : (
              dummySearchResults
                .filter((book) => book.level === 1)
                .slice(0, 4)
                .map((book, index) => <BookList key={index} {...book} readingState="before" onClick={handleBookClick} />)
            )}
          </div>
        </div>
        <BottomBar activeTab="search" onTabSelect={() => {}} />
        {isFilterOpen && (
          <SearchFilter
            currentFilters={filters}
            onApply={handleApplyFilter}
            onClose={() => setIsFilterOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
