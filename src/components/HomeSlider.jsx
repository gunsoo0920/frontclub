import React, { useState, useEffect, useRef } from 'react';
// import '../css/Home.css'; // CSS 파일이 index.js나 App.js에 포함되어 있다면 생략 가능

// 슬라이더에 들어갈 데이터 (이미지 3개)
const slidesData = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/1200x400/ffcccc/333333?text=첫번째+슬라이드+-+소장도서관+조회",
    tabTitle: "slider1",
    bgColor: "#fff5e6" 
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/1200x400/ccffcc/333333?text=두번째+슬라이드+-+그림책+교육자료",
    tabTitle: "slider2",
    bgColor: "#e6ffe6"
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/1200x400/ccccff/333333?text=세번째+슬라이드+-+그림책+서평+OST",
    tabTitle: "slider3",
    bgColor: "#e6e6ff"
  }
];

export default function HomeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null); 

  // 다음 슬라이드로 이동
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  // 이전 슬라이드로 이동
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
  };

  // 특정 슬라이드로 이동 (탭 클릭 시)
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // 재생/정지 토글
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 자동 재생 로직
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(goToNext, 3000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]); 

  return (
    <section className="home-slider-section">
      {/* (수정) slider-container -> home-main-slider-container (책 목록과 구분) */}
      <div className="home-main-slider-container">
        
        {/* (수정) slider-wrapper -> home-slider-wrapper */}
        <div 
          className="home-slider-wrapper" 
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${slidesData.length * 100}%` 
          }}
        >
          {slidesData.map((slide, index) => (
            <div 
              key={slide.id} 
              // (수정) slide -> home-slide
              className="home-slide" 
              style={{ 
                width: `${100 / slidesData.length}%`, 
                backgroundColor: slide.bgColor 
              }}
            >
              {/* (수정) slide-image -> home-slide-image */}
              <div className="home-slide-image" style={{ backgroundImage: `url(${slide.imageUrl})` }}>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 컨트롤바 & 탭 메뉴 영역 */}
        <div className="home-slider-controls-wrapper">
          <div className="home-slider-controls">
            
            {/* 왼쪽 네비게이션 바 */}
            <div className="home-nav-bar">
              <span className="home-page-info">{currentIndex + 1} / {slidesData.length}</span>
              
              <button onClick={goToPrev} className="home-nav-arrow left">&lt;</button>
              
              <button onClick={togglePlay} className="home-play-pause-btn">
                {isPlaying ? '❚❚' : '▶'} 
              </button>
              
              <button onClick={goToNext} className="home-nav-arrow right">&gt;</button>
            </div>

            {/* 오른쪽 탭 메뉴들 */}
            <div className="home-slider-tabs">
              {slidesData.map((slide, index) => (
                <button 
                  key={slide.id} 
                  className={`home-tab-btn ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  {slide.tabTitle}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}