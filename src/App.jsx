import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* 🔹 로그인 관련 페이지 (gunsoo 브랜치) */
import Login_LoginPage from "./pages/Login_LoginPage";
import Login_SignUpPage from "./pages/Login_SignPage";

/* 🔹 책 리스트 & 상세 페이지 (너 작업) */
import BookListPage from "./pages/books/BookListPage";
import KidsPage from "./pages/books/KidsPage";
import EssayPage from "./pages/books/EssayPage";
import HobbyPage from "./pages/books/HobbyPage";
import DevPage from "./pages/books/DevPage";
import Detail from "./pages/detail/Detail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ⭐ 첫 실행 시 → /login으로 이동 */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ⭐ 로그인/회원가입 */}
        <Route path="/login" element={<Login_LoginPage />} />
        <Route path="/signup" element={<Login_SignUpPage />} />

        {/* ⭐ 전체 책 리스트 */}
        <Route path="/books" element={<BookListPage />} />

        {/* ⭐ 상세 페이지 */}
        <Route path="/books/:id" element={<Detail />} />

        {/* ⭐ 카테고리별 페이지 */}
        <Route path="/books/kids" element={<KidsPage />} />
        <Route path="/books/essay" element={<EssayPage />} />
        <Route path="/books/hobby" element={<HobbyPage />} />
        <Route path="/books/dev" element={<DevPage />} />

      </Routes>
    </BrowserRouter>
  );
}
