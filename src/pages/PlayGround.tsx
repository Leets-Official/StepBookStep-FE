import { useState } from "react";
import { TextField } from "@/components/TextField/TextField";
import type { TextFieldState } from "@/components/TextField/TextField.types"; 

export default function PlayGround() {

  const [searchValue, setSearchValue] = useState("");
  const [filledValue, setFilledValue] = useState("Sample Text");

  const [successValue, setSuccessValue] = useState("Correct Input");
  const [errorValue, setErrorValue] = useState("Wrong Input");

  const [emailValue, setEmailValue] = useState("");


//이메일 확인
  const getEmailState = (value: string): TextFieldState => {
    if (value.length === 0) return "default"; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(value) ? "success" : "error";
  };

  const currentEmailState = getEmailState(emailValue);

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">TextField Component Playground</h1>

      {/* TextField 섹션 */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">TextField - 상태별 예시</h2>

        {/* 1. Default State */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">1. Default State (빈 필드)</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Help Text"
            icon={true}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* 2. Focus State */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">2. Focus State (클릭 시)</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Help Text"
            icon={true}
          />
        </div>

        {/* 3. Filled State */}
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

        {/* 4. Filled State (고정) */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">4. Filled State</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Help Text"
            icon={true}
          />
        </div>

        {/* 5. Success State */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">5. Success State</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Success Text"
            icon={true}
            value={successValue}
            onChange={(e) => setSuccessValue(e.target.value)}
            state="success"
          />
        </div>

        {/* 6. Error State */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">6. Error State</p>
          <TextField
            title="Title"
            placeholder="Placeholder"
            helpText="Error Text"
            icon={true}
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
            state="error"
          />
        </div>

        {/* 구분선 */}
        <hr className="border-gray-200" />

        {/* 7. 실제 동작 테스트  */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">7. Interactive Test </h2>
      
          <TextField
            title="이메일 입력"
            placeholder="example@email.com"
            helpText={
              currentEmailState === "error" 
                ? "올바른 이메일 형식이 아닙니다." 
                : currentEmailState === "success" 
                  ? "사용 가능한 이메일입니다." 
                  : "이메일을 입력해주세요."
            }
            icon={true}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            state={currentEmailState}
          />
        </div>

      </section>
    </div>
  );
}