import { fetchReservationNoticesDto } from "./dto/fetchReservationNoticesDto";

export const fetchReservationNotices = async () => {
  try {
    const response = await fetch("/api/notice-list");

    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    const data: fetchReservationNoticesDto[] = await response.json(); // JSON 형태로 응답 데이터 파싱
    return data;
  } catch (error) {
    console.error("Failed to fetch reservation notices:", error);
    throw error; // 오류 발생 시 오류를 던짐
  }
};
