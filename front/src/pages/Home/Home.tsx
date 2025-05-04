import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import NavigationButtons from "./components/NavigationButtons";
import ReservationNotice from "./components/ReservationNotice";
import UpcomingReservations from "./components/UpcomingReservations";
import { fetchNoticePopup } from "../../api/notice/fetchNoticePopup";
import NoticePopup from "../../components/Popup/NoticePopup";
import { fetchNoticePopupDto } from "../../api/notice/dto/fetchNoticePopupDto";

const Home = () => {
  const [popupList, setPopupList] = useState<fetchNoticePopupDto[]>([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const studentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    if (studentId) {
      fetchNoticePopup(studentId).then((res) => {
        if (Array.isArray(res)) {
          setPopupList(res);
        }
      });
    }
  }, []);

  return (
    <>
      {popupList.length > 0 && currentPopupIndex < popupList.length && (
        <NoticePopup
          studentId={studentId || ""}
          notice={popupList[currentPopupIndex]}
          onClose={() => setCurrentPopupIndex(currentPopupIndex + 1)}
        />
      )}
      <PageWrapper>
        <div className="space-y-10 w-full max-w-lg mx-auto z-10">
          {/* 상단 네비 버튼 */}
          <NavigationButtons />

          {/* 다가오는 내 예약 목록 */}
          <UpcomingReservations />

          {/* 강의실 이용 안내 게시글 미리보기 */}
          <ReservationNotice />
        </div>
      </PageWrapper>
    </>
  );
};

export default Home;
