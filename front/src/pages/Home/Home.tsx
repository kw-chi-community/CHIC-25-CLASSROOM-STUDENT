"use client";

import { useEffect, useState } from "react";
import { fetchScheduleData } from "./api/fetchScheduleData";
import { ScheduleDTO } from "./ScheduleDTO";

const Home = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleDTO[]>([]);
  const [today, setToday] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchScheduleData();
      setScheduleData(data);
    };

    fetchData();
  }, []);

  // 오늘 날짜 설정 (YYYY년 MM월 DD일 형식)
  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}. ${
      now.getMonth() + 1
    }. ${now.getDate()}`;
    setToday(formattedDate);
  }, []);

  // 강의실별로 그룹화
  const groupedByRoom = scheduleData.reduce((acc, curr) => {
    acc[curr.roomNumber] = acc[curr.roomNumber] || [];
    acc[curr.roomNumber].push(curr);
    return acc;
  }, {} as Record<number, ScheduleDTO[]>);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-4">
      {/* 당일 예약 현황 */}
      <h2 className="text-xl sm:text-2xl font-bold">{today} 예약 현황</h2>

      {/* 카드 UI로 예약 현황 표시 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full max-w-4xl">
        {Object.entries(groupedByRoom).map(([room, reservations]) => (
          <div
            key={room}
            className="p-3 sm:p-4 border rounded-lg shadow-md bg-white w-full"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">{room}호</h3>
            {reservations.length > 0 ? (
              reservations.map((res, index) => (
                <div
                  key={index}
                  className="p-2 rounded-md text-black mb-2 border border-gray-300"
                >
                  <p className="text-sm sm:text-base font-semibold">
                    {res.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {res.startTime} ~ {res.endTime} ({res.type})
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm sm:text-base">예약 없음</p>
            )}
          </div>
        ))}
      </div>

      {/* 예약 개수 요약 */}
      <p className="mt-4 text-gray-600 text-sm sm:text-base">
        오늘 예약된 강의실: <strong>{scheduleData.length}건</strong>
      </p>
    </div>
  );
};

export default Home;
