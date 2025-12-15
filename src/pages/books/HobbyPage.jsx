// /books/hobby 전용 페이지
// BookListPage의 UI를 그대로 재사용하고,
// 메인에서만 필터를 사용하기 때문에 숨김 처리

import BookListPage from "./BookListPage";
import SortButtons from '../../components/SortCP';


/**
 * 취미 전용 리스트 페이지
 * - defaultCategory: HOBBY
 * - pageTitle: 취미용 브랜딩 문구
 * - sshowFilter: false (전체 페이지에서만 필터 사용)
 */
const HobbyPage = () => {
  return (
    <BookListPage
      defaultCategory="HOBBY"
      pageTitle="🎨쉬는 날 펼치기 좋은 책"
      showFilter={false}
    />
  );
};

export default HobbyPage;
