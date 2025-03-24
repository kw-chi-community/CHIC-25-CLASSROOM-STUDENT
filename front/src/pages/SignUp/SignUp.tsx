import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./api/signup";
import { checkIdAvailability } from "./api/checkIdAvailability";
import Button from "../../components/Button";
import Input from "../../components/Input";
import EmailVerification from "./components/EmailVerification";
import CenteredPageWrapper from "../../components/CenteredPageWrapper";

const SignUp = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [email, setEmail] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const [isIdValid, setIsIdValid] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const [isIdCheckDisabled, setIsIdCheckDisabled] = useState<boolean>(false);

  const [userIdError, setUserIdError] = useState<string>("");

  // 학번이 10자리인지 검사
  const isStudentIdValid = studentId.length === 10;

  // 학번 중복 확인
  const handleCheckStudentId = async () => {
    try {
      const isValid = await checkIdAvailability(studentId);
      setIsIdValid(isValid);
      if (isValid) {
        setUserIdError("");
        setIsIdCheckDisabled(true);
      } else {
        setUserIdError("이미 존재하는 학번입니다.");
      }
    } catch (error) {
      console.error("학번 중복 확인 오류:", error);
    }
  };

  // 비밀번호 일치 여부 확인
  const handlePasswordBlur = () => {
    setIsPasswordMatch(password1 === password2 && password1 !== "");
  };

  // 학번 입력 시 초기화
  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
    setIsIdCheckDisabled(false);
    setUserIdError("");
  };

  // 회원가입 요청
  const handleSignUp = async () => {
    if (!isFormComplete()) return;

    try {
      await signup({ email, studentId, name, password: password1 });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패: " + (error as Error).message);
    }
  };

  // 폼 입력이 모두 완료되었는지 확인
  const isFormComplete = () => {
    return (
      isEmailVerified &&
      isIdValid &&
      studentId !== "" &&
      password1 !== "" &&
      password2 !== "" &&
      password1 === password2 &&
      email !== "" &&
      name !== ""
    );
  };

  return (
    <CenteredPageWrapper>
      <div className="relative w-full max-w-lg text-left">
        <div className="mt-10 space-y-6">
          {/* 이메일 인증 */}
          <EmailVerification
            onVerify={() => setIsEmailVerified(true)}
            setEmail={setEmail}
          />

          {/* 학번 입력 + 중복 확인 */}
          <div className="flex space-x-2">
            <div className="flex-grow-[2]">
              <Input
                type="text"
                placeholder="학번을 입력하세요"
                value={studentId}
                onChange={handleStudentIdChange}
              />
            </div>
            <div className="flex-grow">
              <Button
                onClick={handleCheckStudentId}
                text={isIdCheckDisabled ? "사용 가능" : "중복 확인"}
                isActive={isStudentIdValid && !isIdCheckDisabled}
              />
            </div>
          </div>
          {userIdError && (
            <p className="text-red-500 text-sm mt-2 text-left">{userIdError}</p>
          )}

          {/* 이름 입력 */}
          <Input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* 비밀번호 입력 */}
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          <Input
            type="password"
            placeholder="비밀번호 다시 입력해주세요"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          {!isPasswordMatch && (
            <p className="text-red-500 text-sm mt-2 text-left">
              비밀번호가 일치하지 않습니다.
            </p>
          )}

          {/* 회원가입 버튼 */}
          <Button
            onClick={handleSignUp}
            text="회원가입"
            isActive={isFormComplete()}
          />
        </div>
      </div>
    </CenteredPageWrapper>
  );
};

export default SignUp;
