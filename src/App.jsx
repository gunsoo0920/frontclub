import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login_LoginPage from "./pages/Login_LoginPage";
import Login_SignUpPage from "./pages/Login_SignPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 처음 실행 → /login 으로 강제 이동 */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login_LoginPage />} />
        <Route path="/signup" element={<Login_SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
