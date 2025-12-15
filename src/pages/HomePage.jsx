import HomeCategory from "../components/HomeCategory";
import HomeSlider from "../components/HomeSlider";
import HomeSearch from "../components/HomeSearch";
import "../css/Home.css";
import { useState, useEffect, useRef } from 'react';

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

// 애니메이션 래퍼 컴포넌트
function FadeInSection({ children }) {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={domRef} className={`fade-wrap ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="home-container">
      {/* 슬라이더는 즉시 표시 */}
      <HomeSlider />

      {/* 검색창부터 애니메이션 적용 */}
      <FadeInSection>
        <HomeSearch />
      </FadeInSection>

      <FadeInSection>
        <HomeCategory title={bookCategory["ALL"]} category={"ALL"} bgColor="#ffffff" />
      </FadeInSection>

      <FadeInSection>
        <HomeCategory title={bookCategory["KIDS"]} category={"KIDS"} bgColor="#f9f9f9" />
      </FadeInSection>

      <FadeInSection>
        <HomeCategory title={bookCategory["ESSAY"]} category={"ESSAY"} bgColor="#ffffff" />
      </FadeInSection>

      <FadeInSection>
        <HomeCategory title={bookCategory["HOBBY"]} category={"HOBBY"} bgColor="#f9f9f9" />
      </FadeInSection>

      <FadeInSection>
        <HomeCategory title={bookCategory["DEV"]} category={"DEV"} bgColor="#ffffff" />
      </FadeInSection>
    </div>
  );
}