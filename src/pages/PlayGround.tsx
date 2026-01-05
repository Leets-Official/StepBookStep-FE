import { useState } from "react";
import { Tab } from "@/components/Tab/Tab";

export default function PlayGround() {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex gap-8 border-gray-200">
        <Tab label="Tab" isActive={activeTab === "left"} onClick={() => setActiveTab("left")} />

        <Tab label="Tab" isActive={activeTab === "right"} onClick={() => setActiveTab("right")} />
      </div>

      <div className="mt-6 text-md text-gray-700">
        {activeTab === "left" && <p>왼쪽 탭이 선택됨</p>}
        {activeTab === "right" && <p>오른쪽 탭이 선택됨</p>}
      </div>
    </div>
  );
}
