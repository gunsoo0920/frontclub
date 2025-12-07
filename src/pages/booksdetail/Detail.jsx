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

  // 로그인 유저 확인(localStorage)
  const user = JSON.parse(localStorage.getItem("user"));

//   책 상세조회
  useEffect(() => {
    fetch(`${API}/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("책 상세조회 실패:", err));
  }, [id]);

//   후기 목록 조회
  useEffect(() => {
    fetch(`${API}/reviews?bookId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("후기 목록 실패:", err));
  }, [id]);

  if (!book) return <div>📚 책 정보를 불러오는 중...</div>;

    // 후기 작성하기 (POST)
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

//    후기 수정 시작
  const startEdit = (review) => {
    setEditingReviewId(review.id);
    setEditingContent(review.content);
  };

//    후기 수정하기 (PUT)
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

   // 후기 삭제하기 (DELETE)
  const handleDeleteReview = (reviewId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    fetch(`${API}/reviews/${reviewId}`, {
      method: "DELETE",
    }).then(() => {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    });
  };

  return (
    <div className="detail-container">
      {/*  책 정보 영역 */}
      <h2>{book.title}</h2>
      <img src={book.image_path} alt={book.title} className="detail-image" />

      <p>저자: {book.authors}</p>
      <p>카테고리: {book.category}</p>

      <hr />

      {/* 후기 작성  */}
      <section className="review-section">
        <h3>📌 후기 작성</h3>

        {!user && (
          <p style={{ color: "gray" }}>로그인 후 후기 작성이 가능합니다.</p>
        )}

        {user && (
          <div className="review-write-box">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="후기를 입력하세요..."
            ></textarea>
            <button onClick={handleCreateReview}>작성하기</button>
          </div>
        )}
      </section>

      <hr />

      {/* 후기 목록  */}
      <section>
        <h3>📚 후기 목록 ({reviews.length}개)</h3>

        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <p className="review-user">
              {review.userName} ({review.userId})
            </p>

            {/* 수정 중 */}
            {editingReviewId === review.id ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                ></textarea>
                <button onClick={() => handleUpdateReview(review.id)}>수정 완료</button>
                <button onClick={() => setEditingReviewId(null)}>취소</button>
              </>
            ) : (
              <>
                <p className="review-content">{review.content}</p>

                {/* 로그인 유저 == 작성자일 때만 수정 , 삭제 버튼 표시 */}
                {user && user.id === review.userId && (
                  <div className="review-buttons">
                    <button onClick={() => startEdit(review)}>수정</button>
                    <button onClick={() => handleDeleteReview(review.id)}>
                      삭제
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Detail;