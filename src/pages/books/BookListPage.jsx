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

const API = "http://localhost:3001";

const BookListPage = ({
  defaultCategory = "ALL",
  pageTitle = "🦉올빼미클럽 전체 도서",
  showFilter = true
}) => {

  // 전체 books
  const [books, setBooks] = useState([]);

  // 현재 필터된 books
  const [filteredBooks, setFilteredBooks] = useState([]);

  // 현재 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // 정렬 상태
  const [sortType, setSortType] = useState("DEFAULT");

  // 더보기 (초기 20개)
  const [visibleCount, setVisibleCount] = useState(20);


  /* ----- 1. DB 로딩 + 리뷰 개수 병합 ----- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, reviewRes] = await Promise.all([
          fetch(`${API}/books`),
          fetch(`${API}/reviews`)
        ]);

        const bookData = await bookRes.json();
        const reviewData = await reviewRes.json();

        const reviewCountMap = {};
        reviewData.forEach(r => {
          reviewCountMap[r.bookId] = (reviewCountMap[r.bookId] || 0) + 1;
        });

        const booksWithReviewCount = bookData.map(book => ({
          ...book,
          reviewCount: reviewCountMap[book.id] || 0
        }));

        setBooks(booksWithReviewCount);
        setFilteredBooks(booksWithReviewCount);

      } catch (err) {
        console.error("DB 로드 실패:", err);
      }
    };

    fetchData();
  }, []);


  /* ----- 2. 필터 + 정렬 통합 처리 ----- */
  useEffect(() => {

    let result = [];

    // 1️⃣ 카테고리 필터
    if (selectedCategory === "ALL") {
      result = [...books];
    } else {
      result = books.filter(book => book.category === selectedCategory);
    }

    // 2️⃣ 정렬
    if (sortType === "TITLE") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title, "ko-KR", {
          numeric: true,
          sensitivity: "base"
        })
      );
    }

    if (sortType === "REVIEW") {
      result.sort((a, b) =>
        b.reviewCount - a.reviewCount
      );
    }

    setFilteredBooks(result);
    setVisibleCount(20);

  }, [books, selectedCategory, sortType]);


  // 필터 클릭
  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  // 정렬 변경
  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  // 더 보기
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };


  return (
    <div className="book-list-container">

      <header className="page-header">
        <div className="title-section">
          <h2 className="page-title">{pageTitle}</h2>
        </div>
      </header>

      <div className="filter-container">

        {showFilter && (
          <div className="filter-buttons">
            <button className={`filter-btn ${selectedCategory === 'ALL' ? 'active' : ''}`} onClick={() => handleFilter('ALL')}>전체</button>
            <button className={`filter-btn ${selectedCategory === 'KIDS' ? 'active' : ''}`} onClick={() => handleFilter('KIDS')}>유아/아동</button>
            <button className={`filter-btn ${selectedCategory === 'ESSAY' ? 'active' : ''}`} onClick={() => handleFilter('ESSAY')}>에세이</button>
            <button className={`filter-btn ${selectedCategory === 'HOBBY' ? 'active' : ''}`} onClick={() => handleFilter('HOBBY')}>취미</button>
            <button className={`filter-btn ${selectedCategory === 'DEV' ? 'active' : ''}`} onClick={() => handleFilter('DEV')}>개발/IT</button>
          </div>
        )}

        <div className="sort-options">
          <select value={sortType} onChange={handleSort}>
            <option value="DEFAULT">기본순</option>
            <option value="TITLE">가나다순</option>
            <option value="REVIEW">서평 많은 순</option>
          </select>
          <span>총 {filteredBooks.length}권</span>
        </div>

      </div>

      <div className="book-grid">
        {filteredBooks.slice(0, visibleCount).map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

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
