import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetailPage from "@/pages/BookDetail/BookDetailPage";
import TimerPage from "@/pages/Routine/Timer";
import SetProfile from "@/pages/Onboarding/SetProfile";
import OnboardingLevelStep1 from "@/pages/Onboarding/OnboardingLevelStep1";
import OnboardingLevelStep2 from "@/pages/Onboarding/OnboardingLevelStep2";
import OnboardingLevelStep3 from "@/pages/Onboarding/OnboardingLevelStep3";
import OnboardingGenre from "@/pages/Onboarding/OnboardingGenre";
import RoutineResultPage from "@/pages/Onboarding/RoutineResultPage";
import Home from "@/pages/Home/Home.tsx";
import MyPage from "@/pages/MyPage";
import Search from "./pages/Search/Search";


import BookList from "@/pages/Routine/BookList.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/onboarding/set-profile" element={<SetProfile />} />
        <Route path="/onboarding/level/step-1" element={<OnboardingLevelStep1 />} />
        <Route path="/onboarding/level/step-2" element={<OnboardingLevelStep2 />} />
        <Route path="/onboarding/level/step-3" element={<OnboardingLevelStep3 />} />
        <Route path="/onboarding/genre" element={<OnboardingGenre />} />
        <Route path="/onboarding/result" element={<RoutineResultPage />} />
        <Route path="/bookdetail" element={<BookDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/home" element={<Home />} />
        <Route path="/routine/timer" element={<TimerPage />} />      
        <Route path="/routine/timer" element={<TimerPage />} /> 
        <Route path="/routine/booklist" element={<BookList />} />     
      </Routes>
    </BrowserRouter>
  );
}


export default App;
