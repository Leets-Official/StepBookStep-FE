import type { AppBarProps } from "@/components/AppBar/AppBar.types";
import { appBarStyles } from "@/components/AppBar/AppBar.styles";
import { menu as dropDownMenu, item as dropDownItem } from "@/components/DropDown/DropDown.styles";

import { 
  ChevronLeftIcon as IconChevronLeft, 
  BookmarkEmptyIcon as IconBookmarkEmpty,
  PenIcon as IconPen,
  SettingIcon as IconSetting,
  LogoIcon as IconLogo
} from '@/assets/icons';
import TextField from "@/components/TextField/TextField";
import { useEffect, useRef, useState } from "react";

const AppBar = ({
  mode,
  title,
  onBackClick,
  onSettingClick,
  onBookmarkClick,
  onPenClick,
  searchText,
  onSearchTextChange,
  searchPlaceholder = "Placeholder",
}: AppBarProps) => {

  const [isPenMenuOpen, setIsPenMenuOpen] = useState(false);
  const penRef = useRef<HTMLDivElement>(null);

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (penRef.current && !penRef.current.contains(e.target as Node)) {
        setIsPenMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 탐색탭일 때 별도의 레이아웃 반환
  if (mode === "search") {
    return (
      <header className={appBarStyles.searchContainer}>
        <button 
          type="button" 
          onClick={onBackClick} 
          className={appBarStyles.backButton}
        >
          <IconChevronLeft className={appBarStyles.icon} />
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
            <IconLogo className={appBarStyles.logoImage} />
            
            <button type="button" onClick={onSettingClick}>
              <IconSetting className={appBarStyles.icon} />
            </button>
          </>
        ) : (
          /* 로고 없는 버전 */
          <>
            <button type="button" onClick={onBackClick}>
              <IconChevronLeft className={appBarStyles.icon} />
            </button>

            <div className="flex-1 flex items-center">
              <span className={appBarStyles.titleText}>{title}</span>
            </div>

            <button type="button" onClick={onBookmarkClick}>
              <IconBookmarkEmpty className={appBarStyles.icon} />
            </button>
            <div className="relative" ref={penRef}>
              <button 
                type="button" 
                onClick={() => setIsPenMenuOpen(!isPenMenuOpen)}
              >
                <IconPen className={appBarStyles.icon} />
              </button>

              {/* 드롭다운 메뉴 */}
              {isPenMenuOpen && (
                <ul 
                  className={dropDownMenu} 
                  style={{ 
                    width: '155px', // 메뉴 너비 고정
                    right: 0,       // 오른쪽 정렬
                    left: 'auto',   // 왼쪽 정렬 해제
                    top: '100%',    // 아이콘 바로 아래
                    marginTop: '8px' 
                  }}
                >
                  <li className={dropDownItem} onClick={() => { console.log("타이머"); setIsPenMenuOpen(false); }}>
                    타이머로 기록하기
                  </li>
                  <li className={dropDownItem} onClick={() => { console.log("직접"); setIsPenMenuOpen(false); }}>
                    직접 기록하기
                  </li>
                  <li className={dropDownItem} onClick={() => { console.log("수정"); setIsPenMenuOpen(false); }}>
                    목표 수정하기
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default AppBar;
