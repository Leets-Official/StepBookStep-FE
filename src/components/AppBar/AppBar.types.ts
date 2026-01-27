export type AppBarMode = "logo" | "title" | "search" | "none";

export interface AppBarProps {
  mode: AppBarMode;
  title?: string;

  isBookmarked?: boolean;
  onBackClick?: () => void;
  onSettingClick?: () => void;
  onBookmarkClick?: () => void;
  onPenClick?: () => void;
  showPenDropdown?: boolean;

  /*탐색탭 앱바 전용 props*/
  searchText?: string;
  onSearchTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
}
