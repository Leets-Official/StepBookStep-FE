import type { AppBarProps } from "@/components/AppBar/AppBar.types";
import { appBarStyles } from "@/components/AppBar/AppBar.styles";
import IconChevronLeft from "@/assets/icons/chevron-left.svg?react";
import IconBookmarkEmpty from "@/assets/icons/bookmark-empty.svg?react";
import IconPen from "@/assets/icons/pen.svg?react";
import IconSetting from "@/assets/icons/setting.svg?react"; 
import IconLogo from "@/assets/icons/logo.svg";

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
            <img 
              src={IconLogo} 
              alt="StepBookStep Main Logo" 
              className={appBarStyles.logoImage} 
            />
            
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
