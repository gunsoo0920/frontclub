import Login_LoginForm from "../components/Login_LoginForm";
import { Link } from "react-router-dom";
import "../css/Login_Auth.css";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>로그인 / 회원가입</h2>

        <hr className="auth-divider" />

        <Login_LoginForm />

        <div className="auth-bottom">
          {/* 찾기 페이지로 이동하는 링크 추가 */}
          <div style={{ marginBottom: "15px" }}>
            <Link
              to="/find-account"
              style={{
                fontSize: "13px",
                color: "#666",
                textDecoration: "underline",
              }}
            >
              아이디 / 비밀번호 찾기
            </Link>
          </div>

          <span>계정이 없나요?</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
