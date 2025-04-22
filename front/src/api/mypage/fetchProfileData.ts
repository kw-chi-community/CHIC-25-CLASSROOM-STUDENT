import axios from "axios";
import { fetchProfileDataDto } from "./dto/fetchProfileDataDto";

// MyPage 데이터 가져오기 함수
export const fetchProfileData = async (
  studentId: string
): Promise<fetchProfileDataDto | null> => {
  try {
    // const response = await axios.post<fetchProfileDataDto>(
    //   `${import.meta.env.VITE_API_URL}/api/user-info`,
    //   { studentId }
    // );

    // return response.data;

    const demoData: fetchProfileDataDto = {
      name: "홍길동",
      email: "dkgus731@naver.com",
      phoneNumber: "010-3547-1458",
    };
    return demoData;
  } catch (error) {
    console.error("마이페이지 데이터 불러오기 실패:", error);
    return null;
  }
};
