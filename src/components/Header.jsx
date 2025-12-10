import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'; 

import "../css/Header.css"; // CSS 파일 임포트 확인

export default function Header(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUser(user); 
        }
    }, []);

    function remove_user() {
        localStorage.removeItem("user");
        setUser(null); 
    }

    return (
        <header className="header-wrapper">
            <div className="header-inner">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>올빼미 서평</h1>
                    </Link>
                </div>

                <div className="auth-buttons">
                    {user ? (
                        <>
                            <span className="user-greeting">반가워요, <strong>{user.user_name}</strong>님</span>
                            <button className="text-btn" onClick={remove_user}>로그아웃</button>
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