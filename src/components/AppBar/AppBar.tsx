import type { AppBarProps } from "@/components/AppBar/AppBar.types";
import { appBarStyles } from "@/components/AppBar/AppBar.styles";
import { menu as dropDownMenu, item as dropDownItem } from "@/components/DropDown/DropDown.styles";

import {
  ChevronLeftIcon,
  BookmarkEmptyIcon,
  PenIcon,
  SettingIcon,
  LogoIcon,
  BookmarkFilledIcon,
} from "@/assets/icons";
import TextField from "@/components/TextField/TextField";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppBar = ({
  mode,
  title,
  isBookmarked,
  onBackClick,
  onBookmarkClick,
  onPenClick,
  onTimerClick,
  onDirectClick,
  onGoalClick,
  showPenDropdown = false,
  searchText,
  onSearchTextChange,
  searchPlaceholder = "Placeholder",
}: AppBarProps) => {
  const [isPenMenuOpen, setIsPenMenuOpen] = useState(false);
  const penRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMenuClick = (action?: () => void) => {
    if (action) action();
    setIsPenMenuOpen(false);
  };

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    if (!showPenDropdown) return;

    const handler = (e: MouseEvent) => {
      if (penRef.current && !penRef.current.contains(e.target as Node)) {
        setIsPenMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPenDropdown]);

  // 탐색탭 전용
  if (mode === "search") {
    return (
      <header className={appBarStyles.searchContainer}>
        <button type="button" onClick={onBackClick} className={appBarStyles.backButton}>
          <ChevronLeftIcon className={appBarStyles.icon} />
        </button>
        <TextField
          value={searchText}
          onChange={onSearchTextChange}
          placeholder={searchPlaceholder}
          icon={true}
          state="default"
          className={appBarStyles.searchInputHelper}
        />
      </header>
    );
  }

  return (
    <header className={appBarStyles.container}>
      <div
        className={`${appBarStyles.innerWrapper} ${
          mode === "logo" ? appBarStyles.logoModeWrapper : appBarStyles.titleModeWrapper
        }`}
      >
        {mode === "logo" ? (
          /* 로고 있는 버전 */
          <>
            <LogoIcon className={appBarStyles.logoImage} />
            <button type="button" onClick={() => navigate("/setting")}>
              <SettingIcon className={appBarStyles.icon} />
            </button>
          </>
        ) : (
          /* 로고 없는 버전 (title / none 공통) */
          <>
            {/* 왼쪽 영역: 뒤로가기 + 타이틀 */}
            <div className="flex items-center gap-2 flex-1">
              <button type="button" onClick={onBackClick}>
                <ChevronLeftIcon className={appBarStyles.icon} />
              </button>

              {(mode === "title" || mode === "none") && title && (
                <span className={appBarStyles.title}>{title}</span>
              )}
            </div>

            {/* 우측 아이콘: mode === none 이면 숨김 */}
            {mode !== "none" && (
              <>
                <button type="button" onClick={onBookmarkClick}>
                  {isBookmarked ? (
                    <BookmarkFilledIcon className={appBarStyles.icon} />
                  ) : (
                    <BookmarkEmptyIcon className={appBarStyles.icon} />
                  )}
                </button>

                <div className="relative" ref={penRef}>
                  <button
                    type="button"
                    onClick={() => {
                      if (showPenDropdown) {
                        setIsPenMenuOpen((prev) => !prev);
                      } else {
                        onPenClick?.();
                      }
                    }}
                  >
                    <PenIcon className={appBarStyles.icon} />
                  </button>

                  {showPenDropdown && isPenMenuOpen && (
                    <ul
                      className={dropDownMenu}
                      style={{ width: "155px", right: 0, top: "100%", marginTop: "8px" }}
                    >
                      <li className={dropDownItem} onClick={() => handleMenuClick(onTimerClick)}>
                        타이머로 기록하기
                      </li>
                      <li className={dropDownItem} onClick={() => handleMenuClick(onDirectClick)}>
                        직접 기록하기
                      </li>
                      <li className={dropDownItem} onClick={() => handleMenuClick(onGoalClick)}>
                        목표 수정하기
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default AppBar;
