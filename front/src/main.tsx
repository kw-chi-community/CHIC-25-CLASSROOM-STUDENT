import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 전체 화면을 회색으로 설정하고, 가운데 정렬 */}
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      {/* 최대 너비 700px, 화면 크기가 작아지면 w-full로 맞춤 */}
      <div className="w-full max-w-[600px] min-h-screen bg-[#F6F6F6] shadow-lg overflow-auto">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
