import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api/login";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { setUser } = useAuth();
  const [studentId, setStudentId] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (studentId.length !== 10 || isNaN(Number(studentId))) {
      alert("10자리 숫자 학번을 입력하세요.");
      return;
    }

    try {
      const userData = await login(studentId);
      if (userData) {
        setUser(userData);
        navigate("/home"); // 로그인 성공 시 홈으로 이동
      }
    } catch {
      alert("로그인 실패");
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
          <Input
            type="text"
            placeholder="학번을 입력하세요"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            maxLength={10}
          />
        </div>

        {/* 로그인 버튼 (10자리 숫자 입력 시 활성화) */}
        <Button
          onClick={handleLogin}
          text="Sign In"
          isActive={studentId.length === 10}
        />
      </div>
    </div>
  );
};

export default Login;
