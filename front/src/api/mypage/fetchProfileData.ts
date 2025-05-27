import { fetchProfileDataDto } from "./dto/fetchProfileDataDto";

// MyPage 데이터 가져오기 함수
export const fetchProfileData = async (
  studentId: string
): Promise<fetchProfileDataDto | null> => {
  const token = sessionStorage.getItem("accessToken"); // 세션스토리지에서 토큰을 가져옴

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user-info`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentId }),
      }
    );

    if (!response.ok) {
      throw new Error("서버 응답 실패");
    }

    const data: fetchProfileDataDto = await response.json();
    return data;
  } catch (error) {
    console.error("마이페이지 데이터 불러오기 실패:", error);

    const demoData: fetchProfileDataDto = {
      name: "데모데이터",
      email: "dkgus731@naver.com",
      phoneNumber: "010-3547-1458",
    };
    return demoData;
  }
};
