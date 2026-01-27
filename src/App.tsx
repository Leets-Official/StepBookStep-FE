import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetailPage from "@/pages/Routine/BookDetail";
import RoutineWritePage from "@/pages/Routine/RoutineWrite";
import RoutineGoalUpdate from "@/pages/Routine/RoutineGoalUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bookdetail" element={<BookDetailPage />} />
        <Route path="/routine/write" element={<RoutineWritePage />} />
        <Route path="/routine/goalupdate" element={<RoutineGoalUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
