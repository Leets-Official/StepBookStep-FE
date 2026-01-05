import { useState } from "react";
import { Tab } from "@/components/Tab/Tab";
import { Badge } from "@/components/Badge/Badge";

export default function PlayGround() {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");

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
    </div>
  );
}
