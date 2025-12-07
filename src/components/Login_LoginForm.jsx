import { useState } from "react";
import axios from "axios";
import LoginSuccessModal from "./Login_LoginSuccessModal";

export default function Login_LoginForm() {
  const [form, setForm] = useState({ user_id: "", user_pw: "" }); // 입력된 회원가입 정보 저장
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 저장
  const [userName, setUserName] = useState(""); // 모달에서 보여줄 사용자 이름 저장

  const handleChange = (e) => {
    setForm({ ...form, [e.target.user_name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); //새로고침 방지

    const res = await axios.get(
      `http://localhost:3001/users?user_id=${form.user_id}&user_pw=${form.user_pw}`
    );

    if (res.data.length === 1) {
      const user = res.data[0];

      // 사용자 이름 state 저장
      setUserName(user.user_name);

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
          name="user_id"
          placeholder="이메일(아이디)"
          onChange={handleChange}
        />
        <input
          type="user_pw"
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
