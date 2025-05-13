import { fetchReservationSchedulesDto } from "./dto/fetchReservationSchedulesDto";

export const fetchReservationSchedules = async (
  building: string,
  room: string,
  date: string
) => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션스토리지에서 토큰을 가져옴

    const response = await fetch("/api/classroom-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ building, room, date }),
    });

    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    const data: fetchReservationSchedulesDto[] = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch reservation notices:", error);
    throw error;
  }
};
