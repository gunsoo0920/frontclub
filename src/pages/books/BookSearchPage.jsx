import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import '../../css/booklist.css'; // ⭐ 기존 CSS 그대로 사용
import SortButtons from '../../components/SortCP';


const BookSearchPage = () => {
  // URL의 ?q=검색어 가져오기
  const [searchParams] = useSearchParams();
  const query = searchParams.get('title') || ""; // 검색어

  // 전체 데이터
  const [books, setBooks] = useState([]);
  // 검색 결과 데이터
  const [filteredBooks, setFilteredBooks] = useState([]);
  // 더보기 카운트
  const [visibleCount, setVisibleCount] = useState(20);

  /* ----- 1. DB 로딩 ----- */
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
      })
      .catch(err => console.error("DB 로드 실패:", err));
  }, []);

  /* ----- 2. 검색어가 바뀔 때마다 필터링 ----- */
  useEffect(() => {
    if (query === "") {
      setFilteredBooks([]); // 검색어 없으면 빈 화면 (혹은 전체 보여주기도 가능)
    } else {
      // ⭐ 제목에 검색어가 포함된 것만 필터링 (대소문자 무시)
      const result = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(result);
    }
    setVisibleCount(20); // 검색 바뀌면 카운트 초기화
  }, [query, books]);

  // 더 보기
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };



  return (
    <div className="book-list-container">

      {/* ----- 페이지 타이틀 ----- */}
      <header className="page-header">
        <div className="title-section">
          <h2 className="page-title">🔍 "{query}" 검색 결과</h2>
        </div>
      </header>

      {/* ----- 검색 결과 정보 & 초기화 ----- */}
      <div className="filter-container">
        
        {/* 검색 결과가 없을 때 안내 메시지 */}
        {filteredBooks.length === 0 && query !== "" && (
          <div style={{ padding: "20px", color: "red", fontWeight: "bold" }}>
             검색된 도서가 없습니다.
          </div>
        )}

        <div className="sort-options">
           총 {filteredBooks.length}권 발견됨

        </div>
      </div>

      {/* ----- 도서 카드 그리드 (기존 CSS 활용) ----- */}
      <div className="book-grid">
        {filteredBooks.slice(0, visibleCount).map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* ----- 더보기 버튼 ----- */}
      {visibleCount < filteredBooks.length && (
        <div className="load-more-wrapper">
          <button className="load-more-btn" onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}

    </div>
  );
};

export default BookSearchPage;
