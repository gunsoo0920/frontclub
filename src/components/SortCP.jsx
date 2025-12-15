/**
 * SortButtons.jsx
 *
 * NOTE:
 *  - 도서 정렬 버튼 UI 컴포넌트
 *  - 부모로부터 sortType, setSortType 전달받음
 */

import React from "react";

const SortButtons = ({ sortType, setSortType }) => {
  return (
    <div className="sort-buttons">
      <button
        className={sortType === "DEFAULT" ? "active" : ""}
        onClick={() => setSortType("DEFAULT")}
      >
        기본순
      </button>

      <button
        className={sortType === "TITLE" ? "active" : ""}
        onClick={() => setSortType("TITLE")}
      >
        가나다순
      </button>

      <button
        className={sortType === "REVIEW" ? "active" : ""}
        onClick={() => setSortType("REVIEW")}
      >
        서평 많은 순
      </button>
    </div>
  );
};

export default SortButtons;
