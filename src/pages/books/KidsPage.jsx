import BookListPage from "./BookListPage";
import SortButtons from '../../components/SortCP';


/**
 * KIDS 전용 페이지
 * - BookListPage를 재사용하며
 * - showFilter: false (전체 페이지에서만 필터 사용)
 */
const KidsPage = () => {
  return (
    <BookListPage
      defaultCategory="KIDS"
      pageTitle="👶어린이를 위한 책"
      showFilter={false}
    />
  );
};

export default KidsPage;
