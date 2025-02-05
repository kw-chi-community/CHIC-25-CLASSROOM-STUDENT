import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-opacity-80  bg-white backdrop-blur-lg shadow-md p-4 flex justify-between items-center z-50">
      <h1 className="text-lg md:text-xl font-bold text-gray-900">
        강의실 예약 시스템
      </h1>
      <Link
        to="/login"
        className="text-gray-700 hover:text-blue-500 font-semibold text-sm"
      >
        로그아웃
      </Link>
    </header>
  );
};

export default Header;
