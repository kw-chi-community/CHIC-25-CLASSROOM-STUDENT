interface SignupData {
  email: string;
  studentId: string;
  name: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
  id: string;
}

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        id: data.studentId,
        name: data.name,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    const responseData = await response.json();

    return responseData.data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};