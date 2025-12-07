import Login_LoginForm from "../components/Login_LoginForm";
import { Link } from "react-router-dom";
import "../css/Login_Auth.css";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>로그인 / 회원가입</h2>

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
