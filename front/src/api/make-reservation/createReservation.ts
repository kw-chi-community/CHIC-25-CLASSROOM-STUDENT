import { createReservationDto } from "./dto/createReservationDto";

export const createReservation = async (data: createReservationDto) => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션스토리지에서 토큰을 가져옴
    const studentId = sessionStorage.getItem("studentId"); // 세션스토리지에서 학생 ID를 가져옴

    const reservationData = {
      studentId, // 세션에서 가져온 studentId
      date: data.date,
      building: data.building,
      room: data.room,
      startTime: data.startTime,
      endTime: data.endTime,
      purpose: data.purpose,
      professor: data.professor,
      participantCount: data.participantCount,
    };

    const response = await fetch("/api/make-reservation", {
      method: "POST", // POST 요청 사용
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
        Authorization: `Bearer ${token}`, // Bearer 토큰 헤더에 포함
      },
      body: JSON.stringify(reservationData), // 예약 데이터를 요청 본문에 포함
    });

    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    const responseData = await response.json(); // JSON 형태로 응답 데이터 파싱
    return responseData.reservationId; // 예약 ID 반환
  } catch (error) {
    console.error("Failed to fetch reservation notices:", error);
    throw error; // 오류 발생 시 오류를 던짐
  }
};
