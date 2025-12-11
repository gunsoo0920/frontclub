/*  
    📌 Login_LoginForm.jsx
    - 로그인 입력 처리
    - JSON Server에서 사용자 정보 조회
    - 로그인 성공 시 localStorage에 유저정보 저장(세션처럼 유지)
    - 로그인 성공 모달 출력
  */

import { useState } from "react";
import axios from "axios";
import LoginSuccessModal from "./Login_LoginSuccessModal";

export default function Login_LoginForm() {
  // 로그인 입력값 상태 저장
  const [form, setForm] = useState({ user_id: "", user_pw: "" });

  // 로그인 성공 모달
  const [showModal, setShowModal] = useState(false);

  // 로그인한 사용자 이름을 모달에서 표시
  const [userName, setUserName] = useState("");

  // 화면에 표시할 오류 메시지
  const [errorMsg, setErrorMsg] = useState("");

  // 입력값 변경 시 호출되는 함수
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // 새로운 입력 발생 시 기존 오류문구 삭제
    setErrorMsg("");
  };

  // 로그인 버튼 클릭 시 동작 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // form 자체 새로고침 방지

    /* ------------------------------
        [1] 입력값 기본 유효성 검사
      ------------------------------ */
    if (!form.user_id.trim() || !form.user_pw.trim()) {
      setErrorMsg("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    /* ------------------------------
        [2] 아이디 형식 검사(이메일 형태)
      ------------------------------ */
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(form.user_id)) {
      setErrorMsg("올바른 이메일 형식이 아닙니다.");
      return;
    }

    /* ------------------------------------------------------------
        [3] JSON Server에서 사용자가 입력한 id/pw가 일치하는지 조회
        예: /users?user_id=aaa@aaa.com&user_pw=1234
      ------------------------------------------------------------ */
    const res = await axios.get(
      `http://localhost:3001/users?user_id=${form.user_id}&user_pw=${form.user_pw}`
    );

    /* ------------------------------
        [4] 로그인 성공 여부 판단
      ------------------------------ */
    if (res.data.length === 1) {
      const user = res.data[0];

      // 모달에서 표시할 이름 저장
      setUserName(user.user_name);

      /* -------------------------------------------------------------------
          [중요] 로그인 상태 유지 → localStorage 활용 (세션처럼 사용)
          - JSON Server는 세션/쿠키 기능이 없음
          - 따라서 localStorage에 로그인 정보를 저장하여 "로그인 상태 유지" 처리
          - 새로고침/페이지 이동/브라우저 종료 후에도 유지됨
          - 과제에서는 가장 단순하고 실용적인 방식
        ------------------------------------------------------------------- */
      localStorage.setItem("sessionUser", JSON.stringify(user));

      // 로그인 성공 모달 출력
      setShowModal(true);
    } else {
      // 아이디/비밀번호 불일치 시 오류문구 표시
      setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
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

      {/* 로그인 성공 시 모달 표시 */}
      {showModal && (
        <LoginSuccessModal
          userName={userName}
          onClose={() => (window.location.href = "/")}
        />
      )}
    </>
  );
}
