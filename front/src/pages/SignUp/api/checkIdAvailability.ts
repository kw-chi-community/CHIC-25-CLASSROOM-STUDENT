export const checkIdAvailability = async (studentId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup/check-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    });

    const responseData = await response.json();

    // 백엔드 응답이 200 or 409 모두 포함한 경우 처리
    if (response.ok || response.status === 409) {
      return responseData.data?.isAvailable ?? false;
    }

    // 이 외의 에러는 진짜 에러로 처리
    throw new Error("학번 중복검사 실패");
  } catch (error) {
    console.error("학번 중복검사 에러:", error);
    throw error;
  }
};