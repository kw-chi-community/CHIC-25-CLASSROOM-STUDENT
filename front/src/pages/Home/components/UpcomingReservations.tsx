import { useState, useEffect } from "react";
import { fetchReservationList } from "../../../api/mypage/fetchReservationList.ts";
import { fetchReservationListDto } from "../../../api/mypage/dto/fetchReservationListDto.ts";
import ReservationDetailPopup from "../../../components/Popup/ReservationDetailPopup.tsx";

const UpcomingReservations = () => {
  const [reservations, setReservations] = useState<fetchReservationListDto[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const studentId: string | null = sessionStorage.getItem("studentId");

  const handleClose = () => setSelectedId(null);

  useEffect(() => {
    const getReservations = async () => {
      try {
        if (!studentId) return;

        const data = await fetchReservationList(studentId);

        const now = new Date();

        const upcoming = data
          .filter((res) => {
            const dt = new Date(
              `${res.reserve_date}T${res.reserve_start_time}`
            );
            return dt > now;
          })
          .sort((a, b) => {
            const aTime = new Date(`${a.reserve_date}T${a.reserve_start_time}`);
            const bTime = new Date(`${b.reserve_date}T${b.reserve_start_time}`);
            return aTime.getTime() - bTime.getTime();
          })
          .slice(0, 3);

        setReservations(upcoming);
      } catch (err) {
        console.error(err);
        setError("예약 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, [studentId, selectedId]);

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">📅 다가오는 내 예약</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : reservations.length > 0 ? (
          <div className="divide-y divide-gray">
            {reservations.map((reservation) => (
              <div
                onClick={() => setSelectedId(reservation.id)}
                key={reservation.id}
                className="group px-1 py-2 cursor-pointer hover:text-purple"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-base font-bold text-black group-hover:text-purple">
                    {reservation.purpose}
                  </p>
                  <span className="text-sm text-gray-500">
                    {reservation.reserve_date}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  시간: {reservation.reserve_start_time} ~{" "}
                  {reservation.reserve_end_time}
                </p>
                <p className="text-sm text-gray-700">
                  장소: {reservation.building} {reservation.room}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">예약된 목록이 없습니다.</p>
        )}
      </div>
      {selectedId && (
        <ReservationDetailPopup
          reservationId={selectedId}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default UpcomingReservations;
