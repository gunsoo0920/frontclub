import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css"

export default function HomeCategory(props) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5; // 한 번에 보여줄 책 개수
    const [books, setBooks] = useState([]);

    useEffect(() => {
        let url = '';
        if (props.category === "ALL"){ // '==' 보다는 '===' 사용 권장
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
    

    // 다음 버튼 클릭
    const handleNext = () => {
        if (startIndex + itemsPerPage < books.length) {
            setStartIndex(startIndex + 1);
        }
    };

    // 이전 버튼 클릭
    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleSearch = () => {
        if (props.category === "ALL"){
            navigate(`/books`)
            return
        }
        navigate(`/books/${props.category}`);
    }

    // 현재 화면에 보여줄 책들만 잘라내기
    const visibleBooks = books.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="home-category-section" style={{ backgroundColor: props.bgColor }}>
            <div className="home-category-inner">
                
                {/* 헤더 */}
                <div className="home-section-header">
                    <h3 onClick={handleSearch} style={{ cursor: 'pointer' }}>
                        {props.title}
                    </h3>
                </div>

                {/* 슬라이더 영역 */}
                <div className="home-book-slider-container">
                    
                    {/* 왼쪽 버튼 */}
                    <button 
                        className={`home-nav-btn prev ${startIndex === 0 ? 'disabled' : ''}`} 
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                    >
                        &lt;
                    </button>

                    {/* 리스트 영역 */}
                    <div className="home-item-list">
                        {/* 데이터 로딩 전에는 books가 비어있으므로 아무것도 안 뜹니다.
                           로딩이 완료되면 자동으로 리스트가 나타납니다.
                        */}
                        {visibleBooks.map(book => (
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

                    {/* 오른쪽 버튼 */}
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
