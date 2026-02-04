import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.styles";
import AppBar from "@/components/AppBar/AppBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import { BookList } from "@/components/BookList/BookList";
import TextField from "@/components/TextField/TextField";
import { Chip } from "@/components/Chip/Chip";
import EmptyView from "@/components/EmptyView/EmptyView";
import SearchFilter from "./SearchFilter";
import { SkeletonBookList } from "@/components/skeleton";
import { FilterIcon, TwoSpeechBubblesGif } from "@/assets/icons";
import { mapBookInfoToMock } from "@/api/types";
import { useRecommendedBooks, useSearchBooksInfinite, useSearchBooks } from "@/hooks/useBooks";
import { useUserStore } from "@/stores/useUserStore";

import type { SearchFilterState } from "./Search.types";
import type { FilterBooksParams } from "@/api/types";

const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { nickname, level: userLevel } = useUserStore();
  const [filters, setFilters] = useState<SearchFilterState>({
    keyword: "",
    level: null,
    volume: null,
    country: null,
    genre: null,
  });
  // 필터가 하나라도 적용되었는지 확인
  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.level ||
      filters.volume ||
      filters.country ||
      (filters.genre && filters.genre !== "장르")
    );
  }, [filters]);

  const isSimpleSearch = !!searchText && !hasActiveFilters;
  const apiParams: FilterBooksParams = useMemo(() => {
    return {
      keyword: searchText || undefined,
      level: filters.level || undefined,
      pageRange: filters.volume || undefined,

      origin: filters.country || undefined,
      genre: filters.genre !== "장르" ? filters.genre || undefined : undefined,
    };
  }, [searchText, filters]);

  const { data: recommendedData, isLoading: isRecLoading } = useRecommendedBooks();

  const { data: simpleSearchData, isLoading: isSimpleLoading } = useSearchBooks(
    searchText,
    isSimpleSearch,
  );
  const {
    data: filterSearchData,
    fetchNextPage: fetchFilterNext,
    hasNextPage: hasFilterNext,
    isFetchingNextPage: isFilterFetching,
    isLoading: isFilterLoading,
  } = useSearchBooksInfinite(apiParams);
  const displayBooks = useMemo(() => {
    if (!isSearchMode) {
      return recommendedData || [];
    }
    if (isSimpleSearch) {
      return simpleSearchData || [];
    }
    return filterSearchData?.pages.flatMap((page) => page.books) || [];
  }, [isSearchMode, isSimpleSearch, recommendedData, simpleSearchData, filterSearchData]);

  const isLoading = !isSearchMode
    ? isRecLoading
    : isSimpleSearch
      ? isSimpleLoading
      : isFilterLoading;
  const isEmptyResult = isSearchMode && !isLoading && displayBooks.length === 0;
  const canFetchNext = isSearchMode && !isSimpleSearch && hasFilterNext;
  const isFetchingNext = isSearchMode && !isSimpleSearch && isFilterFetching;

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && canFetchNext && !isFetchingNext) {
          fetchFilterNext();
        }
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [canFetchNext, isFetchingNext, fetchFilterNext]);

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
  const handleBookClick = (bookId: number) => {
    navigate(`/books/${bookId}?status=before`);
  };

  const renderSkeletons = () => (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonBookList key={`skeleton-${index}`} />
      ))}
    </>
  );

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
              {nickname}님을 위한 <span className="text-purple-500">Lv.{userLevel}</span> 도서
            </h2>
          </div>
        )}

        <div className={S.contentArea}>
          <div className={S.listWrapper}>
            {isLoading ? (
              renderSkeletons()
            ) : isEmptyResult ? (
              <EmptyView
                icon={TwoSpeechBubblesGif}
                title="검색 결과가 없어요."
                description={
                  <>
                    검색어나 필터를 변경하고 <br /> 다시 시도해 보세요.
                  </>
                }
                className="pt-37.75"
                actionButton={{ label: "필터 초기화하기", onClick: handleBackClick }}
              />
            ) : (
              <>
                {displayBooks.map((book) => (
                  <BookList
                    key={book.bookId}
                    {...mapBookInfoToMock(book)}
                    readingState="before"
                    onClick={() => handleBookClick(book.bookId)}
                  />
                ))}

                {canFetchNext && (
                  <div
                    ref={observerRef}
                    className="w-full h-15 flex justify-center items-center mt-4 pb-4"
                  >
                    {isFetchingNext && (
                      <div className="w-6 h-6 border-[3px] border-gray-200 border-t-purple-600 rounded-full animate-spin" />
                    )}
                  </div>
                )}
              </>
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
