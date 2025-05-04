import { fetchReservationNoticeDetailDto } from "./dto/fetchReservationNoticeDetailDto";

export const fetchReservationNoticeDetail = async (noticeId: string) => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션스토리지에서 토큰을 가져옴

    const response = await fetch("/api/reservation-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ noticeId }),
    });

    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    const data: fetchReservationNoticeDetailDto = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch reservation notice detail", error);
    throw error;
  }
};
