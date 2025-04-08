"use client";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import NavigationButtons from "./components/NavigationButtons";
import ReservationNotice from "./components/ReservationNotice";
import UpcomingReservations from "./components/UpcomingReservations";

const Home = () => {
  return (
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
  );
};

export default Home;
