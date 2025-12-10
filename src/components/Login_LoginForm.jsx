import { useState } from "react";
import axios from "axios";
import LoginSuccessModal from "./Login_LoginSuccessModal";

export default function Login_LoginForm() {
  const [form, setForm] = useState({ user_id: "", user_pw: "" });
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    // name 속성에 따라 form 값 업데이트
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost:3001/users?user_id=${form.user_id}&user_pw=${form.user_pw}`
    );

    if (res.data.length === 1) {
      const user = res.data[0];

      setUserName(user.user_name);
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
          name="user_id"
          placeholder="이메일(아이디)"
          onChange={handleChange}
        />

        <input
          type="password"
          name="user_pw"
          placeholder="비밀번호"
          onChange={handleChange}
        />

        <button className="login-btn">로그인</button>
      </form>

      {showModal && (
        <LoginSuccessModal
          userName={userName}
          onClose={() => (window.location.href = "/")}
        />
      )}
    </>
  );
}
