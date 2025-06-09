import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { fetchReservationNotices } from "../../api/notice/fetchReservationNotices";
import { fetchReservationNoticesDto } from "../../api/notice/dto/fetchReservationNoticesDto";
import { Link } from "react-router-dom";

const NoticePage = () => {
  const [notices, setNotices] = useState<fetchReservationNoticesDto[]>([]); // 공지 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태, 문자열 또는 null
  useEffect(() => {
    const getNotices = async () => {
      try {
        const data =
          (await fetchReservationNotices()) as fetchReservationNoticesDto[]; // 공지 데이터를 가져옴

        setNotices(data); // 데이터를 상태에 저장
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

  const importantNotices = notices.filter((n) => !n.type);
  const generalNotices = notices.filter((n) => n.type);

  return (
    <PageWrapper>
      <div className="space-y-2 w-full rounded-lg">
        {error ? (
          <p>{error}</p>
        ) : notices.length > 0 ? (
          <div className="shadow-sm border border-gray rounded-lg">
            {importantNotices.map((notice) => (
              <Link
                to={`/notice/${notice.id}`}
                key={notice.id}
                className="p-4 block border-b border-gray hover:text-purple transition-all duration-200 bg-white"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="flex items-center gap-x-1 truncate">
                    <span className="text-purple font-semibold">[중요]</span>{" "}
                    <span className="truncate text-ellipsis">
                      {notice.title}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
            {generalNotices.map((notice) => (
              <Link
                to={`/notice/${notice.id}`}
                key={notice.id}
                className="p-4  block border-b border-gray  hover:text-purple transition-all duration-200 bg-white bg-opacity-50"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="flex items-center gap-x-1 truncate">
                    <span>[일반]</span>{" "}
                    <span className="truncate text-ellipsis">
                      {notice.title}
                    </span>
                  </span>
                  <span className="text-sm text-darkgray whitespace-nowrap">
                    {notice.created_at}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-darkgray">공지사항이 없습니다.</p>
        )}
      </div>
    </PageWrapper>
  );
};

export default NoticePage;
