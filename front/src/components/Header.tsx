import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken"); // 토큰 삭제
    sessionStorage.removeItem("studentId"); // 토큰 삭제
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-opacity-80 bg-white backdrop-blur-lg shadow-md p-4 flex justify-between items-center z-50">
      <h1 className="text-lg md:text-xl font-bold text-gray-900">
        강의실 예약 시스템
      </h1>
      <button
        onClick={handleLogout}
        className="text-gray-700 hover:text-blue-500 font-semibold text-sm"
      >
        로그아웃
      </button>
    </header>
  );
};

export default Header;
