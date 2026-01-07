
import { useState } from "react";
import { Kakao } from "@/components/Kakao/Kakao";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Toast } from "@/components/Toast/Toast";

export default function PlayGround() {
  const [isChecked, setIsChecked] = useState(false);
  const [isToastChecked, setIsToastChecked] = useState(false);

  const handleKakaoClick = () => {
    console.log("카카오 로그인 버튼 클릭!");
  };
  return (
    <div className="min-h-screen bg-white p-8 space-y-12">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-sb text-gray-900 mb-4">Kakao</h2> 
        <div className="bg-white rounded-lg">
          <Kakao onClick={handleKakaoClick} />
        </div>
      </section>

      <section className="flex flex-col ">
        <h2 className="text-lg font-sb text-gray-900 mb-4">Checkbox</h2> 
        <div className="flex items-center bg-white rounded-lg">
          <Checkbox 
            checked={isChecked} 
            onToggle={() => setIsChecked(!isChecked)} 
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-sb text-gray-900 mb-4">Toast</h2> 
        <Toast 
          label="토스트 내용을 입력합니다." 
          checked={isToastChecked} 
          onToggle={() => setIsToastChecked(!isToastChecked)} 
        />
      </section>
    </div>
  );
}
