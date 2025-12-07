/*  
  📌 Login_SignUpForm.jsx
  - 회원가입 입력 처리
  - 이메일 중복 검사
  - JSON Server에 신규 회원 정보 저장
  - 회원가입 성공 모달 출력 후 로그인 페이지로 이동
*/

import { useState } from "react";
import axios from "axios";
import Login_SignUpSuccessModal from "./Login_SignUpSuccessModal";

export default function Login_SignUpForm() {
  // 입력값 상태 관리
  const [form, setForm] = useState({
    user_id: "",
    user_name: "",
    user_pw: "",
  });

  // 오류 메시지
  const [errorMsg, setErrorMsg] = useState("");

  // 성공 모달
  const [showModal, setShowModal] = useState(false);

  // 입력 변화 처리
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  // 회원가입 처리 함수
  const handleSignUp = async (e) => {
    e.preventDefault();

    /* ------------------------------
       [1] 필수 입력값 검사
    ------------------------------ */
    if (
      !form.user_id.trim() ||
      !form.user_name.trim() ||
      !form.user_pw.trim()
    ) {
      setErrorMsg("모든 입력 칸을 채워주세요.");
      return;
    }

    /* ------------------------------
       [2] 이메일 형식 검사
    ------------------------------ */
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(form.user_id)) {
      setErrorMsg("올바른 이메일 형식이 아닙니다.");
      return;
    }

    /* ------------------------------
       [3] 비밀번호 최소 글자수 검사
    ------------------------------ */
    if (form.user_pw.length < 4) {
      setErrorMsg("비밀번호는 최소 4자리 이상이어야 합니다.");
      return;
    }

    /* ------------------------------------------------------------
       [4] 아이디(이메일) 중복 검사
       - JSON Server에서 user_id가 동일한 데이터 조회
    ------------------------------------------------------------ */
    const exists = await axios.get(
      `http://localhost:3001/users?user_id=${form.user_id}`
    );

    if (exists.data.length > 0) {
      setErrorMsg("이미 존재하는 아이디입니다.");
      return;
    }

    /* ------------------------------------------------------------
       [5] 회원 정보 DB(json-server)에 저장
    ------------------------------------------------------------ */
    await axios.post("http://localhost:3001/users", form);

    // 회원가입 성공 모달 출력
    setShowModal(true);
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSignUp}>
        <input
          name="user_id"
          placeholder="아이디(이메일)"
          onChange={handleChange}
        />
        <input name="user_name" placeholder="이름" onChange={handleChange} />
        <input
          type="password"
          name="user_pw"
          placeholder="비밀번호"
          onChange={handleChange}
        />

        {errorMsg && <p className="auth-error">{errorMsg}</p>}

        <button className="signup-btn">회원가입</button>
      </form>

      {/* 회원가입 성공 시 모달 표시 */}
      {showModal && (
        <Login_SignUpSuccessModal
          userName={form.user_name}
          onClose={() => (window.location.href = "/login")}
        />
      )}
    </>
  );
}
