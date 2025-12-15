import Login_SignUpForm from "../components/Login_SignUpForm";
import { Link } from "react-router-dom";
import "../css/Login_Auth.css";

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>회원가입</h2>

        <Login_SignUpForm />

        <div className="auth-bottom">
          <span>이미 계정이 있나요?</span>
          <Link to="/login">로그인 하기</Link>
        </div>
      </div>
    </div>
  );
}
