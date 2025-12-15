import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation(); // 현재 페이지의 주소(경로)를 가져옴

  useEffect(() => {
    // 경로(pathname)가 바뀔 때마다 스크롤을 맨 위(0, 0)로 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에 아무것도 그리지 않는 기능성 컴포넌트
}
