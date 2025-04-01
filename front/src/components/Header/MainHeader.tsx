import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 토큰 및 사용자 정보 삭제
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("studentId");
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <header className="fixed top-0 left-0 right-0 mx-auto w-full max-w-[600px] bg-opacity-50 bg-white backdrop-blur-lg p-4 flex justify-between items-center z-50">
      <h1 className="text-lg md:text-xl font-bold text-gray-900">
        강의실 예약 시스템
      </h1>
      <button
        onClick={handleLogout}
        aria-label="로그아웃"
        className="text-gray-700 border border-1 border-gray px-3 py-1 rounded-lg text-darkgray hover:border-purple hover:text-purple font-semibold text-sm transition-all duration-300 ease-in-out"
      >
        로그아웃
      </button>
    </header>
  );
};

export default MainHeader;
