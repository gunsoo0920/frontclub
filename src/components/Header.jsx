import { Link } from "react-router-dom";
import "../css/Header.css"; 

// props로 user와 onLogout 함수를 받아옵니다.
export default function Header({ user, onLogout }) {
    
    // 내부에서 useState, useEffect 쓰던 거 싹 다 삭제!
    // 오직 props.user만 믿습니다.

    return (
        <header className="header-wrapper">
            <div className="header-inner">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>올빼미 서평</h1>
                    </Link>
                </div>

                <div className="auth-buttons">
                    {/* App.js가 준 user가 있으면 로그인 상태 */}
                    {user ? (
                        <>
                            <span className="user-greeting">반가워요, <strong>{user.user_name}</strong>님</span>
                            {/* App.js가 준 로그아웃 함수 실행 */}
                            <button className="text-btn" onClick={onLogout}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button className="text-btn">로그인</button></Link>
                            <Link to="/signup"><button className="filled-btn">회원가입</button></Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}