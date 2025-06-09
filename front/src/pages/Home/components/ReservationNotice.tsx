import { useState, useEffect } from "react";
import { fetchReservationNotices } from "../../../api/notice/fetchReservationNotices.ts"; // API 함수 임포트
import { fetchReservationNoticesDto } from "../../../api/notice/dto/fetchReservationNoticesDto.ts";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.ts";

const ReservationNotice = () => {
  const [notices, setNotices] = useState<fetchReservationNoticesDto[]>([]); // 공지 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태, 문자열 또는 null
  useEffect(() => {
    const getNotices = async () => {
      try {
        const data =
          (await fetchReservationNotices()) as fetchReservationNoticesDto[]; // 공지 데이터를 가져옴

        // type이 false(기본 공지)를 우선적으로 가져옴
        const defaultNotices = data.filter((notice) => notice.type === false);
        const popupNotices = data.filter((notice) => notice.type === true);

        // 기본 공지는 항상 가져오고, 최대 8개까지 가져와야 하므로
        let combinedNotices = [...defaultNotices];

        // 팝업 공지 중에서 최신 순으로 최대 8개를 채움
        if (combinedNotices.length < 8) {
          const remainingCount = 8 - combinedNotices.length;
          const latestPopupNotices = popupNotices
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .slice(0, remainingCount);

          combinedNotices = [...combinedNotices, ...latestPopupNotices];
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">예약 관련 공지</h2>
        <Link to={ROUTES.NOTICE.path} className="text-purple hover:underline">
          + 더보기
        </Link>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-2 border border-1 border-gray">
        {error ? (
          <p>
            {error} {/* 에러 메시지와 아이콘 추가 */}
          </p>
        ) : notices.length > 0 ? (
          notices.map((notice, index) => (
            <Link
              to={`/notice/${notice.id}`}
              key={notice.id}
              className={`block pb-2 pt-1 hover:text-purple transition-all duration-200 ${
                index !== notices.length - 1 ? "border-b border-gray" : ""
              }`}
            >
              <div className="flex justify-between items-center gap-2">
                <span className="flex items-center gap-x-1 truncate">
                  {notice.type === false ? (
                    <span className="text-purple font-semibold">[중요]</span>
                  ) : (
                    <span>[일반]</span>
                  )}
                  <span className="truncate">{notice.title}</span>
                </span>
                {notice.type === true && (
                  <span className="text-sm text-darkgray whitespace-nowrap">
                    {notice.created_at}
                  </span>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-darkgray">공지사항이 없습니다.</p> // 공지가 없을 때 회색 텍스트
        )}
      </div>
    </section>
  );
};

export default ReservationNotice;
