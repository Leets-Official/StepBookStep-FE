import type { FunctionComponent, SVGProps } from "react";

export type TabId = "home" | "search" | "routine" | "mypage";

export interface NavItem {
  id: TabId;
  label: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export interface BottomBarProps {
  activeTab: TabId;
  onTabSelect: (id: TabId) => void;
}
