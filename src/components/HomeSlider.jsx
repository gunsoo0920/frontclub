import React, { useState, useEffect } from 'react';
import '../css/HomeSlider.css'; 

// 이미지 경로 (그대로 유지)
import sliderImg1 from '../assets/images/slider1.png';
import sliderImg2 from '../assets/images/slider2.png';
import sliderImg3 from '../assets/images/slider3.png';

const slidesData = [
  { id: 1, imageSrc: sliderImg1, tabTitle: "올빼미 서평" },
  { id: 2, imageSrc: sliderImg2, tabTitle: "책 일기" },
  { id: 3, imageSrc: sliderImg3, tabTitle: "서평 남기기" }
];

export default function HomeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // --- 기존 로직(useEffect, handlePrev 등)은 그대로 두셔도 됩니다 --- 
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); 
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1);
  };
  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleTabClick = (index) => setCurrentIndex(index);


  // --- ▼ 여기가 핵심 변경 부분입니다 ▼ ---
  return (
    <div className="slider-container">
      
      {/* 1. 이미지 표시 영역 (슬라이딩 뷰포트) */}
      <div className="slider-view"> 
        <div 
          className="slider-track"
          style={{
            // 현재 인덱스만큼 왼쪽으로 이동 (-0%, -100%, -200%)
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {slidesData.map((slide) => (
            <img 
              key={slide.id} 
              src={slide.imageSrc} 
              alt={slide.tabTitle} 
              className="slide-image"
            />
          ))}
        </div>
      </div>

      {/* 2. 하단 컨트롤러 (기존 코드 유지) */}
      <div className="slider-controls-wrapper">
        <div className="control-box">
          <span className="page-info">{currentIndex + 1} / {slidesData.length}</span>
          <button className="control-btn" onClick={handlePrev}>&lt;</button>
          <button className="control-btn" onClick={togglePlay}>{isPlaying ? '||' : '▶'}</button>
          <button className="control-btn" onClick={handleNext}>&gt;</button>
        </div>

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