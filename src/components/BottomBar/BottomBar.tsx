import { useState } from 'react';
import { styles } from './BottomBar.styles';
import type { BottomBarProps, NavItem, TabId } from './BottomBar.types';

import { 
  HomeIcon, 
  SearchIcon, 
  ClockIcon, 
  UserIcon 
} from '../../assets/icons'; 

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '홈', icon: HomeIcon },
  { id: 'search', label: '탐색', icon: SearchIcon },
  { id: 'routine', label: '루틴', icon: ClockIcon }, 
  { id: 'mypage', label: '마이페이지', icon: UserIcon },
];

const BottomBar = ({ defaultTab = 'home', onTabSelect }: BottomBarProps) => {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);
    if (onTabSelect) {
      onTabSelect(id);
    }
  };

  return (
    <nav className={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        
        // 활성 상태면 purple-500, 아니면 gray-400 (비활성 색상)
        const activeColor = isActive ? 'text-purple-500' : 'text-gray-500';

        // 아이콘 컴포넌트
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleTabClick(item.id)}
            className={`${styles.button} ${activeColor}`}
          >
        
            <IconComponent className={`${styles.icon} fill-current`} />
            
            <span className={styles.label}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomBar;
