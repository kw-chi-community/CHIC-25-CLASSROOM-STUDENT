import React, { useState, useEffect } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

interface EmailVerificationProps {
  onVerify: (otpCode: string) => void;
  setEmail: (email: string) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  onVerify,
  setEmail,
}) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [serverCode, setServerCode] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [emailMsg, setEmailMsg] = useState<string>("");
  const [authMsg, setAuthMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  // "@kw.ac.kr" 도메인이 포함되었는지 검사
  const isEmailValid = emailInput.endsWith("@kw.ac.kr");

  // 이메일 입력 시 부모 컴포넌트의 email 상태를 업데이트
  useEffect(() => {
    setEmail(emailInput);
    setServerCode("");
    setVerificationCode("");
    setEmailMsg("");
    setAuthMsg("");
    setLoading(false);
    setIsVerified(false);
    setCountdown(0);
  }, [emailInput, setEmail]);

  const handleSubmit = async () => {
    if (!isEmailValid) return; // 도메인 검증
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/signup/email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        setServerCode(data.code);
        setCountdown(180);
        setEmailMsg("");
      } else {
        setEmailMsg("이메일 발송에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setEmailMsg("서버와의 연결에 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = () => {
    if (verificationCode === serverCode) {
      setIsVerified(true);
      setAuthMsg("");
      setCountdown(-1);
      onVerify(serverCode); //인증코드 전달
    } else {
      setAuthMsg("잘못된 인증번호입니다. 다시 시도하세요.");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div>
      {/* 이메일 입력 + 인증 요청 버튼 */}
      <div className="flex space-x-2">
        <div className="flex-grow-[2]">
          <Input
            type="email"
            placeholder="광운대학교 메일주소 (@kw.ac.kr)"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className="flex-grow">
          <Button
            onClick={handleSubmit}
            text={
              loading
                ? "전송 중..."
                : countdown > 0
                ? `남은 시간: ${Math.floor(countdown / 60)}:${(countdown % 60)
                    .toString()
                    .padStart(2, "0")}`
                : isVerified
                ? "인증 완료"
                : "인증 요청"
            }
            isActive={!loading && !isVerified && isEmailValid && countdown <= 0}
          />
        </div>
      </div>
      {emailMsg && <p className="text-red">{emailMsg}</p>}

      {/* 인증번호 입력 + 확인 버튼 */}
      {countdown > 0 && !isVerified && (
        <div className="flex space-x-2 mt-4">
          <div className="flex-grow-[2]">
            <Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div className="flex-grow">
            {" "}
            <Button
              onClick={handleVerification}
              text="확인"
              isActive={!!verificationCode}
            />
          </div>
        </div>
      )}
      {authMsg && <p className="text-red">{authMsg}</p>}
    </div>
  );
};

export default EmailVerification;
