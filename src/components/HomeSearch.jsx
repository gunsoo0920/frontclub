import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../css/Home.css"

const HomeSearch = () => {
    const navigate = useNavigate();
      
      // ✅ 검색어 상태 관리
    const [keyword, setKeyword] = useState("");
    
      // ✅ 1. 검색 기능 함수 (2글자 이상 체크)
    const handleSearch = () => {
        if (keyword.length < 2) {
            alert("검색어는 2글자 이상 입력해주세요!");
            return;
        }
        // 검색 페이지로 이동 (쿼리스트링 사용: /search?q=검색어)
        navigate(`/search?=${keyword}`);
    };
    
      // 엔터키 쳤을 때도 검색되게
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return(
        <div className="home-search-section">
            <div className="home-search-bar">
                {/* 아이콘 클래스 수정: home-search-icon */}
                <svg className="home-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>

                <input 
                    type="text" 
                    placeholder="서평을 남기고 싶은 책이 있나요?" 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button className="home-search-btn" onClick={handleSearch}>
                    검색
                </button>
            </div>
        </div>
    );
}

export default HomeSearch;




// <div className="home-search-section">
//                 <div className="home-search-bar">
//                     {/* 아이콘 클래스 수정: home-search-icon */}
//                     <svg className="home-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="11" cy="11" r="8"></circle>
//                         <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//                     </svg>

//                     <input 
//                         type="text" 
//                         placeholder="서평을 남기고 싶은 책이 있나요?" 
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                     />

//                     <button className="home-search-btn" onClick={handleSearch}>
//                         검색
//                     </button>
//                 </div>
//             </div>