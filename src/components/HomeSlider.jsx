import React, { useState, useEffect, useRef } from 'react';
// 위에서 작성한 CSS 파일을 import 하세요 (경로에 맞게 수정)
import '../css/HomeSlider.css'; 

// 이미지 import
import sliderImg1 from '../assets/images/slider1.png';
import sliderImg2 from '../assets/images/slider2.png';
import sliderImg3 from '../assets/images/slider3.png';

const slidesData = [
  {
    id: 1,
    imageSrc: sliderImg1,
    tabTitle: "올빼미 서평",
    bgColor: "#fff5e6" // 필요 없다면 제거 가능
  },
  {
    id: 2,
    imageSrc: sliderImg2,
    tabTitle: "책 일기",
    bgColor: "#e6ffe6"
  },
  {
    id: 3,
    imageSrc: sliderImg3,
    tabTitle: "서평 남기기",
    bgColor: "#e6e6ff"
  }
];

export default function HomeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스 (0부터 시작)
  const [isPlaying, setIsPlaying] = useState(true);    // 자동 재생 여부

  // 자동 슬라이드 기능
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); 
    }
    return () => clearInterval(interval); // 컴포넌트가 사라지거나 멈출 때 타이머 해제
  }, [isPlaying]);

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1
    );
  };

  // 다음 슬라이드로 이동
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 재생/일시정지 토글
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 탭 클릭 시 해당 슬라이드로 이동
  const handleTabClick = (index) => {
    setCurrentIndex(index);
    // 탭을 직접 클릭하면 자동 재생을 잠시 멈추고 싶다면 아래 주석 해제
    // setIsPlaying(false); 
  };

  return (
    <div className="slider-container">
      {/* 1. 이미지 표시 영역 */}
      <img 
        src={slidesData[currentIndex].imageSrc} 
        alt={slidesData[currentIndex].tabTitle} 
        className="slide-image"
      />

      {/* 2. 하단 컨트롤러 및 탭 래퍼 */}
      <div className="slider-controls-wrapper">
        
        {/* 왼쪽: 컨트롤 박스 (페이지 번호, 화살표, 일시정지) */}
        <div className="control-box">
          <span className="page-info">
            {currentIndex + 1} / {slidesData.length}
          </span>
          <button className="control-btn" onClick={handlePrev}>
            &lt; {/* 왼쪽 화살표 */}
          </button>
          <button className="control-btn" onClick={togglePlay}>
            {isPlaying ? '||' : '▶'} {/* 일시정지/재생 아이콘 */}
          </button>
          <button className="control-btn" onClick={handleNext}>
            &gt; {/* 오른쪽 화살표 */}
          </button>
        </div>

        {/* 오른쪽: 탭 버튼 (올빼미 서평, 책 일기 등) */}
        <div className="tabs-box">
          {slidesData.map((slide, index) => (
            <button
              key={slide.id}
              className={`tab-btn ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {slide.tabTitle}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}