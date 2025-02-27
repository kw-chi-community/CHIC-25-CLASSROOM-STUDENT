import { useEffect, useState } from "react";
import { fetchMyPageData } from "./api/fetchMyPageData";
import { MyPageDto } from "./MyPageDto";

const MyPage: React.FC = () => {
  const [userData, setUserData] = useState<MyPageDto | null>(null);
  const studentId: string | null = sessionStorage.getItem("studentId");

  useEffect(() => {
    const loadData = async () => {
      if (!studentId) {
        console.error("학번이 존재하지 않습니다.");
        return;
      }
      const data = await fetchMyPageData(studentId);
      setUserData(data);
    };

    loadData();
  }, [studentId]);

  return (
    <div className="pt-24 pb-28 flex flex-col items-center justify-start min-h-screen px-4 py-4 relative">
      {/* Blur 효과 배경 */}
      <div className="absolute w-52 h-52 bg-yellow opacity-45 blur-[120px] left-[10%] top-[5%]"></div>
      <div className="absolute w-52 h-52 bg-purple opacity-50 blur-[120px] right-[10%] top-[15%]"></div>

      {/* 프로필 카드 */}
      <div className="bg-white shadow-lg bg-opacity-40 rounded-xl p-6 w-full max-w-lg text-center relative z-10">
        <h2 className="text-xl font-bold text-gray-900">내 프로필</h2>
        {userData ? (
          <>
            <p className="text-lg text-gray-700 mt-2">{userData.name}</p>
            <p className="text-sm text-gray-500">학번: {studentId}</p>
          </>
        ) : (
          <p className="text-sm text-gray-500">로딩 중...</p>
        )}
      </div>

      {/* 나의 강의실 예약 현황 */}
      <div className="bg-white shadow-lg bg-opacity-40 odd:rounded-xl p-6 w-full max-w-lg mt-6 relative z-10">
        <h2 className="text-xl font-bold text-gray-900">
          나의 강의실 예약 현황
        </h2>
        {userData?.reservation_status ? (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-semibold">
              강의실 {userData.reservation_status.roomNumber}
            </p>
            <p className="text-sm text-gray-600">
              날짜: {userData.reservation_status.date}
            </p>
            <p className="text-sm text-gray-600">
              시간: {userData.reservation_status.startTime} ~{" "}
              {userData.reservation_status.endTime}
            </p>
            <p className="text-sm text-gray-600">
              예약 제목: {userData.reservation_status.title}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">예약 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
