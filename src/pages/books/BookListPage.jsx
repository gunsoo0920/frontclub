import React, { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';
import '../../css/booklist.css';
import { Link } from "react-router-dom";

const BookListPage = ({
  defaultCategory = "ALL",
  pageTitle = "🦉올빼미클럽 전체 도서",
  showFilter = true
}) => {

  const [books, setBooks] = useState([]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const [visibleCount, setVisibleCount] = useState(20);

  const [searchTerm, setSearchTerm] = useState("");


  /* ----- 1. DB 로딩 ----- */
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch(err => console.error(" DB 로드 실패:", err));
  }, []);


  /* ----- 2. 카테고리 + 검색 필터 ----- */
  useEffect(() => {

    let result = books;

    if (selectedCategory !== "ALL") {
      result = result.filter(book => book.category === selectedCategory);
    }

    const term = (searchTerm ?? "").toString().toLowerCase();

    if (term !== "") {
      result = result.filter(book =>
        (book.title ?? "").toString().toLowerCase().includes(term) ||
        (book.authors ?? "").toString().toLowerCase().includes(term)
      );
    }

    setFilteredBooks(result);
    setVisibleCount(20);

  }, [selectedCategory, books, searchTerm]);



  const handleFilter = (category) => {
    setSelectedCategory(category);
  };


  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };


  return (
    <div className="book-list-container">

      {/* Test 메뉴 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/books"><button>전체</button></Link>
        <Link to="/books/kids"><button>유아/아동</button></Link>
        <Link to="/books/essay"><button>에세이</button></Link>
        <Link to="/books/hobby"><button>취미</button></Link>
        <Link to="/books/dev"><button>개발/IT</button></Link>
      </div>


      {/* 제목 */}
      <header className="page-header">
        <div className="title-section">
          <h2 className="page-title">{pageTitle}</h2>
        </div>
      </header>



      {/* 🔥 검색창: 필터 위로 이동 */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="책 제목 또는 작가 검색…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>



      {/* 필터 */}
      <div className="filter-container">

        {showFilter && (
          <div className="filter-buttons">

            <button className={`filter-btn ${selectedCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => handleFilter('ALL')}>전체</button>

            <button className={`filter-btn ${selectedCategory === 'KIDS' ? 'active' : ''}`}
              onClick={() => handleFilter('KIDS')}>유아/아동</button>

            <button className={`filter-btn ${selectedCategory === 'ESSAY' ? 'active' : ''}`}
              onClick={() => handleFilter('ESSAY')}>에세이</button>

            <button className={`filter-btn ${selectedCategory === 'HOBBY' ? 'active' : ''}`}
              onClick={() => handleFilter('HOBBY')}>취미</button>

            <button className={`filter-btn ${selectedCategory === 'DEV' ? 'active' : ''}`}
              onClick={() => handleFilter('DEV')}>개발/IT</button>

          </div>
        )}

        <div className="sort-options">
          총 {filteredBooks.length}권
        </div>

      </div>



      {/* 리스트 */}
      <div className="book-grid">
        {filteredBooks
          .slice(0, visibleCount)
          .filter(Boolean)
          .map(book => (
            <BookCard key={book?.id ?? Math.random()} book={book} />
          ))}
      </div>


      {/* 더보기 */}
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
