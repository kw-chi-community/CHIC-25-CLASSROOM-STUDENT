"use client";
import PageWrapper from "../../components/PageWrapper";
import NavigationButtons from "./components/NavigationButtons";

const Home = () => {
  return (
    <PageWrapper>
      <div className="space-y-10 w-full max-w-lg mx-auto mt-6 z-10">
        {/* 상단 네비 버튼 */}
        <NavigationButtons />

        {/* 다가오는 내 예약 목록 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">📅 다가오는 내 예약</h2>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
            {/* 예시 데이터 */}
            <p>3/28 (목) 14:00 ~ 16:00 - 103호</p>
            <p>3/29 (금) 10:00 ~ 12:00 - 205호</p>
          </div>
        </section>

        {/* 공지사항 미리보기 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">📢 공지사항</h2>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
            <p className="truncate">
              [공지] 시스템 점검 안내 (3/31 22시 ~ 24시)
            </p>
            <p className="truncate">[공지] 새빛관 예약 제한 안내</p>
          </div>
        </section>

        {/* 최근 게시글 요약 */}
        <section>
          <h2 className="text-lg font-semibold mb-2">📝 홍보 게시판</h2>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
            <p className="truncate">[자유] 715호 예약 방법 아시는 분?</p>
            <p className="truncate">[질문] 세미나실 예약 가능 시간</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Home;
