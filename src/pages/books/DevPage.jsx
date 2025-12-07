// /books/dev 전용 개별 페이지
// BookListPage에 props 전달해서 UI만 다르게 사용
import BookListPage from "./BookListPage";

/**
 * 개발/IT 전용 리스트 페이지
 * - defaultCategory: DEV
 * - showFilter: false (전체 페이지에서만 필터 사용)
 */
const DevPage = () => {
  return (
    <BookListPage
      defaultCategory="DEV"
      pageTitle="💻리누스 토르발스가 인정한 개발자 필독서"
      showFilter={false}
    />
  );
};

export default DevPage;
