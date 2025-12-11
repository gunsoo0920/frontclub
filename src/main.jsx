import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// [1] BrowserRouter 불러오기
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // [2] App 컴포넌트를 BrowserRouter로 감싸기
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
