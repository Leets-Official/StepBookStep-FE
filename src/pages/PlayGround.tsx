import { useState } from "react";
import { Tab } from "@/components/Tab/Tab";
import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/Button/Button";
import { Chip } from "@/components/Chip/Chip";
import { Kakao } from "@/components/Kakao/Kakao";

export default function PlayGround() {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");

  const handleKakaoClick = () => {
    console.log("카카오 로그인 버튼 클릭!");
  };

  return (
    <div className="min-h-screen bg-white p-8 space-y-12">
      <section>
        <h2 className="text-lg font-sb text-gray-900 mb-4">Tab</h2>

        <div className="flex gap-8 border-b border-gray-200">
          <Tab label="Tab" isActive={activeTab === "left"} onClick={() => setActiveTab("left")} />

          <Tab label="Tab" isActive={activeTab === "right"} onClick={() => setActiveTab("right")} />
        </div>

        <div className="mt-6 text-md text-gray-700">
          {activeTab === "left" && <p>왼쪽 탭이 선택됨</p>}
          {activeTab === "right" && <p>오른쪽 탭이 선택됨</p>}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-sb text-gray-900 mb-4">Badge</h2>

        <div className="flex gap-4 items-center">
          <Badge label="태그 키워드" />
          <Badge label="프론트엔드" />
          <Badge label="React" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-sb text-gray-900 mb-4">Button</h2>   
        <div className="flex gap-4 items-center">
          <Button label="Button" variant="primary" />
          <Button label="Button" variant="secondary" />
          <Button label="Button" variant="primaryOutline"  />
          <Button label="Button" variant="secondaryOutline" />
        </div>
      </section>

      <section>
        <div className="flex gap-4 items-center">
          <Button label="Button" size="medium" variant="primary" />
          <Button label="Button" size="medium" variant="secondary" />
          <Button label="Button" size="medium" variant="primaryOutline"  />
          <Button label="Button" size="medium" variant="secondaryOutline" />
        </div>
      </section>
      
      <section>
        <div className="flex gap-4 items-center">
          <Button label="Button" size="small" variant="primary" />
          <Button label="Button" size="small" variant="secondary" />
          <Button label="Button" size="small" variant="primaryOutline"  />
          <Button label="Button" size="small" variant="secondaryOutline" />
        </div>
      </section>

      <section>
        <div className="flex gap-4 items-center">
          <Button label="Button" variant="primary" disabled />
          <Button label="Button" variant="secondary" disabled />
          <Button label="Button" variant="primaryOutline" disabled />
          <Button label="Button" variant="secondaryOutline" disabled />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-sb text-gray-900 mb-4">Chip</h2>
        <div className="flex gap-4">
          <Chip label="Label" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-sb text-gray-900 mb-4">Kakao</h2> 
        <div className="bg-white rounded-lg">
          <Kakao onClick={handleKakaoClick} />
        </div>
      </section>

    </div>
  );
}
