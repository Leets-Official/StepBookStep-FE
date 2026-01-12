import type { AppBarProps } from "@/components/AppBar/AppBar.types";
import { appBarStyles } from "@/components/AppBar/AppBar.styles";
import { 
  ChevronLeftIcon as IconChevronLeft, 
  BookmarkEmptyIcon as IconBookmarkEmpty,
  PenIcon as IconPen,
  SettingIcon as IconSetting,
  LogoIcon as IconLogo
} from '@/assets/icons';
const AppBar = ({
  mode,
  title,
  onBackClick,
  onSettingClick,
  onBookmarkClick,
  onPenClick,
}: AppBarProps) => {
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
            <button type="button" onClick={onPenClick}>
              <IconPen className={appBarStyles.icon} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default AppBar;
