import { useState, useEffect } from "react";
import { fetchReservationList } from "../../../api/mypage/fetchReservationList.ts";
import { fetchReservationListDto } from "../../../api/mypage/dto/fetchReservationListDto.ts";
import { Link } from "react-router-dom";

const UpcomingReservations = () => {
  const [reservations, setReservations] = useState<fetchReservationListDto[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const studentId: string | null = sessionStorage.getItem("studentId");

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
  }, [studentId]);

  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">📅 다가오는 내 예약</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-2 border border-gray">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : reservations.length > 0 ? (
          reservations.map((res) => (
            <Link
              to={`/reservation/${res.id}`}
              key={res.id}
              className="block border-b border-gray pb-2 pt-1 hover:text-purple transition-all duration-200"
            >
              <span className="font-semibold">{res.reserve_date}</span> (
              {res.reserve_start_time} ~ {res.reserve_end_time})
            </Link>
          ))
        ) : (
          <p className="text-gray-500">예약된 목록이 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default UpcomingReservations;
