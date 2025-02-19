"use client";

import { useEffect, useState } from "react";
import { AllScheduleDTO } from "./AllScheduleDTO";
import { fetchAllScheduleData } from "./api/fetchAllScheduleData";
import RoomTab from "./_components/RoomTab";
import WeeklyTimeTable from "./_components/WeeklyTimeTable";

const ReservationStatus = () => {
  const [scheduleData, setScheduleData] = useState<AllScheduleDTO[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllScheduleData();
        setScheduleData(data);

        // 첫 번째 강의실을 기본 선택
        if (data.length > 0) {
          setSelectedRoom(data[0].roomNumber);
        }
      } catch (err) {
        console.error("🚨 예약 데이터 불러오기 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-500 text-center mt-10">
        📌 데이터를 불러오는 중...
      </p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">❌ {error}</p>;
  }

  // 강의실 목록 가져오기
  const roomNumbers = Array.from(
    new Set(scheduleData.map((item) => item.roomNumber))
  );

  return (
    <div className="pt-24 pb-28 flex flex-col items-center min-h-screen px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">📅 예약 현황</h2>

      {/* 강의실 선택 탭 */}
      <RoomTab
        rooms={roomNumbers}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />

      {/* 주간 타임테이블 */}
      {selectedRoom && (
        <WeeklyTimeTable
          scheduleData={scheduleData}
          selectedRoom={selectedRoom}
        />
      )}
    </div>
  );
};

export default ReservationStatus;
