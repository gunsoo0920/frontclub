import "../css/Login_Auth.css";

export default function Login_SignUpSuccessModal({ userName, onClose }) {
  return (
    <div className="login-modal-overlay">
      <div className="login-modal-box">
        <h2>회원가입 완료 🎉</h2>
        <p>
          <strong>{userName}</strong> 님, 가입을 환영합니다!
        </p>

        <button className="modal-close-btn" onClick={onClose}>
          로그인하러 가기
        </button>
      </div>
    </div>
  );
}
