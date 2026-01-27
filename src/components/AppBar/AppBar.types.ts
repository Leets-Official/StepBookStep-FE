export type AppBarMode = "logo" | "title" | "search" | "none";

export interface AppBarProps {
  mode: AppBarMode;

  title?: string;

  onBackClick?: () => void;
  onSettingClick?: () => void;
  onBookmarkClick?: () => void;
  onPenClick?: () => void;
  onTimerClick?: () => void;
  onDirectClick?: () => void;
  onGoalClick?: () => void;

  /*탐색탭 앱바 전용 props*/
  searchText?: string;
  onSearchTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
}
