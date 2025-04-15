export const login = async (studentId: string, password: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId, // ✅ 명확하게 이름 일치
        password,  // ✅ 비밀번호 추가
      }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();

    // 토큰을 sessionStorage에 저장
    sessionStorage.setItem("accessToken", data.data.accessToken);
    sessionStorage.setItem("studentId", data.data.studentId);

    return data.data;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};