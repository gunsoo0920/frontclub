# 📚 React + JSON Server 로그인/회원가입 구현

본 프로젝트는 React와 JSON Server를 이용하여  
간단한 로그인 및 회원가입 기능을 구현했습니다.

---

## 📂 기본 폴더 구조

```
src/
 ├ components/
 │   ├ Login_LoginForm.jsx
 │   ├ Login_SignUpForm.jsx
 │   ├ Login_LoginSuccessModal.jsx
 │   └ Login_SignUpSuccessModal.jsx
 │
 ├ pages/
 │   ├ Login_LoginPage.jsx
 │   └ Login_SignUpPage.jsx
 │
 ├ css/
 │   └ Login_Auth.css
 │
 └ App.jsx
```

---

## 🔐 세션 유지 방식 (중요)

본 프로젝트는 JSON Server 특성상 **실제 서버 세션을 사용할 수 없으므로**,  
**localStorage를 이용하여 세션과 동일한 효과를 구현**했습니다.

### ✔ 로그인 성공 시

```js
localStorage.setItem("sessionUser", JSON.stringify(user));
```

### ✔ 로그인 상태 확인

```js
const user = JSON.parse(localStorage.getItem("sessionUser"));
```

### ✔ 로그아웃 시

```js
localStorage.removeItem("sessionUser");
```

➡ 이 방식 덕분에 **새로고침 또는 페이지 이동 후에도 로그인 상태가 유지**됩니다.

---

## ✨ 주요 기능 설명

### 🔑 1. 로그인 기능

- user_id(아이디), user_pw(비밀번호)를 JSON Server에서 조회하여 인증
- 로그인 성공 시 localStorage에 sessionUser 저장(세션 유지)
- 성공 모달 표시

### 📝 2. 회원가입 기능

- user_id 중복 검사(JSON Server 기반)
- 이메일 형식 체크 / 비밀번호 최소 길이 체크
- 회원가입 성공 시 모달 표시 후 로그인 페이지로 이동

### 🔒 3. 인증이 필요한 기능 처리

- localStorage에 sessionUser가 없으면 접근 차단 가능
  ```js
  if (!localStorage.getItem("sessionUser")) {
    alert("로그인 후 이용해주세요.");
  }
  ```

---

## 🛠 JSON Server 실행

```bash
json-server --watch db.json --port 3001
```
