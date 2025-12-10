import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import BookCard from '../../components/BookCard';
import '../../css/booklist.css';

// 한글 제목 매핑
const categoryNames = {
  "ALL": "🦉올빼미클럽 전체 도서",
  "DEV": "개발, 프로그래밍",
  "AI": "인공지능, 데이터",
  "SELF": "자기계발, 공부법",
  "NOVEL": "소설, 에세이",
  "ESSAY": "인문, 에세이",
  "BIZ": "경제, 경영, 스타트업",
  "KIDS": "유아, 아동",
  "HOBBY": "취미, 라이프 스타일"
};

const BookListPage2 = () => {
  // 1. URL에서 카테고리 값 가져오기 (?category=DEV)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'ALL';

  // 2. 책 데이터 상태 (이제 '전체'와 '필터'를 따로 둘 필요가 없습니다)
  const [books, setBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);

  /* ----- 3. 서버에서 데이터 가져오기 (핵심 수정!) ----- */
  useEffect(() => {
    
    // 기본 URL
    let url = 'http://localhost:3001/books';

    // 'ALL'이 아니면 쿼리스트링 추가 (?category=값)
    // 예: http://localhost:3001/books?category=HOBBY
    if (currentCategory !== 'ALL') {
      url += `?category=${currentCategory}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // 서버가 이미 걸러준 데이터를 그대로 넣습니다.
        setBooks(data);
        // 카테고리가 바뀌었으니 더보기 카운트 초기화
        setVisibleCount(20);
      })
      .catch(err => console.error("DB 로드 실패:", err));

  }, [currentCategory]); // ★ URL의 카테고리가 바뀔 때마다 서버에 다시 요청


  // 필터 버튼 클릭 시 URL 변경
  const handleFilter = (newCategory) => {
    setSearchParams({ category: newCategory });
  };

  // 더 보기
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  return (
    <div className="book-list-container">

      {/* 페이지 타이틀 */}
      <header className="page-header">
        <div className="title-section">
          <h2 className="page-title">
            {categoryNames[currentCategory] || "도서 목록"}
          </h2>
        </div>
      </header>

      {/* 필터 버튼 영역 */}
      <div className="filter-container">
        <div className="filter-buttons">
          {/* 버튼 리스트 (기존과 동일) */}
          {Object.keys(categoryNames).map((key) => {
             // "전체 도서" 등 긴 이름 말고 버튼용 짧은 이름이 필요하면 별도 배열 사용 권장
             // 여기선 편의상 키값 사용 예시
             if(key === "ALL") return (
                <button key={key} className={`filter-btn ${currentCategory === 'ALL' ? 'active' : ''}`} onClick={() => handleFilter('ALL')}>전체</button>
             );
             return (
               <button 
                 key={key} 
                 className={`filter-btn ${currentCategory === key ? 'active' : ''}`}
                 onClick={() => handleFilter(key)}
               >
                 {/* 버튼 이름을 한글 매핑에서 가져와서 간단히 표시 (필요시 수정) */}
                 {categoryNames[key].split(',')[0]} 
               </button>
             )
          })}
        </div>

        <div className="sort-options">
          총 {books.length}권
        </div>
      </div>

      {/* 도서 카드 그리드 */}
      <div className="book-grid">
        {books.slice(0, visibleCount).map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* 더보기 버튼 */}
      {visibleCount < books.length && (
        <div className="load-more-wrapper">
          <button className="load-more-btn" onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}

    </div>
  );
};

export default BookListPage2;