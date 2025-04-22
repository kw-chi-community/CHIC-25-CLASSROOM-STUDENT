export const deleteUserAccount = async (studentId: string) => {
  try {
    const token = sessionStorage.getItem("accessToken");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/delete-user`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentId }),
      }
    );

    if (!response.ok) {
      throw new Error("회원 탈퇴에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("회원 탈퇴 오류:", error);
    throw error;
  }
};
