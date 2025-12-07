/**
 * BookListPage.jsx
 *
 * NOTE:
 *  - 전체/개별 PAGE 모두 사용되는 공통 도서 리스트 페이지
 *  - defaultCategory, showFilter, pageTitle은 상위 라우트에서 주입 가능
 *  - DB 데이터는 GET /books (json-server 기준)
 */

import React, { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';
import '../../css/booklist.css';
import { Link } from "react-router-dom";

const BookListPage = ({
  defaultCategory = "ALL",
  pageTitle = "🦉올빼미클럽 전체 도서",
  showFilter = true      // 개별 페이지에서는 false 를 전달해 필터 숨기기
}) => {

  // 전체 books
  const [books, setBooks] = useState([]);

  // 현재 필터된 books
  const [filteredBooks, setFilteredBooks] = useState([]);

  // 현재 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // 더보기 (초기 20개)
  const [visibleCount, setVisibleCount] = useState(20);

  
  /* ----- 1. DB 로딩 ----- */
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);     // 기본 전체 보여주기
      })
      .catch(err => console.error(" DB 로드 실패:", err));
  }, []);


  /* ----- 2. 카테고리 변경 ----- */
  useEffect(() => {

    /**
     * NOTE:
     *  - 개별 페이지는 defaultCategory를 전달받음 (Kids/Dev 등)
     *  - ALL이면 전체 보여주기
     */
    if (selectedCategory === "ALL") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter(book => book.category === selectedCategory)
      );
    }

    // 카테고리 바뀌면 다시 20개만
    setVisibleCount(20);

  }, [selectedCategory, books]);


  // 필터 클릭
  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  // 더 보기
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };


  return (
    <div className="book-list-container">


      {/* 
        TODO: Merge 후 삭제
        - 임시로 개별 페이지 이동 테스트용 버튼
        - 메인페이지에서 메뉴 section으로 대체해야 함 
      */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/books"><button>전체</button></Link>
        <Link to="/books/kids"><button>유아/아동</button></Link>
        <Link to="/books/essay"><button>에세이</button></Link>
        <Link to="/books/hobby"><button>취미</button></Link>
        <Link to="/books/dev"><button>개발/IT</button></Link>
      </div>


      {/* ----- 페이지 타이틀 ----- */}
      <header className="page-header">
        <div className="title-section">
          <h2 className="page-title">{pageTitle}</h2>
        </div>
      </header>


      {/* ----- 필터 + 총 권수 섹션 ----- */}
      <div className="filter-container">

        {showFilter && (
          <div className="filter-buttons">

            <button
              className={`filter-btn ${selectedCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => handleFilter('ALL')}
            >전체</button>

            <button
              className={`filter-btn ${selectedCategory === 'KIDS' ? 'active' : ''}`}
              onClick={() => handleFilter('KIDS')}
            >유아/아동</button>

            <button
              className={`filter-btn ${selectedCategory === 'ESSAY' ? 'active' : ''}`}
              onClick={() => handleFilter('ESSAY')}
            >에세이</button>

            <button
              className={`filter-btn ${selectedCategory === 'HOBBY' ? 'active' : ''}`}
              onClick={() => handleFilter('HOBBY')}
            >취미</button>

            <button
              className={`filter-btn ${selectedCategory === 'DEV' ? 'active' : ''}`}
              onClick={() => handleFilter('DEV')}
            >개발/IT</button>

          </div>
        )}

        {/* --- 항상 표시되는 부분 (총 권수) --- */}
        <div className="sort-options">
          총 {filteredBooks.length}권
        </div>

      </div>


      {/* ----- 도서 카드 그리드 ----- */}
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

export default BookListPage;
