import { useState } from "react";
import axios from "axios";
import Login_SignUpSuccessModal from "./Login_SignUpSuccessModal";

export default function Login_SignUpForm() {
  const [form, setForm] = useState({
    user_id: "",
    user_name: "",
    user_pw: "",
  });

  const [showModal, setShowModal] = useState(false); // alert이 아닌 모달로 이쁘게 나오게 하려고했음
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // 새로고침 방지

    const exists = await axios.get(
      `http://localhost:3001/users?user_id=${form.user_id}`
    );

    if (exists.data.length > 0) {
      alert("정보를 입력해 주세요.");
      return;
    }

    // DB 저장
    await axios.post("http://localhost:3001/users", form);

    // 성공 모달 띄우기
    setUserName(form.user_name);
    setShowModal(true);
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSignUp}>
        <input name="user_id" placeholder="이메일" onChange={handleChange} />
        <input name="user_name" placeholder="이름" onChange={handleChange} />
        <input
          type="password"
          name="user_pw"
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
