import { useState, useEffect } from "react";
import { fetchReservationNotices } from "../../../api/notice/fetchReservationNotices.ts"; // API 함수 임포트
import { fetchReservationNoticesDto } from "../../../api/notice/dto/fetchReservationNoticesDto.ts";
import { Link } from "react-router-dom";
const ReservationNotice = () => {
  const [notices, setNotices] = useState<fetchReservationNoticesDto[]>([]); // 공지 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태, 문자열 또는 null
  useEffect(() => {
    const getNotices = async () => {
      try {
        const data =
          (await fetchReservationNotices()) as fetchReservationNoticesDto[]; // 공지 데이터를 가져옴

        // type이 0인 공지를 우선적으로 가져옴
        const type0Notices = data.filter((notice) => notice.type === 0);
        const type1Notices = data.filter((notice) => notice.type === 1);

        // type이 0인 공지는 항상 가져오고, 최대 8개까지 가져와야 하므로
        let combinedNotices = [...type0Notices];

        // type이 1인 공지 중에서 최신 순으로 최대 8개를 채움
        if (combinedNotices.length < 8) {
          const remainingCount = 8 - combinedNotices.length;
          const latestType1Notices = type1Notices
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .slice(0, remainingCount);

          combinedNotices = [...combinedNotices, ...latestType1Notices];
        }

        setNotices(combinedNotices); // 데이터를 상태에 저장
      } catch (err) {
        console.error(err); // 오류 콘솔에 출력
        setError("공지 정보를 불러오는 데 실패했습니다.");
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
      <h2 className="text-lg font-semibold mb-2">📢 예약 관련 공지</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-2 border border-1 border-gray">
        {error ? (
          <p>
            {error} {/* 에러 메시지와 아이콘 추가 */}
          </p>
        ) : notices.length > 0 ? (
          notices.map((notice) => (
            <Link
              to={`/notice/${notice.id}`}
              key={notice.id}
              className="block truncate border-b border-gray pb-2 pt-1 hover:text-purple transition-all duration-200"
            >
              {notice.type === 0 && "📌"} {notice.title}
            </Link>
          ))
        ) : (
          <p className="text-gray-500">공지사항이 없습니다.</p> // 공지가 없을 때 회색 텍스트
        )}
      </div>
    </section>
  );
};

export default ReservationNotice;
