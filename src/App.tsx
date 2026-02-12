import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

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
import Search from "@/pages/Search/Search";
import BookList from "@/pages/Routine/BookList.tsx";
import Tutorial from "@/pages/Tutorial/Tutorial";

import Splash from "@/pages/Login/Splash";
import LoginPage from "@/pages/Login/Login";
import Setting from "@/pages/Setting/Setting.tsx";
import ChangeNickname from "@/pages/Setting/ChangeNickname.tsx";
import PreferenceEditPage from "@/pages/Setting/PreferenceEdit.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [loading, setLoading] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    return !hasSeenSplash; // 기록이 없으면 true(보여줌), 있으면 false(안 보여줌)
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <Splash />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding/set-profile" element={<SetProfile />} />
          <Route path="/onboarding/level/step-1" element={<OnboardingLevelStep1 />} />
          <Route path="/onboarding/level/step-2" element={<OnboardingLevelStep2 />} />
          <Route path="/onboarding/level/step-3" element={<OnboardingLevelStep3 />} />
          <Route path="/onboarding/genre" element={<OnboardingGenre />} />
          <Route path="/onboarding/result" element={<RoutineResultPage />} />
          <Route path="/books/:bookId" element={<BookDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<Home />} />
          <Route path="/routine/timer/:bookId" element={<TimerPage />} />
          <Route path="/routine/booklist" element={<BookList />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/setting/nickname" element={<ChangeNickname />} />
          <Route path="/setting/preference-edit" element={<PreferenceEditPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function RootRedirect() {
  return <Navigate to="/login" replace />;
}

export default App;
