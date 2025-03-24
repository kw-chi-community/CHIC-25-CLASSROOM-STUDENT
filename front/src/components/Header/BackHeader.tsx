import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // 아이콘 라이브러리 사용 (lucide-react 추천)
import { ROUTES } from "../../constants/routes";

const BackHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1); // 브라우저 뒤로가기
  };

  const matched = Object.values(ROUTES).find(
    (route) => route.path === location.pathname
  );

  return (
    <header className="fixed top-0 left-0 right-0 mx-auto w-full max-w-[600px] backdrop-blur-lg p-4 flex items-center justify-between z-50">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        aria-label="뒤로가기"
        className="text-gray-700"
      >
        <ArrowLeft size={20} />
      </button>
      {/* 가운데 제목 */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg md:text-xl font-bold text-gray-900">
        {matched?.title ?? ""}
      </h1>
      <div className="w-5" />
    </header>
  );
};

export default BackHeader;
