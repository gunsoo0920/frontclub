import { Routes, Route, Navigate } from "react-router-dom";

// 📌 만든 페이지들 불러오기 (파일 경로 확인!)
import LoginPage from "./pages/Login_LoginPage";
import SignUpPage from "./pages/Login_SignPage";
import FindAccountPage from "./pages/FindAccountPage";

function App() {
  return (
    <Routes>
      {/* [1] 기본 경로("/") 접속 시 로그인 페이지("/login")로 자동 이동 
        - replace: 뒤로가기 했을 때 다시 원래 페이지로 돌아오지 않게 함
      */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* [2] 각 페이지 라우팅 설정 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/find-account" element={<FindAccountPage />} />
    </Routes>
  );
}

export default App;
