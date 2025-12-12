import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function HomeCategory(props) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5; 
    const [books, setBooks] = useState([]);

    // 카드 크기 설정
    const CARD_WIDTH = 180;
    const GAP = 20;
    const MOVE_DISTANCE = CARD_WIDTH + GAP; 

    // ✨ [디자인 포인트] 카테고리별 서브타이틀 매핑
    // 카테고리 코드(props.category)에 따라 어울리는 멘트를 보여줍니다.
    const subTitles = {
        "ALL": "올빼미 클럽이 엄선한 베스트셀러 🦉",
        "DEV": "성장하는 개발자를 위한 필독서 💻",
        "AI": "미래를 여는 기술, 인공지능과 데이터 🤖",
        "NOVEL": "지친 하루를 위로하는 이야기 🌙",
        "ESSAY": "삶의 깊이를 더하는 인문학 ☕",
        "BIZ": "성공하는 비즈니스 인사이트 📊",
        "KIDS": "아이들의 꿈이 자라나는 책 🎈",
        "HOBBY": "나만의 취미로 채우는 일상 🎨",
        "SELF": "어제보다 더 나은 나를 위해 ✨"
    };

    // 만약 매핑된 게 없으면 기본 멘트 출력
    const currentSubtitle = subTitles[props.category] || "올빼미 클럽 추천 도서";


    useEffect(() => {
        let url = '';
        if (props.category === "ALL") {
            url = 'http://localhost:3001/books';
        } else {
            url = `http://localhost:3001/books?category=${props.category}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error("데이터 로드 실패:", error));
    }, [props.category]);

    const navigate = useNavigate();

    const handleNext = () => {
        if (startIndex + itemsPerPage < books.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (startIndex - itemsPerPage >= 0) {
            setStartIndex(startIndex - itemsPerPage);
        } else {
            setStartIndex(0);
        }
    };

    const handleSearch = () => {
        if (props.category === "ALL") {
            navigate(`/books`);
            return;
        }
        navigate(`/books/${props.category}`);
    };

    return (
        <section className="home-category-section" style={{ backgroundColor: props.bgColor }}>
            <div className="home-category-inner">
                
                {/* ✨ [디자인 수정됨] 헤더 영역 */}
                <div className="home-section-header">
                    {/* 왼쪽: 제목 + 서브타이틀 */}
                    <div className="header-text-group">
                        <h3 onClick={handleSearch}>
                            {props.title}
                        </h3>
                        <p className="header-subtitle">{currentSubtitle}</p>
                    </div>

                    {/* 오른쪽: 전체보기 버튼 */}
                    <div className="view-more-btn" onClick={handleSearch}>
                        전체보기 &gt;
                    </div>
                </div>


                {/* 슬라이더 컨테이너 (이전과 동일) */}
                <div className="home-book-slider-container">
                    <button 
                        className={`home-nav-btn prev ${startIndex === 0 ? 'disabled' : ''}`} 
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                    >
                        &lt;
                    </button>

                    <div style={{ overflow: 'hidden', flex: 1 }}>
                        <div 
                            className="home-item-list"
                            style={{
                                display: 'flex',
                                gap: `${GAP}px`,
                                transform: `translateX(-${startIndex * MOVE_DISTANCE}px)`,
                                transition: 'transform 0.5s ease-in-out',
                                width: 'max-content',
                                padding: '10px 0' 
                            }}
                        >
                            {books.map(book => (
                                <Link to={`/books/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
                                    <div className="home-card">
                                        <div className="home-card-image-wrapper">
                                            <img className="home-card-image" src={book.image_path} alt={book.title} />
                                        </div>
                                        <div className="home-card-info">
                                            <h4 className="home-card-title">{book.title}</h4>
                                            <p className="home-card-author">{book.authors}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button 
                        className={`home-nav-btn next ${startIndex + itemsPerPage >= books.length ? 'disabled' : ''}`} 
                        onClick={handleNext}
                        disabled={startIndex + itemsPerPage >= books.length}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </section>
    );
}