export const deleteReservation = async (reservationId: string) => {
  try {
    const token = sessionStorage.getItem("accessToken");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/delete-reservation`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reservationId }),
      }
    );

    if (!response.ok) {
      throw new Error("예약 취소에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("예약 취소 오류:", error);
    throw error;
  }
};
