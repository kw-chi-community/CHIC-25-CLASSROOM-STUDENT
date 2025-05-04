import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { fetchReservationNoticeDetail } from "../../api/notice/fetchReservationNoticeDetail";
import { fetchReservationNoticeDetailDto } from "../../api/notice/dto/fetchReservationNoticeDetailDto";

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState<fetchReservationNoticeDetailDto | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!noticeId) return;

    fetchReservationNoticeDetail(noticeId)
      .then(setNotice)
      .catch(() => setError("공지사항을 불러오는 데 실패했습니다."));
  }, [noticeId]);

  return (
    <PageWrapper>
      {error ? (
        <p className="text-red">{error}</p>
      ) : notice ? (
        <div className="bg-white bg-opacity-50 p-6 rounded-xl space-y-4 w-full">
          <h1 className="text-xl font-bold ">
            {notice.type === false ? "[중요]" : "[일반]"} {notice.title}
          </h1>
          <p className="text-sm text-black">
            {new Date(notice.created_at).toLocaleDateString()}
          </p>
          <hr className="border-t border-darkgray" />
          <div className="text-black whitespace-pre-wrap leading-relaxed">
            {notice.contents}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">로딩 중...</p>
      )}
    </PageWrapper>
  );
};

export default NoticeDetail;
