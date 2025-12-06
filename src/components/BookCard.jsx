/**
 * BookCard.jsx
 *
 * NOTE:
 *  - 하나의 책을 카드 형태로 렌더링
 *  - 이미지, 제목, 저자, 서평수, 카테고리 태그 포함
 *  - BookListPage에서 map으로 반복 렌더링
 */

import React from 'react';
import '../css/booklist.css';

const BookCard = ({ book }) => {

    // 구조 분해
    const { title, authors, image_path, category } = book;


    /** NOTE:
    * 현재 댓글 기능이 json-server에 없으므로 임시값 사용 중
    * 나중에 댓글 기능 구현 시:
    *   - GET /comments?bookId={id}
    *   - 길이(length)로 reviewCount 계산하여 표시 예정
    */
    const reviewCount = book.reviewCount || 9;


    /**
     * 제목 글자수 제한
     * - 책 제목이 너무 길어지면 UI깨짐 방지
     */
    const truncateTitle = (text, maxLength) => {
        if (text.length > maxLength) return text.substring(0, maxLength) + '...';
        return text;
    };

    // UI용 제목
    const displayTitle = truncateTitle(title, 20);


    /**
     * 카테고리 영문을 한국어 태그로 변환
     * (json-server는 영문 category 사용 중)
     */
    const getCategoryName = (code) => {
        const names = {
            'DEV': '개발',
            'AI': '인공지능',
            'SELF': '자기계발',
            'NOVEL': '소설',
            'ESSAY': '에세이',
            'BIZ': '경제경영',
            'KIDS': '초등/유아',
            'HOBBY': '취미'
        };
        return names[code] || '일반';
    };


    return (
        <div className="book-card">

            {/* ----- 썸네일 ----- */}
            <div className="card-image-wrapper">
                <img src={image_path} alt={title} className="book-image" />

                {/* ----- 이미지 태그 (카테고리 + 신간) ----- */}
                <div className="tag-list">
                    <span className="tag highlight">{getCategoryName(category)}</span>
                    <span className="tag new">신간</span>
                </div>
            </div>


            {/* ----- 도서정보 영역 ----- */}
            <div className="book-info">

                {/* 제목 */}
                <h3 className="book-title">{displayTitle}</h3>

                <div className='border-bottom'></div>

                {/* 저자 + 서평 */}
                <div className="book-meta">
                    <span className="book-author">{authors}</span>
                    <span className="review-count">서평 {reviewCount}건</span>
                </div>

            </div>
        </div>
    );
};

export default BookCard;
