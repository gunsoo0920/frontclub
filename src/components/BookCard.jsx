import React, { useState, useEffect } from "react";
import "../css/booklist.css";
import { Link } from "react-router-dom";

const API = "http://localhost:3001";

const BookCard = ({ book }) => {
  const [reviewCount, setReviewCount] = useState(0);

  // 모두 안전하게 처리
  const title = book?.title ?? "제목 없음";
  const authors = book?.authors ?? "저자 미상";
  const image = book?.image_path ?? "/not-found.png"; // fallback 이미지
  const category = book?.category ?? "ETC";

  const truncateTitle = (text, max) =>
    text.length > max ? text.substring(0, max) + "..." : text;

  const displayTitle = truncateTitle(title, 20);

  const getCategoryName = (code) => {
    const names = {
      DEV: "개발",
      AI: "인공지능",
      SELF: "자기계발",
      NOVEL: "소설",
      ESSAY: "에세이",
      BIZ: "경제경영",
      KIDS: "초등/유아",
      HOBBY: "취미",
    };
    return names[code] ?? "일반";
  };

  // 리뷰 카운트도 null-safe
  useEffect(() => {
    if (!book?.id) return;
    fetch(`${API}/reviews?bookId=${book.id}`)
      .then((res) => res.json())
      .then((data) => setReviewCount(data.length ?? 0))
      .catch((err) => console.error("리뷰 개수 로드 실패:", err));
  }, [book?.id]);

  return (
    <Link
      to={`/books/${book?.id ?? ""}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="book-card">
        <div className="card-image-wrapper">
          <img src={image} alt={title} className="book-image" />

          <div className="tag-list">
            <span className="tag highlight">{getCategoryName(category)}</span>
            <span className="tag new">신간</span>
          </div>
        </div>

        <div className="book-info">
          <h3 className="book-title">{displayTitle}</h3>

          <div className="border-bottom"></div>

          <div className="book-meta">
            <span className="book-author">{authors}</span>
            <span className="review-count">서평 {reviewCount}건</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
