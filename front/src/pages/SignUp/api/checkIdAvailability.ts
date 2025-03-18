
export const checkIdAvailability = async (studentId:string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup/check-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId
      }),
    });

    if (!response.ok) {
      throw new Error("학번 중복검사 실패");
    }

    const responseData = await response.json();

    return responseData.data.isAvailable ?? false;
  } catch (error) {
    console.error("학번 중복검사 에러:", error);
    throw error;
  }
};