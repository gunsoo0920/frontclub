# HomePage
## src/pages/HomePage
  - 위치
## 저장 데이터 : userId, page, category, bookId
  - userId : 로그인시
  - page : 현재 위치(예: main페이지, 로그인 페이지 등등)
  - category : 책 목록 페이지
  - bookId : 상세페이지
## handle : 로그인, 로그아웃, setuserid/page/category
## return test, <PageHeader>, <PageBody>, <PageFooter>
  - test: 위의 저장 데이터 확인
  - PageHeader : 로고와 로그인, 회원가입/ 로그아웃
  - PageBody : page에 따라서 변경가능 switch
  - PageFooter : 

### PageBody :
  ## 정보 가져오기 
  - HomePage -> return -> PageBody에 원하는 정보 정의
  - 조합은 switch에서 
  ## 패아자 이동
  - setPageHandle값 넣으면 switch를 통해 불러옴