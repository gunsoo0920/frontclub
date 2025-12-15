import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

/* 페이지 import */
import LoginPage from "./pages/Login_LoginPage";
import SignUpPage from "./pages/Login_SignPage";
import FindAccountPage from "./pages/FindAccountPage";
import BookListPage from "./pages/books/BookListPage";
import KidsPage from "./pages/books/KidsPage";
import EssayPage from "./pages/books/EssayPage";
import HobbyPage from "./pages/books/HobbyPage";
import DevPage from "./pages/books/DevPage";
import Detail from "./pages/detail/Detail";
import BookSearchPage from "./pages/books/BookSearchPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ✅ [추가됨] 페이지 이동 시 스크롤을 맨 위로 올리는 컴포넌트
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  // 1. [핵심] 앱이 켜질 때 '즉시' 시간을 검사해서 유저 상태를 결정함
  const [user, setUser] = useState(() => {
    const storedStr = localStorage.getItem("sessionUser");
    if (!storedStr) return null;

    const item = JSON.parse(storedStr);
    const now = new Date().getTime();

    // 시간이 지났으면? -> 바로 삭제하고 null 리턴 (로그아웃 상태로 시작)
    if (now > item.expire) {
      localStorage.removeItem("sessionUser");
      return null;
    }

    // 시간 안 지났으면? -> 유저 정보 리턴 (로그인 상태로 시작)
    return item.value;
  });

  // 2. 로그아웃 함수 (Header에 내려줄 것임)
  const handleLogout = () => {
    localStorage.removeItem("sessionUser");
    setUser(null);
    window.location.href = "/";
  };

  // 3. 시간 연장 & 자동 로그아웃 감시 (기존 로직 유지)
  useEffect(() => {
    if (!user) return; // 로그아웃 상태면 감시 안 함

    const updateExpireTime = () => {
      const storedStr = localStorage.getItem("sessionUser");
      if (storedStr) {
        const item = JSON.parse(storedStr);
        // 활동 감지 시 5분 연장
        const newExpire = new Date().getTime() + 5 * 60 * 1000;
        const newItem = { value: item.value, expire: newExpire };
        localStorage.setItem("sessionUser", JSON.stringify(newItem));
      }
    };

    const timer = setInterval(() => {
      const storedStr = localStorage.getItem("sessionUser");
      if (storedStr) {
        const item = JSON.parse(storedStr);
        if (new Date().getTime() > item.expire) {
          alert("장시간 활동이 없어 자동 로그아웃 되었습니다.");
          handleLogout();
        }
      }
    }, 1000);

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      clearInterval(timer);
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, [user]);

  return (
    <BrowserRouter>
      {/* ✅ [추가됨] 라우터 최상단에 배치하여 페이지 변경 시마다 스크롤 초기화 */}
      <ScrollToTop />

      {/* ⭐ Header에게 user 정보와 로그아웃 기능을 물려줌 (Props) */}
      <Header user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/find-account" element={<FindAccountPage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<Detail />} />
        <Route path="/books/kids" element={<KidsPage />} />
        <Route path="/books/essay" element={<EssayPage />} />
        <Route path="/books/hobby" element={<HobbyPage />} />
        <Route path="/books/dev" element={<DevPage />} />
        <Route path="/search" element={<BookSearchPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
