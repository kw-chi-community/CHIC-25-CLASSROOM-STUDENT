import { TodayScheduleDTO } from "../TodayScheduleDTO";
import axios from "axios";

// 스케줄 데이터를 불러오는 API 함수
export const fetchTodayScheduleData = async (): Promise<TodayScheduleDTO[]> => {
  const token = localStorage.getItem("accessToken");

  try {
    // 오늘 날짜를 YYYY-MM-DD 형식으로 변환
    const today = new Date().toISOString().split("T")[0];

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/status`,
      {
        params: { date: today },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("API 응답 데이터:", response.data);

    // 응답 데이터에서 `data` 속성만 반환
    if (!Array.isArray(response.data.data)) {
      throw new Error("API 응답 데이터 형식이 배열이 아닙니다.");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return [];
  }
};
