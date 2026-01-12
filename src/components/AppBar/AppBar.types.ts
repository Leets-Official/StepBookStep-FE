export type AppBarMode = "logo" | "title";

export interface AppBarProps {
  mode: AppBarMode;

  title?: string;

  onBackClick?: () => void;

  onSettingClick?: () => void;


  onBookmarkClick?: () => void;

  onPenClick?: () => void;
}
