import { updateReservationDto } from "./dto/updateReservationDto";

export const updateReservation = async (data: updateReservationDto) => {
  const token = sessionStorage.getItem("accessToken");
  const studentId = sessionStorage.getItem("studentId"); // 세션스토리지에서 학생 ID를 가져옴

  const response = await fetch("/api/update-reservation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, studentId }),
  });

  if (!response.ok) {
    throw new Error("예약 내용 정보 수정에 실패했습니다.");
  }

  return response.json();
};
