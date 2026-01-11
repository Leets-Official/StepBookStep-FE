import { Menu } from "@/components/Menu/Menu";
import { MenuItem } from "@/components/Menu/MenuItem";
import { useState } from "react";

export default function PlayGround() {

  const [activeId, setActiveId] = useState<number | null>(1); // 사진처럼 2번째 아이템 기본 활성

  const handleMenuClick = (index: number) => {
    setActiveId(prev => (prev === index ? null : index));
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 font-sans">Menu</h1>

      <Menu>
        <MenuItem 
          label="Label" 
          interaction={activeId === 0} 
          onClick={() => handleMenuClick(0)} 
        />
        <MenuItem 
          label="Label" 
          interaction={activeId === 1} 
          onClick={() => handleMenuClick(1)} 
        />
        <MenuItem 
          label="Label" 
          interaction={activeId === 2} 
          onClick={() => handleMenuClick(2)} 
        />
      </Menu>
    </div>
  );
}
