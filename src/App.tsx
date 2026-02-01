import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

import Splash from "@/pages/Login/Splash";
import LoginPage from "@/pages/Login/Login";

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
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MyPage />} />
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
        <Route path="/routine/timer" element={<TimerPage />} />      
        <Route path="/routine/booklist" element={<BookList />} />     
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}


export default App;
