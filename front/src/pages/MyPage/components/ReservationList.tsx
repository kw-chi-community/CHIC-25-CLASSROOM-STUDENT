import React, { useEffect, useState } from "react";
import { fetchReservationListDto } from "../../../api/mypage/dto/fetchReservationListDto";
import { fetchReservationList } from "../../../api/mypage/fetchReservationList";
import ReservationDetailPopup from "../../../components/Popup/ReservationDetailPopup";

interface ReservationListProps {
  studentId: string;
}

const ReservationList: React.FC<ReservationListProps> = ({ studentId }) => {
  const [reservations, setReservations] = useState<fetchReservationListDto[]>(
    []
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  console.log("studentId", studentId);

  useEffect(() => {
    if (studentId) {
      fetchReservationList(studentId)
        .then(setReservations)
        .catch((err) => console.error("예약 정보 불러오기 실패:", err));
    } else {
      setReservations([]);
    }
  }, [studentId]);

  const hasReservations = reservations.length > 0;

  const handleClose = () => setSelectedId(null);
  // 정렬 적용 부분 추가
  const sortedReservations = [...reservations].sort((a, b) => {
    const getStatusWeight = (r: typeof a) => {
      const endTime = new Date(`${r.reserve_date}T${r.reserve_end_time}`);
      if (r.reservation_confirmed === 0) return 3; // 반려
      if (endTime < new Date()) return 2; // 이용 완료
      return 1; // 예약 확정
    };

    const aWeight = getStatusWeight(a);
    const bWeight = getStatusWeight(b);

    if (aWeight !== bWeight) return aWeight - bWeight;

    return (
      new Date(`${a.reserve_date}T${a.reserve_start_time}`).getTime() -
      new Date(`${b.reserve_date}T${b.reserve_start_time}`).getTime()
    );
  });
  return (
    <div className="bg-white shadow-lg bg-opacity-40 rounded-xl p-6 w-full max-w-lg mt-6 relative z-10">
      <h2 className="text-lg font-bold text-gray-900">나의 강의실 예약 현황</h2>

      {hasReservations ? (
        sortedReservations.map((reservation, idx) => {
          const endDate = new Date(
            `${reservation.reserve_date}T${reservation.reserve_end_time}`
          );
          const isCompleted = endDate < new Date();

          let statusText = "";
          let statusClass = "";

          if (reservation.reservation_confirmed === 0) {
            statusText = "예약 반려";
            statusClass = "text-red font-semibold";
          } else if (isCompleted) {
            statusText = "이용 완료";
            statusClass = "text-darkgray font-semibold";
          } else {
            statusText = "예약 확정";
            statusClass = "text-purple font-semibold";
          }

          return (
            <div
              key={idx}
              className="mt-4 p-4 border border-darkgray rounded-lg cursor-pointer hover:bg-skyblue transition"
              onClick={() => setSelectedId(reservation.id)}
            >
              <p className="text-base font-semibold">
                {reservation.building} {reservation.room}
              </p>
              <p className="text-base text-gray-600">
                {reservation.reserve_date} ({reservation.reserve_start_time} ~{" "}
                {reservation.reserve_end_time})
              </p>
              <p className="text-base mt-1">
                <span className={statusClass}>{statusText}</span>
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-base text-gray-500 mt-4 text-center">
          예약 내역이 없습니다.
        </p>
      )}

      {selectedId && (
        <ReservationDetailPopup
          reservationId={selectedId}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ReservationList;
