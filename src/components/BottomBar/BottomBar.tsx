import { styles } from "./BottomBar.styles";
import type { BottomBarProps, NavItem } from "./BottomBar.types";
import { HomeIcon, SearchIcon, ClockIcon, UserIcon } from "@/assets/icons";

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "홈", icon: HomeIcon },
  { id: "search", label: "탐색", icon: SearchIcon },
  { id: "routine", label: "루틴", icon: ClockIcon },
  { id: "mypage", label: "마이페이지", icon: UserIcon },
];

const BottomBar = ({ activeTab, onTabSelect }: BottomBarProps) => {
  return (
    <nav className={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        const activeColor = isActive ? "text-purple-500" : "text-gray-500";
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabSelect(item.id)}
            className={`${styles.button} ${activeColor}`}
          >
            <IconComponent className={`${styles.icon} fill-current`} />
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomBar;
