export const fetchReservationList = async () => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션스토리지에서 토큰을 가져옴
    const studentId = sessionStorage.getItem("studentId"); // 세션스토리지에서 토큰을 가져옴

    const response = await fetch("/api/reservation-list", {
      method: "POST", // POST 요청 사용
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
        Authorization: `Bearer ${token}`, // Bearer 토큰 헤더에 포함
      },
      body: JSON.stringify({ studentId }), // studentId를 요청 본문에 포함
    });

    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    const data = await response.json(); // JSON 형태로 응답 데이터 파싱
    return data;
  } catch (error) {
    console.error("Failed to fetch reservation notices:", error);
    throw error; // 오류 발생 시 오류를 던짐
  }
};
