import signupDto from "./dto/signupDto";

interface SignupResponse {
  accessToken: string;
  id: string;
}

export const signup = async (data: signupDto): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        studentId: data.studentId,
        name: data.name,
        password: data.password,
        phoneNumber: data.phoneNumber,
        otp: data.otp,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("서버 응답 내용:", errText);
      throw new Error("회원가입 실패");
    }

    const responseData = await response.json();

    return responseData.data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};
