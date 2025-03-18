import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./api/signup";
import Button from "../../components/Button";
import Input from "../../components/Input";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    try {
      await signup({ email, studentId, name, password });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패: " + (error as Error).message);
    }
  };

  const handleEmailValidation = ()=>{}

  return (
    <div className="relative flex items-center justify-center h-screen px-6 overflow-hidden">
      <div className="absolute w-52 h-52 bg-yellow opacity-45 blur-[120px] left-[10%] top-[5%]"></div>
      <div className="absolute w-52 h-52 bg-purple opacity-50 blur-[120px] right-[10%] top-[15%]"></div>

      <div className="relative w-full max-w-lg text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">회원가입</h1>

        <div className="mt-10 space-y-4">
          <Input type="text" placeholder="광운대학교 메일주소를 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={handleEmailValidation} text="인증번호" isActive={!!email} />
          <Input type="text" placeholder="학번을 입력하세요" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <Input type="text" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" placeholder="비밀번호 다시 입력해주세요" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <Button onClick={handleSignUp} text="회원가입" isActive={!!email && !!studentId && !!name && !!password && !!confirmPassword} />
      </div>
    </div>
  );
};

export default SignUp;