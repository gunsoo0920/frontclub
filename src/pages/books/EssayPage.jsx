// /books/essay 전용 페이지
// BookListPage로부터 UI를 재사용하고
// 필터는 숨긴 상태 (메인에서만 노출)
import BookListPage from "../BookListPage";

/**
 * 에세이 전용 리스트 페이지
 * - defaultCategory: ESSAY
 * - pageTitle: 에세이 브랜딩 문구
 * - showFilter: false (전체 페이지에서만 필터 사용)
 */
const EssayPage = () => {
  return (
    <BookListPage
      defaultCategory="ESSAY"
      pageTitle="✍️지친 마음을 위로하는 에세이"
      showFilter={false}
    />
  );
};

export default EssayPage;
