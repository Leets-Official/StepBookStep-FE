import { Tab } from "@/components/Tab/Tab";
import * as S from "../MyPage.styles";
import type { MyPageTabProps, ReadStatus } from "../MyPage.types";

interface Props {
  activeStatus: ReadStatus;
  onTabChange: (status: ReadStatus) => void;
}

export const MyPageHeader = ({ activeStatus, onTabChange }: Props) => {
  const tabs: MyPageTabProps[] = [
    { label: "읽는 중", status: "READING" },
    { label: "완독한", status: "FINISHED" },
    { label: "읽고 싶은", status: "BOOKMARKED" },
    { label: "중단한", status: "PAUSED" },
  ];

  return (
    <div className={S.tabContainer}>
      {tabs.map((tab) => (
        <Tab
          key={tab.status}
          label={tab.label}
          isActive={activeStatus === tab.status}
          onClick={() => onTabChange(tab.status)}
          // flex-1과 함께 whitespace-nowrap을 추가하여 줄바꿈을 방지합니다.
          className="flex-1 whitespace-nowrap text-center" 
        />
      ))}
    </div>
  );
};
