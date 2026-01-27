import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetailPage from "@/pages/Routine/BookDetail";
import TimerPage from "@/pages/Routine/Timer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bookdetail" element={<BookDetailPage />} />
        <Route path="/routine/timer" element={<TimerPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
