import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SetProfile from "@/pages/Onboarding/SetProfile";
import OnboardingLevelStep1 from "@/pages/Onboarding/OnboardingLevelStep1";
import OnboardingLevelStep2 from "@/pages/Onboarding/OnboardingLevelStep2";
import OnboardingLevelStep3 from "@/pages/Onboarding/OnboardingLevelStep3";
import OnboardingGenre from "@/pages/Onboarding/OnboardingGenre";
import RoutineResultPage from "@/pages/Onboarding/RoutineResultPage";
import BookDetailPage from "@/pages/BookDetail/BookDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding/set-profile" />} />
        <Route path="/onboarding/set-profile" element={<SetProfile />} />
        <Route path="/onboarding/level/step-1" element={<OnboardingLevelStep1 />} />
        <Route path="/onboarding/level/step-2" element={<OnboardingLevelStep2 />} />
        <Route path="/onboarding/level/step-3" element={<OnboardingLevelStep3 />} />
        <Route path="/onboarding/genre" element={<OnboardingGenre />} />
        <Route path="/onboarding/result" element={<RoutineResultPage />} />
        <Route path="/bookdetail" element={<BookDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
