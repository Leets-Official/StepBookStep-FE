import { useNavigate } from "react-router-dom";
import { styles } from "./BottomBar.styles";
import type { BottomBarProps, NavItem } from "./BottomBar.types";
import { HomeIcon, SearchIcon, ClockIcon, UserIcon } from "@/assets/icons";

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "홈", icon: HomeIcon },
  { id: "search", label: "탐색", icon: SearchIcon },
  { id: "routine", label: "루틴", icon: ClockIcon },
  { id: "mypage", label: "마이페이지", icon: UserIcon },
];

const ROUTE_MAP: Record<string, string> = {
  home: "/home",
  search: "/search",
  routine: "/routine/booklist",
  mypage: "/mypage",
};

const BottomBar = ({ activeTab, onTabSelect }: BottomBarProps) => {
  const navigate = useNavigate();

  const handleTabClick = (id: string) => {
    onTabSelect(id as any);
    navigate(ROUTE_MAP[id]);
  };

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
            onClick={() => handleTabClick(item.id)}
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
