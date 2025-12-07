import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookListPage from "./pages/books/BookListPage";
import KidsPage from "./pages/books/KidsPage";
import EssayPage from "./pages/books/EssayPage";
import HobbyPage from "./pages/books/HobbyPage";
import DevPage from "./pages/books/DevPage";
import Detail from "./pages/detail/Detail";


// NOTE: 임시 테스트용 Route
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 전체 리스트 */}
        <Route path="/books" element={<BookListPage />} />
          {/* 상세 페이지 */}
        <Route path="/books/:id" element={<Detail />} />

        {/* 개별 */}
        <Route path="/books/kids" element={<KidsPage />} />
        <Route path="/books/essay" element={<EssayPage />} />
        <Route path="/books/hobby" element={<HobbyPage />} />
        <Route path="/books/dev" element={<DevPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
