import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Login_Auth.css"; // 경로 주의 (보통 상위 폴더의 css 폴더)

export default function FindAccountPage() {
  // 현재 탭 상태 (find_id 또는 find_pw)
  const [activeTab, setActiveTab] = useState("find_id");

  // 입력값 상태 (이름, 아이디, 전화번호)
  const [form, setForm] = useState({
    user_name: "",
    user_id: "",
    user_phone: "",
  });

  // 결과 및 오류 메시지 상태
  const [resultMsg, setResultMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResultMsg("");
    setErrorMsg("");
  };

  // 탭 변경 시 입력값 초기화
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setForm({ user_name: "", user_id: "", user_phone: "" });
    setResultMsg("");
    setErrorMsg("");
  };

  /* -----------------------------------------------------------
     [기능 1] 아이디 찾기 (이름 + 전화번호 일치 확인)
  ----------------------------------------------------------- */
  const handleFindId = async (e) => {
    e.preventDefault();
    if (!form.user_name.trim() || !form.user_phone.trim()) {
      setErrorMsg("이름과 전화번호를 모두 입력해주세요.");
      return;
    }

    try {
      // JSON Server에서 이름과 전화번호가 모두 일치하는 유저 조회
      const res = await axios.get(
        `http://localhost:3001/users?user_name=${form.user_name}&user_phone=${form.user_phone}`
      );

      if (res.data.length > 0) {
        setResultMsg(`회원님의 아이디는 [ ${res.data[0].user_id} ] 입니다.`);
      } else {
        setErrorMsg("일치하는 사용자 정보를 찾을 수 없습니다.");
      }
    } catch (err) {
      setErrorMsg("서버 통신 오류가 발생했습니다.");
    }
  };

  /* -----------------------------------------------------------
     [기능 2] 비밀번호 찾기 (아이디 + 전화번호 일치 확인)
  ----------------------------------------------------------- */
  const handleFindPw = async (e) => {
    e.preventDefault();
    if (!form.user_id.trim() || !form.user_phone.trim()) {
      setErrorMsg("아이디와 전화번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3001/users?user_id=${form.user_id}&user_phone=${form.user_phone}`
      );

      if (res.data.length > 0) {
        setResultMsg(`회원님의 비밀번호는 [ ${res.data[0].user_pw} ] 입니다.`);
      } else {
        setErrorMsg("정보가 일치하지 않습니다.");
      }
    } catch (err) {
      setErrorMsg("서버 통신 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>계정 찾기</h2>

        {/* 탭 버튼 영역 */}
        <div className="find-tab-group">
          <button
            className={`find-tab ${activeTab === "find_id" ? "active" : ""}`}
            onClick={() => handleTabChange("find_id")}
          >
            아이디 찾기
          </button>
          <button
            className={`find-tab ${activeTab === "find_pw" ? "active" : ""}`}
            onClick={() => handleTabChange("find_pw")}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* --- 아이디 찾기 Form --- */}
        {activeTab === "find_id" && (
          <form className="auth-form" onSubmit={handleFindId}>
            <p className="find-info-text">
              가입 시 등록한 이름과 휴대폰 번호를 입력해주세요.
            </p>

            <input
              name="user_name"
              placeholder="이름"
              value={form.user_name}
              onChange={handleChange}
            />
            <input
              name="user_phone"
              placeholder="전화번호 (010-0000-0000)"
              value={form.user_phone}
              onChange={handleChange}
            />

            {errorMsg && <p className="auth-error">{errorMsg}</p>}
            {resultMsg && <p className="auth-success">{resultMsg}</p>}

            <button className="login-btn">아이디 찾기</button>
          </form>
        )}

        {/* --- 비밀번호 찾기 Form --- */}
        {activeTab === "find_pw" && (
          <form className="auth-form" onSubmit={handleFindPw}>
            <p className="find-info-text">
              가입한 아이디와 휴대폰 번호를 입력해주세요.
            </p>

            <input
              name="user_id"
              placeholder="아이디(이메일)"
              value={form.user_id}
              onChange={handleChange}
            />
            <input
              name="user_phone"
              placeholder="전화번호 (010-0000-0000)"
              value={form.user_phone}
              onChange={handleChange}
            />

            {errorMsg && <p className="auth-error">{errorMsg}</p>}
            {resultMsg && <p className="auth-success">{resultMsg}</p>}

            <button className="login-btn">비밀번호 찾기</button>
          </form>
        )}

        <div className="auth-bottom">
          <Link to="/login">로그인 화면으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}
