import axios from "axios";
import { MyPageDto } from "../MyPageDto";

// MyPage 데이터 가져오기 함수
export const fetchMyPageData = async (
  studentId: string
): Promise<MyPageDto | null> => {
  try {
    // const response = await axios.get<MyPageDto>(
    //   `${import.meta.env.VITE_API_URL}/api/mypage`,
    //   { params: { studentId } }
    // );

    // return response.data;

    const demoData: MyPageDto = {
      name: "홍길동",
      reservation_status: {
        roomNumber: 103,
        date: "2025-03-15",
        startTime: "09:00",
        endTime: "10:30",
        title: "팀 프로젝트 회의",
      },
    };
    return demoData;
  } catch (error) {
    console.error("마이페이지 데이터 불러오기 실패:", error);
    return null;
  }
};
