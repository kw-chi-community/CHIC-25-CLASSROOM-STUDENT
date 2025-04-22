import { updateReservationDto } from "./dto/updateReservationDto";

export const updateReservation = async (data: updateReservationDto) => {
  const token = sessionStorage.getItem("accessToken");
  const response = await fetch("/api/update-reservation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("예약 내용 정보 수정에 실패했습니다.");
  }

  return response.json();
};
