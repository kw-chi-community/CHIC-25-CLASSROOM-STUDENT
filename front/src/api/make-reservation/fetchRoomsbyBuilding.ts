import { fetchRoomsbyBuildingDto } from "./dto/fetchRoomsbyBuildingDto";

export const fetchRoomsbyBuilding = async (building: string) => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션스토리지에서 토큰을 가져옴

    const response = await fetch("/api/reserve/check-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ building }),
    });

    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    const data: fetchRoomsbyBuildingDto[] = await response.json();

    // data에서 room만 추출하여 배열로 리턴
    const rooms = data.map(
      (item: { building: string; room: string }) => item.room
    );

    return rooms; // room 배열 리턴
  } catch (error) {
    console.error("Failed to fetch reservation notices:", error);
    throw error;
  }
};
