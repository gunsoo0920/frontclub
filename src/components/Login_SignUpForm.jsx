import { useState } from "react";
import axios from "axios";
import Login_SignUpSuccessModal from "./Login_SignUpSuccessModal";
// (위 모달 파일이 같은 폴더에 있어야 함)

export default function Login_SignUpForm() {
  // 입력값 상태 관리 (user_phone 추가)
  const [form, setForm] = useState({
    user_id: "",
    user_name: "",
    user_pw: "",
    user_phone: "",
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
       [1] 필수 입력값 검사 (전화번호 포함)
    ------------------------------ */
    if (
      !form.user_id.trim() ||
      !form.user_name.trim() ||
      !form.user_pw.trim() ||
      !form.user_phone.trim()
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
       [3] 전화번호 형식 검사 (010-XXXX-XXXX)
    ------------------------------ */
    const phoneCheck = /^010-\d{4}-\d{4}$/;
    if (!phoneCheck.test(form.user_phone)) {
      setErrorMsg("전화번호는 '010-0000-0000' 형식으로 입력해주세요.");
      return;
    }

    /* ------------------------------
       [4] 비밀번호 최소 글자수 검사
    ------------------------------ */
    if (form.user_pw.length < 4) {
      setErrorMsg("비밀번호는 최소 4자리 이상이어야 합니다.");
      return;
    }

    /* ------------------------------------------------------------
       [5] 아이디 중복 검사
    ------------------------------------------------------------ */
    const exists = await axios.get(
      `http://localhost:3001/users?user_id=${form.user_id}`
    );

    if (exists.data.length > 0) {
      setErrorMsg("이미 존재하는 아이디입니다.");
      return;
    }

    /* ------------------------------------------------------------
       [6] 회원 정보 DB 저장
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
        {/* 전화번호 입력 추가 */}
        <input
          name="user_phone"
          placeholder="전화번호 (010-0000-0000)"
          onChange={handleChange}
          maxLength="13"
        />
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
