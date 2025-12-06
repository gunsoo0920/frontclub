🦉 BookList 구현 기록 — 정익

1.작업 파트 :
전체 도서 리스트(BookList)

카테고리 필터 (ALL, KIDS, ESSAY, HOBBY, DEV)

개별 페이지 라우터 연결

더보기 기능

반응형 그리드 UI

JSON-server 데이터 연동


2.라우팅 구조 :
사용한 Route
/books
/books/kids
/books/essay
/books/hobby
/books/dev

팀원에게 URL 충돌 방지 위해 /books 를 시작 라우트로 변경함
MainPage가 / 사용

BookListPage 하나로 공통 구조
defaultCategory props로 필터링
showFilter = false 로 개별페이지에서 필터 숨김 처리

3.주요 props
Props 설명 :
defaultCategory-기본 카테고리 설정
showFilter-필터 숨김 조정
pageTitle-각 페이지에 개별 타이틀 표시

4.TODO :
일단 BookListPage 상단 임시 페이지버튼을 만들었음 (개별 페이지용)
나중에 MainPage와 Merge후 삭제해야함

서평(reviewCount)
현제 서평(댓글) DB 구조가 없어서
reviewCount = book.reviewCount || 9
형태로 default value로 사용 중(서평 9건 << 고정임)
나중에 서평(댓글) 테이블 연결하면
GET /comments?bookId=xx  << 이런 형태의 length 기반으로 대체 예정

서버:
JSON-server 데이터 사용하였음
엔드포인트: GET /books
DB 주소: http://localhost:3001/books
카테고리 코드 기준

(Header+Footer)
이거 순규씨가 메인페이지 HEADER와 FOOTER를 COMPONENTS로 만들고 사용하는게 맞는거 같음...... 그래서 일단 Header와Footer가 없음