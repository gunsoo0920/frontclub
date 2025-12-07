import { useState } from "react";
import axios from "axios";
import Login_SignUpSuccessModal from "./Login_SignUpSuccessModal";

export default function Login_SignUpForm() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const exists = await axios.get(
      `http://localhost:4000/users?email=${form.email}`
    );

    if (exists.data.length > 0) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }

    // DB 저장
    await axios.post("http://localhost:4000/users", form);

    // 성공 모달 띄우기
    setUserName(form.username);
    setShowModal(true);
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSignUp}>
        <input name="email" placeholder="이메일" onChange={handleChange} />
        <input name="username" placeholder="이름" onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />

        <button className="signup-btn">회원가입</button>
      </form>

      {/* 회원가입 완료 모달 */}
      {showModal && (
        <Login_SignUpSuccessModal
          userName={userName}
          onClose={() => (window.location.href = "/login")}
        />
      )}
    </>
  );
}
