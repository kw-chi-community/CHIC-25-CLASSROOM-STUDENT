export const login = async (studentId: string) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: studentId }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();

    // 토큰을 sessionStorage에 저장
    sessionStorage.setItem("accessToken", data.data.accessToken);

    return data.data;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};
