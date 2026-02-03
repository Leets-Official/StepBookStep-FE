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
import { useRecommendedBooks, useSearchBooksInfinite } from "@/hooks/useBooks";
import { mapBookInfoToMock } from "@/api/types";
import type { SearchFilterState } from "./Search.types";
import type { FilterBooksParams } from "@/api/types";

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

  const apiParams: FilterBooksParams = useMemo(() => {
    return {
      keyword: searchText || undefined,
      level: filters.level || undefined,

      pageRange: filters.volume ? [filters.volume.replace("쪽", "")] : undefined,
      origin: filters.country || undefined,
      genre: filters.genre !== "장르" ? filters.genre || undefined : undefined,
    };
  }, [searchText, filters]);

  // A. 초기 추천 도서 (검색 모드가 아닐 때 사용)
  const { data: recommendedData, isLoading: isRecLoading } = useRecommendedBooks();

  // B. 필터/검색 도서 (검색 모드일 때 사용 - 무한 스크롤)
  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isSearchLoading,
  } = useSearchBooksInfinite(apiParams);

  // --- 무한 스크롤 Observer ---
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상이 화면에 들어오고, 다음 페이지가 있고, 현재 로딩 중이 아닐 때
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }, // 50% 정도 보였을 때 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // --- 이벤트 핸들러 ---
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

  const searchResultBooks = useMemo(() => {
    return searchData?.pages.flatMap((page) => page.books) || [];
  }, [searchData]);

  const recommendedBooks = recommendedData || [];

  // 로딩이 끝났고 결과가 없을 때...
  const isEmptyResult = isSearchMode && !isSearchLoading && searchResultBooks.length === 0;

  const renderSkeletons = () => (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
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
              유저들이 많이 선택한 <span className="text-purple-500">Lv.1</span> 도서
            </h2>
          </div>
        )}

        <div className={S.contentArea}>
          <div className={S.listWrapper}>
            {/* [조건부 렌더링 로직]
              1. 검색 모드인 경우
                 - 로딩 중이면? -> 스켈레톤
                 - 결과가 없으면? -> EmptyView
                 - 데이터가 있으면? -> 리스트 + 무한 스크롤 로더
              2. 추천 모드(초기)인 경우
                 - 로딩 중이면? -> 스켈레톤
                 - 데이터가 있으면? -> 리스트
            */}

            {isSearchMode ? (
              // --- 검색 모드 ---
              isSearchLoading ? (
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
                  actionButton={{
                    label: "필터 초기화하기",
                    onClick: handleBackClick,
                  }}
                />
              ) : (
                <>
                  {searchResultBooks.map((book) => (
                    <BookList
                      key={book.bookId}
                      {...mapBookInfoToMock(book)}
                      readingState="before"
                      onClick={() => handleBookClick(book.bookId)}
                    />
                  ))}

                  <div
                    ref={observerRef}
                    className="w-full h-15 flex justify-center items-center mt-4 pb-4"
                  >
                    {isFetchingNextPage && (
                      <div
                        className="w-6 h-6 border-[3px] border-gray-200 border-t-purple-600 rounded-full animate-spin"
                        aria-label="추가 데이터를 불러오는 중"
                      />
                    )}
                  </div>
                </>
              )
            ) : isRecLoading ? (
              renderSkeletons()
            ) : (
              recommendedBooks.map((book) => (
                <BookList
                  key={book.bookId}
                  {...mapBookInfoToMock(book)}
                  readingState="before"
                  onClick={() => handleBookClick(book.bookId)}
                />
              ))
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
