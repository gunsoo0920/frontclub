import Login_LoginForm from "../components/Login_LoginForm";
import { Link } from "react-router-dom";
import "../css/Login_Auth.css";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>로그인 / 회원가입</h2>

        {/* 소셜 로그인 */}
        <button className="kakao-btn">카카오 계정으로 시작</button>
        <button className="naver-btn">네이버 계정으로 시작</button>
        <button className="google-btn">구글 계정으로 시작</button>

        <hr />

        <Login_LoginForm />

        <div className="auth-bottom">
          <span>계정이 없나요?</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
