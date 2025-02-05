import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white bg-opacity-80 shadow-md backdrop-blur-lg p-4 z-50">
      <ul className="flex justify-around text-gray-600 max-w-[600px] mx-auto">
        <li>
          <Link
            to="/"
            className="flex flex-col items-center text-xs md:text-sm font-semibold hover:text-blue-500"
          >
            <span className="text-2xl">🏠</span>홈
          </Link>
        </li>
        <li>
          <Link
            to="/make-reservation"
            className="flex flex-col items-center text-xs md:text-sm font-semibold hover:text-blue-500"
          >
            <span className="text-2xl">📅</span>
            예약하기
          </Link>
        </li>
        <li>
          <Link
            to="/reservation-status"
            className="flex flex-col items-center text-xs md:text-sm font-semibold hover:text-blue-500"
          >
            <span className="text-2xl">📊</span>
            예약현황
          </Link>
        </li>
        <li>
          <Link
            to="/notice"
            className="flex flex-col items-center text-xs md:text-sm font-semibold hover:text-blue-500"
          >
            <span className="text-2xl">📝</span>
            게시판
          </Link>
        </li>
        <li>
          <Link
            to="/mypage"
            className="flex flex-col items-center text-xs md:text-sm font-semibold hover:text-blue-500"
          >
            <span className="text-2xl">👤</span>
            마이페이지
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
