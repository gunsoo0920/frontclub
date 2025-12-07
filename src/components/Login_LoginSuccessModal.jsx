import "../css/Login_Auth.css";

export default function LoginSuccessModal({ userName, onClose }) {
  return (
    <div className="login-modal-overlay">
      <div className="login-modal-box">
        <h2>환영합니다 🎉</h2>
        <p>
          <strong>{userName}</strong> 님, 로그인에 성공했습니다!
        </p>

        <button className="modal-close-btn" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
