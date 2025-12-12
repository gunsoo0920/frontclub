### ✨ 1. 자동 로그아웃 (Idle Timeout) 구현
- **기능:** 사용자가 5분 동안 활동(클릭, 키보드, 마우스 이동)이 없으면 보안을 위해 자동 로그아웃 처리.
- **방식:** `localStorage`에 유저 정보와 함께 `expire`(만료 시간) 저장. `App.js`에서 전역으로 활동 감지 및 시간 연장.
- **수정 파일:** `App.js`, `Login_LoginForm.jsx`, `Header.jsx`

### 🎨 2. UI/UX 애니메이션 강화
- **Scroll Reveal:** 메인 페이지 스크롤 시 각 섹션이 부드럽게 떠오르는 등장 효과(Fade-in) 적용.
- **Smooth Slider:** 책 리스트 슬라이더가 뚝뚝 끊기지 않고, 부드럽게 옆으로 미끄러지도록(Sliding) 개선. (5개 단위 이동)
- **수정 파일:** `HomePage.jsx`, `HomeCategory.jsx`, `Home.css`

### 💄 3. 디자인 디테일 수정
- **카테고리 헤더:** 제목만 붕 떠 보이는 현상 해결을 위해 하단 라인(Border) 추가.
- **서브타이틀:** 각 카테고리(ALL, DEV, NOVEL 등)에 맞는 감성적인 서브타이틀 멘트 자동 매핑.
