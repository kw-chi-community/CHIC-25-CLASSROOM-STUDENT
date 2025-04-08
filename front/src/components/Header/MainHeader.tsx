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
    <header className="h-[52px] fixed top-0 left-0 right-0 mx-auto w-full max-w-[600px] bg-opacity-50 bg-white backdrop-blur-lg p-4 flex justify-between items-center z-50">
      <div className="flex justify-between items-center gap-2">
        <img
          src="/logo.svg"
          alt="로고"
          className="h-8 w-auto" // 크기 조정 (필요에 따라 수정)
        />
        <h1 className="text-lg md:text-xl font-medium ">강의실 예약 시스템</h1>
      </div>

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
