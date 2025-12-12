/* 📌 Login_LoginForm.jsx
   - 로그인 시 유저 정보 + 만료 시간(5분)을 함께 저장
*/

import { useState } from "react";
import axios from "axios";
import LoginSuccessModal from "./Login_LoginSuccessModal";

export default function Login_LoginForm() {
  const [form, setForm] = useState({ user_id: "", user_pw: "" });
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. 유효성 검사
    if (!form.user_id.trim() || !form.user_pw.trim()) {
      setErrorMsg("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(form.user_id)) {
      setErrorMsg("올바른 이메일 형식이 아닙니다.");
      return;
    }

    // 2. 서버 통신
    try {
      const res = await axios.get(
        `http://localhost:3001/users?user_id=${form.user_id}&user_pw=${form.user_pw}`
      );

      if (res.data.length === 1) {
        const user = res.data[0];
        setUserName(user.user_name);

        /* -----------------------------------------------------------
           [수정된 부분] 
           단순 user 객체가 아니라, { value: user, expire: 시간 } 형태로 저장
        ----------------------------------------------------------- */
        const expireTime = new Date().getTime() + 5 * 60 * 1000; // 현재시간 + 5분
        
        const sessionItem = {
          value: user,       // 실제 유저 정보
          expire: expireTime // 만료 시간
        };

        localStorage.setItem("sessionUser", JSON.stringify(sessionItem));
        
        setShowModal(true);
      } else {
        setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          name="user_id"
          placeholder="아이디(이메일)"
          onChange={handleChange}
        />
        <input
          type="password"
          name="user_pw"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        {errorMsg && <p className="auth-error">{errorMsg}</p>}
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