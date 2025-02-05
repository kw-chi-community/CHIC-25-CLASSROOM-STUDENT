export const login = async (studentId: string) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();
    return data.token; // JWT 토큰 반환
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};
