import HomeCategory from "../components/HomeCategory"
import HomeSlider from "../components/HomeSlider"
import HomeSearch from "../components/HomeSearch";

import "../css/Home.css"
import { useState, useEffect } from 'react';

const bookCategory = {
  "ALL": "🦉올빼미클럽 전체 도서",
  "DEV": "개발, 프로그래밍",
  "AI": "인공지능, 데이터",
  "SELF": "자기계발, 공부법",
  "NOVEL": "소설, 에세이",
  "ESSAY": "인문, 에세이",
  "BIZ": "경제, 경영, 스타트업",
  "KIDS": "유아, 아동",
  "HOBBY": "취미, 라이프 스타일"
};

export default function HomePage(){
    return(
        <div className="home-container">
            {/* 메인 슬라이더 */}
            <HomeSlider />

            {/* ▼ 검색 섹션 (클래스 이름 수정됨) */}
            
            <HomeSearch />

            {/* 카테고리 목록들 */}
            <HomeCategory
                title={bookCategory["DEV"]}
                category={"DEV"}
                bgColor="#f9f9f9" 
            />

            <HomeCategory
                title={bookCategory["AI"]}
                category={"AI"}
                bgColor="#ffffff"

            />

     
            <HomeCategory
                title={bookCategory["NOVEL"]}
                category={"NOVEL"}
                bgColor="#f9f9f9"

            />

            <HomeCategory
                // books={selectCategory(CategoryKey[4])} 
                // title={bookCategory[CategoryKey[4]]}
                // category={CategoryKey[4]}
                title={bookCategory["SELF"]}
                category={"SELF"}
                bgColor="#ffffff"
                // setBookIdHandle={setBookIdHandle}
                // setCategoryHandle={setCategoryHandle}
            />
        </div>
    )
}