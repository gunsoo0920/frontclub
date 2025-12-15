import React from 'react';
import '../css/footer.css'; // 아래 CSS 파일을 만들어주세요

export default function Footer() {
  return (
    <footer className="night-footer">
      <div className="footer-container">
        
        {/* 1. 로고 및 슬로건 */}
        <div className="footer-section brand">
          <h2 className="footer-logo">🦉 올빼미클럽</h2>
          <p className="footer-slogan">
            모두가 잠든 밤, <br />
            우리는 지혜를 깨웁니다.
          </p>
        </div>

        {/* 2. 팀원 소개  */}
        <div className="footer-section team">
          <h3>Team Night Owls</h3>
          <ul className="member-list">
            <li>
              <span className="role">팀장</span>
              <span className="name">임건수</span>
            </li>
            <li>
              <span className="role">팀원</span>
              <span className="name">권순규</span>
            </li>
            <li>
              <span className="role">팀원</span>
              <span className="name">손정익</span>
            </li>
            <li>
              <span className="role">팀원</span>
              <span className="name">김성현</span>
            </li>
          </ul>
        </div>

        {/* 3. 메뉴 및 정보 */}
        <div className="footer-section links">
          <h3>Information</h3>
          <ul>
            <li><a href="#!">이용약관</a></li>
            <li><a href="#!">개인정보처리방침</a></li>
            <li><a href="#!">고객센터</a></li>
            <li><a href="#!">채용정보</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-separator"></div>

      {/* 4. 하단 저작권 및 SNS */}
      <div className="footer-bottom">
        <p>&copy; 2024 Owl Club Corp. All rights reserved.</p>
        
      </div>
    </footer>
  );
}