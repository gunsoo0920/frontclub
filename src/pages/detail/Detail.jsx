import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/bookdetail.css";

const API = "http://localhost:3001";

const Detail = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingContent, setEditingContent] = useState("");


  // ⭐ 나의 리뷰만 따로 저장할 state
  const [myReviews, setMyReviews] = useState([]);

  // 로그인 유저 확인
  const user = JSON.parse(localStorage.getItem("user"));

  /* ---------------------------
      📘 책 상세 조회
  ---------------------------- */
  useEffect(() => {
    fetch(`${API}/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("책 상세조회 실패:", err));
  }, [id]);

  /* ---------------------------
      📝 리뷰 목록 조회
  ---------------------------- */
  useEffect(() => {
    fetch(`${API}/reviews?bookId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("후기 목록 실패:", err));
  }, [id]);

  /* ---------------------------
      ⭐ 리뷰가 바뀔 때마다 
      “내가 쓴 리뷰만” 필터링
  ---------------------------- */
  useEffect(() => {
    if (user) {
      setMyReviews(reviews.filter((r) => r.userId === user.id));
    }
  }, [reviews, user]);

  if (!book) return <div>📚 책 정보를 불러오는 중...</div>;

  /* ---------------------------
      ✏️ 리뷰 작성 (POST)
  --------------------------- */
  const handleCreateReview = () => {
    if (!newReview.trim()) return alert("내용을 입력해주세요.");
    if (!user) return alert("로그인 후 작성 가능합니다.");

    const reviewData = {
      bookId: Number(id),
      userId: user.id,
      userName: user.name,
      content: newReview,
      createdAt: Date.now(),
    };

    fetch(`${API}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews((prev) => [...prev, data]);
        setNewReview("");
      })
      .catch((err) => console.error("리뷰 작성 실패:", err));
  };

  /* ---------------------------
      ✏️ 리뷰 수정 시작
  --------------------------- */
  const startEdit = (review) => {
    setEditingReviewId(review.id);
    setEditingContent(review.content);
  };

  /* ---------------------------
      ✏️ 리뷰 수정 완료 (PUT)
  --------------------------- */
  const handleUpdateReview = (reviewId) => {
    fetch(`${API}/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...reviews.find((r) => r.id === reviewId),
        content: editingContent,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setReviews((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        );
        setEditingReviewId(null);
      });
  };

  /* ---------------------------
      🗑 리뷰 삭제 (DELETE)
  --------------------------- */
  const handleDeleteReview = (reviewId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    fetch(`${API}/reviews/${reviewId}`, {
      method: "DELETE",
    }).then(() => {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    });
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-layout">
        {/* ============ LEFT ============ */}
        <div className="detail-left">

          {/* 헤더 */}
          <div className="book-header-box">
            <h2 className="book-header-title">{book.title}</h2>
            <p className="book-header-sub">
              따뜻한 사랑과 감동을 전하는 도서입니다.
            </p>
          </div>

          {/* -------- 도서 기본 정보 -------- */}
          <section className="info-section">
            <h3>📘 도서 정보</h3>
            <div className="info-grid">
              <div><span>도서명 :</span> {book.title}</div>
              <div><span>저자 :</span> {book.authors}</div>
              <div><span>출판사 :</span> {book.publisher || "정보 없음"}</div>
              <div><span>ISBN :</span> {book.isbn}</div>
              <div><span>카테고리 :</span> {book.category}</div>
            </div>
          </section>

          {/* -------- 나의 리뷰 영역 -------- */}
          <section className="my-review-section">
            <h3>⭐ 나의 리뷰</h3>

            {myReviews.length === 0 && (
              <p className="no-my-review">아직 내가 작성한 리뷰가 없습니다.</p>
            )}

            {myReviews.map((review) => (
              <div key={review.id} className="review-card my-review-card">

                <div className="review-card-header">
                  <strong>{review.userName}</strong>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {editingReviewId === review.id ? (
                  <div className="review-edit-block">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <div className="review-edit-btns">
                      <button onClick={() => handleUpdateReview(review.id)}>
                        수정 완료
                      </button>
                      <button onClick={() => setEditingReviewId(null)}>취소</button>
                    </div>
                  </div>
                ) : (
                  <p className="review-text">{review.content}</p>
                )}

                {user && user.id === review.userId && editingReviewId !== review.id && (
                  <div className="review-action">
                    <button onClick={() => startEdit(review)}>수정</button>
                    <button onClick={() => handleDeleteReview(review.id)}>삭제</button>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* -------- 후기 작성 -------- */}
          <section className="review-write-section">
            <h3>✏️ 후기 작성</h3>

            {!user && <p className="login-warn">로그인 후 작성 가능합니다.</p>}

            {user && (
              <div className="review-write-box">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="후기를 입력하세요..."
                ></textarea>
                <button onClick={handleCreateReview} className="write-btn">
                  작성하기
                </button>
              </div>
            )}
          </section>

          {/* -------- 전체 후기 리스트 -------- */}
          <section className="review-list-section">
            <h3>📝 후기 목록 ({reviews.length})</h3>

            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <strong>{review.userName}</strong>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {editingReviewId === review.id ? (
                  <div className="review-edit-block">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <div className="review-edit-btns">
                      <button onClick={() => handleUpdateReview(review.id)}>
                        수정 완료
                      </button>
                      <button onClick={() => setEditingReviewId(null)}>취소</button>
                    </div>
                  </div>
                ) : (
                  <p className="review-text">{review.content}</p>
                )}

                {user && user.id === review.userId && editingReviewId !== review.id && (
                  <div className="review-action">
                    <button onClick={() => startEdit(review)}>수정</button>
                    <button onClick={() => handleDeleteReview(review.id)}>삭제</button>
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>

        {/* ============ RIGHT ============ */}
        <aside className="detail-right">
          <div className="detail-cover-box">
            <img src={book.image_path} alt={book.title} className="cover-img" />
          </div>

          <h3 className="side-title">{book.title}</h3>
          <p className="side-author">{book.authors}</p>

          <div className="side-info">
            <p><strong>ISBN</strong> {book.isbn}</p>
            <p><strong>분류</strong> {book.category}</p>
          </div>

          <div className="side-buttons">
            <button className="btn-yellow">도서 리뷰 작성</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Detail;