import React, { useState } from "react";
import { format } from "date-fns";
import { DatePicker } from "@/components/DatePicker/DatePicker";

const PlayGround: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="bg-white p-6 rounded-xl  text-center space-y-4 w-[320px]">
        <p className="text-lg">
          {selectedDate ? format(selectedDate, "선택된 날짜 : yyyy년 MM월 dd일") : "날짜 미선택"}
        </p>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            Date Picker 열기
          </button>
        )}
      </div>

      {isOpen && (
        <div className="flex flex-col items-center gap-2">
          <DatePicker
            selectedDate={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              console.log("날짜 변경됨:", format(date, "yyyy-MM-dd"));
            }}
            onClose={() => {
              setIsOpen(false);
              console.log("닫기 버튼 클릭됨");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayGround;
