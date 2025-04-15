import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/login/login";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
import CenteredPageWrapper from "../../components/PageWrapper/CenteredPageWrapper";

const Login = () => {
  const { setUser } = useAuth();
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isNaN(Number(studentId)) || studentId.length !== 10) {
      alert("학번 10자리를 정확히 입력해주세요.");
      return;
    }

    try {
      const userData = await login(studentId, password); // ✅ 수정된 부분
      if (userData) {
        setUser(userData);
        navigate("/"); // 로그인 성공 시 홈으로 이동
      }
    } catch {
      alert("로그인 실패");
    }
  };

  return (
    <CenteredPageWrapper>
      <div className="w-full max-w-lg z-10">
        {/* 제목 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          광운대학교
          <br />
          강의실 예약 시스템
        </h1>
        <p className="text-gray-600 mt-3">
          강의실을 예약하거나 예약 현황을 확인하려면 <br />
          학번으로 로그인하세요!
        </p>
        {/* 학번 입력 필드 */}
        <div className="mt-52 mb-8 flex flex-col gap-2">
          <Input
            type="text"
            placeholder="학번을 입력하세요"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            maxLength={10}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* 로그인 버튼 (10자리 숫자 입력 시 활성화) */}
        <Button
          onClick={handleLogin}
          text="로그인"
          isActive={studentId.length === 10 && !!password}
        />
        <p className="mt-4 text-center text-darkgray">
          계정이 없으신가요?{" "}
          <Link
            to={"/signup"}
            className="text-lightpurple hover:text-blue-800 font-semibold transition duration-200"
          >
            회원가입
          </Link>
        </p>
      </div>
    </CenteredPageWrapper>
  );
};

export default Login;
