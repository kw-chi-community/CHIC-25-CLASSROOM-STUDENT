import { useEffect, useState } from "react";

const NoticePage = () => {
  return (
    <div className="pt-24 pb-28 flex flex-col items-center justify-start min-h-screen px-4 py-4">
      {/* 당일 예약 현황 */}
      {/* Blur 효과 원 (Ellipse 1 - 노란색) */}
      <div className="absolute w-52 h-52 bg-yellow opacity-45 blur-[120px] left-[10%] top-[5%]"></div>

      {/* Blur 효과 원 (Ellipse 2 - 보라색) */}
      <div className="absolute w-52 h-52 bg-purple opacity-50 blur-[120px] right-[10%] top-[15%]"></div>

      <div className="relative w-full max-w-lg text-left"></div>
    </div>
  );
};

export default NoticePage;
