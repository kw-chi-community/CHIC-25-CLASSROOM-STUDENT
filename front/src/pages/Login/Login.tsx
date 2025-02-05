import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api/login";

const Login = () => {
  const [studentId, setStudentId] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (studentId.length !== 10 || isNaN(Number(studentId))) {
      alert("10자리 숫자 학번을 입력하세요.");
      return;
    }

    try {
      const token = await login(studentId);
      if (token) {
        localStorage.setItem("jwtToken", token);
        navigate("/home"); // 로그인 성공 시 홈으로 이동
      }
    } catch (error) {
      alert("로그인 실패");
    }
  };

  // 학번 입력 핸들러 (10자리 숫자만 허용)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setStudentId(value);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen px-6 overflow-hidden">
      {/* Blur 효과 원 (Ellipse 1 - 노란색) */}
      <div className="absolute w-52 h-52 bg-yellow opacity-45 blur-[120px] left-[10%] top-[5%]"></div>

      {/* Blur 효과 원 (Ellipse 2 - 보라색) */}
      <div className="absolute w-52 h-52 bg-purple opacity-50 blur-[120px] right-[10%] top-[15%]"></div>

      <div className="relative w-full max-w-lg text-left">
        {/* 제목 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          정보융합학부
          <br />
          강의실 예약 시스템
        </h1>
        <p className="text-gray-600 mt-3">
          강의실 예약 및 예약현황을 보고 싶다면 <br />
          학번으로 로그인하세요!
        </p>

        {/* 학번 입력 필드 */}
        <div className="mt-52">
          <input
            type="text"
            placeholder="학번을 입력하세요"
            value={studentId}
            onChange={handleChange}
            className="w-full p-4 border border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-purple focus:outline-none text-center text-lg transition-all"
            maxLength={10}
          />
        </div>

        {/* 로그인 버튼 (10자리 숫자 입력 시 활성화) */}
        <button
          onClick={handleLogin}
          className={`w-full mt-6 p-4 rounded-xl font-semibold transition duration-300 text-white text-lg tracking-wide shadow-md ${
            studentId.length === 10
              ? "bg-purple bg-opacity-70 hover:bg-purple shadow-lg transform hover:scale-105"
              : "bg-gray cursor-not-allowed"
          }`}
          disabled={studentId.length !== 10}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
