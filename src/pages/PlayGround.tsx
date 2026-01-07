import { useState } from "react";
import { TextField } from "@/components/TextField/TextField";

export default function PlayGround() {
  // TextField용 state
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [filledValue, setFilledValue] = useState("Sample Text");

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">TextField Component Playground</h1>

      {/* TextField 섹션 */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">TextField - 4가지 상태</h2>

        {/* 1. Default State - 빈 입력 필드 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">1. Default State (빈 필드)</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Help Text"
            icon={true}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onIconClick={() => console.log("Search:", searchValue)}
          />
        </div>

        {/* 2. Focus State - 포커스 시 검정 테두리 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">2. Focus State (클릭하면 검정 테두리)</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Help Text"
            icon={true}
          />
        </div>

        {/* 3. Filled State - 값이 입력된 상태 (회색 배경) */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">3. Filling State</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Help Text"
            icon={true}
            value={filledValue}
            onChange={(e) => setFilledValue(e.target.value)}
          />
        </div>

        {/* 4. Filled State */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">4. Filled State</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Help Text"
            icon={true}
          />
        </div>
      </section>

      
    </div>
  );
}