import { useState, useEffect } from "react";
import { fetchReservationList } from "../../../api/mypage/fetchReservationList.ts"; // API 함수 임포트
import { fetchReservationListDto } from "../../../api/mypage/dto/fetchReservationListDto.ts";
import { Link } from "react-router-dom";

const UpcomingReservations = () => {
  const [reservations, setReservations] = useState<fetchReservationListDto[]>(
    []
  ); // 내 예약 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태, 문자열 또는 null

  useEffect(() => {
    const getNotices = async () => {
      try {
        const data =
          (await fetchReservationList()) as fetchReservationListDto[]; // 공지 데이터를 가져옴

        const currentDate = new Date(); // 현재 시간

        const upcomingReservations = data.filter((reservation) => {
          // 예약 날짜와 시간을 합쳐서 Date 객체로 변환
          const reserveDateTime = new Date(reservation.reserve_date);
          const [hours, minutes] = reservation.reserve_start_time
            .split(":")
            .map(Number); // 시간과 분을 분리하여 숫자로 변환
          reserveDateTime.setHours(hours, minutes, 0, 0); // 시간을 설정

          console.log("reserveDateTime", reserveDateTime); // 예약 시간 확인
          console.log("currentDate", currentDate); // 현재 시간 확인

          return reserveDateTime > currentDate; // 현재 시간 이후의 예약만 필터링
        });

        // 임박한 순서대로 정렬 (reserve_start_time 기준)
        const sortedReservations = upcomingReservations.sort((a, b) => {
          const aDateTime = new Date(a.reserve_date);
          const [aHours, aMinutes] = a.reserve_start_time
            .split(":")
            .map(Number);
          aDateTime.setHours(aHours, aMinutes, 0, 0);

          const bDateTime = new Date(b.reserve_date);
          const [bHours, bMinutes] = b.reserve_start_time
            .split(":")
            .map(Number);
          bDateTime.setHours(bHours, bMinutes, 0, 0);

          return aDateTime.getTime() - bDateTime.getTime(); // 시간 순으로 정렬
        });

        // 3개만 가져오기
        const top3Reservations = sortedReservations.slice(0, 3); // 상위 3개 예약만 가져오기

        setReservations(top3Reservations); // 상태에 3개 예약만 저장
      } catch (err) {
        console.error(err); // 오류 콘솔에 출력
        setError("예약 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    getNotices();
  }, []); // 컴포넌트가 마운트될 때 한번만 실행

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때
  }
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">📅 다가오는 내 예약</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-2 border border-1 border-gray">
        {error ? (
          <p>
            {error} {/* 에러 메시지와 아이콘 추가 */}
          </p>
        ) : reservations.length > 0 ? (
          reservations.map((reservation) => (
            <Link
              to={`/reservation/${reservation.id}`}
              key={reservation.id}
              className="block truncate border-b border-gray pb-2 pt-1 hover:text-purple transition-all duration-200"
            >
              {reservation.reserve_date.toISOString().slice(0, 10)}{" "}
              <span>
                {reservation.reserve_start_time} ~{" "}
                {reservation.reserve_end_time}
              </span>
              <h2 className="font-semibold">{reservation.reserve_reason}</h2>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">예약된 목록이 없습니다.</p> // 공지가 없을 때 회색 텍스트
        )}
      </div>
    </section>
  );
};

export default UpcomingReservations;
