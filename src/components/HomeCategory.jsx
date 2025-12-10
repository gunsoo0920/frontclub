import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css"

export default function HomeCategory(props) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5; // 한 번에 보여줄 책 개수
    const [books, setBooks] = useState([]);
    // 데이터 로딩
    useEffect(() => {
        fetch(`http://localhost:3001/books?category=${props.category}`)
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
        navigate(`/books?category=${props.category}`);
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


// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";

// export default function HomeCategory(props) {
//     // 1. 슬라이더 처리를 위한 상태만 남김 (keyword 관련 state 삭제)
//     const [startIndex, setStartIndex] = useState(0);
//     const itemsPerPage = 5; 

//     const navigate = useNavigate();

//     // 2. 제목 클릭 시 이동하는 함수
//     const handleSearch = () => {
//         // 부모(HomePage)에서 넘겨준 props.category를 바로 사용 (예: "ESSAY")
//         navigate(`/books?category=${props.category}`);
//     }

//     // 다음 버튼
//     const handleNext = () => {
//         if (startIndex + itemsPerPage < props.books.length) {
//             setStartIndex(startIndex + 1);
//         }
//     };

//     // 이전 버튼
//     const handlePrev = () => {
//         if (startIndex > 0) {
//             setStartIndex(startIndex - 1);
//         }
//     };

//     // 보여줄 책 잘라내기
//     const visibleBooks = props.books.slice(startIndex, startIndex + itemsPerPage);

//     return (
//         <section className="home-category-section" style={{ backgroundColor: props.bgColor }}>
//             <div className="home-category-inner">
                
//                 {/* 헤더 영역 */}
//                 <div className="home-section-header">
//                     {/* 3. onClick 이벤트 추가 
//                         - 마우스를 올렸을 때 손가락 모양이 나오도록 cursor: pointer 스타일 추가
//                     */}
//                     <h3 onClick={handleSearch} style={{ cursor: 'pointer' }}>
//                         {props.title}
//                     </h3>
//                 </div>

//                 {/* 슬라이더 영역 */}
//                 <div className="home-book-slider-container">
                    
//                     {/* 왼쪽 버튼 */}
//                     <button 
//                         className={`home-nav-btn prev ${startIndex === 0 ? 'disabled' : ''}`} 
//                         onClick={handlePrev}
//                         disabled={startIndex === 0}
//                     >
//                         &lt;
//                     </button>

//                     {/* 책 리스트 */}
//                     <div className="home-item-list">
//                         {visibleBooks.map(book => (
//                             <Link to={`/books/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
//                                 <div className="home-card">
//                                     <div className="home-card-image-wrapper">
//                                         <img className="home-card-image" src={book.image_path} alt={book.title} />
//                                     </div>
//                                     <div className="home-card-info">
//                                         <h4 className="home-card-title">{book.title}</h4>
//                                         <p className="home-card-author">{book.authors}</p>
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>

//                     {/* 오른쪽 버튼 */}
//                     <button 
//                         className={`home-nav-btn next ${startIndex + itemsPerPage >= props.books.length ? 'disabled' : ''}`} 
//                         onClick={handleNext}
//                         disabled={startIndex + itemsPerPage >= props.books.length}
//                     >
//                         &gt;
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// }