/*  
  📌 LoginSuccessModal.jsx
  - 로그인 성공 시 표시되는 모달 컴포넌트
  - userName을 props로 받아 "OOO님 환영합니다!" 출력
*/

import "../css/Login_Auth.css";

export default function LoginSuccessModal({ userName, onClose }) {
  return (
    <div className="login-modal-overlay">
      <div className="login-modal-box">
        <h2>환영합니다 🎉</h2>
        <p>
          <strong>{userName}</strong> 님, 로그인에 성공했습니다!
        </p>

        {/* 확인 버튼 클릭 시 상위 컴포넌트에서 전달된 onClose 실행 */}
        <button className="modal-close-btn" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
