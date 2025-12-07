import { useState } from "react";
import axios from "axios";
import LoginSuccessModal from "./LoginSuccessModal";

export default function Login_LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost:4000/users?email=${form.email}&password=${form.password}`
    );

    if (res.data.length === 1) {
      const user = res.data[0];

      // 사용자 이름 state 저장
      setUserName(user.username);

      // 모달 띄우기
      setShowModal(true);

      // 로그인 정보 저장
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      alert("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="이메일(아이디)"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <button className="login-btn">로그인</button>
      </form>

      {/* 모달 렌더링 */}
      {showModal && (
        <LoginSuccessModal
          userName={userName}
          onClose={() => (window.location.href = "/")} // 모달 닫을 때 이동
        />
      )}
    </>
  );
}
