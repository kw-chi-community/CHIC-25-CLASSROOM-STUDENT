"use client";

import { useEffect, useState } from "react";
import { fetchTodayScheduleData } from "./api/fetchTodayScheduleData";
import { TodayScheduleDTO } from "./TodayScheduleDTO";
import PageWrapper from "../../components/PageWrapper";

const Home = () => {
  const [todayScheduleData, setTodayScheduleData] = useState<
    TodayScheduleDTO[]
  >([]);
  const [today, setToday] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodayScheduleData();

      // 시작 시간(startTime) 기준으로 정렬
      data.sort((a, b) => {
        return a.startTime.localeCompare(b.startTime); // 같은 날짜 내에서 startTime 오름차순 정렬
      });

      setTodayScheduleData(data);
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
  const groupedByRoom = todayScheduleData.reduce((acc, curr) => {
    acc[curr.roomNumber] = acc[curr.roomNumber] || [];
    acc[curr.roomNumber].push(curr);
    return acc;
  }, {} as Record<number, TodayScheduleDTO[]>);

  return (
    <PageWrapper>
      <h2 className="text-xl sm:text-2xl font-bold">{today} 예약 현황</h2>

      {/* 카드 UI로 예약 현황 표시 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full max-w-4xl">
        {Object.entries(groupedByRoom).map(([room, reservations]) => (
          <div
            key={room}
            className="z-50 bg-white bg-opacity-40 p-6 shadow-lg rounded-xl"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">{room}호</h3>
            {reservations.length > 0 ? (
              reservations.map((res, index) => (
                <div
                  key={index}
                  className="p-2 text-black mb-2 border-l-4 border-l-gray"
                >
                  <p className="text-sm sm:text-base font-semibold">
                    <span
                      className={`text-sm font-semibold px-2 py-0 mr-2 rounded-full text-white ${
                        res.type === "강의" ? "bg-purple" : "bg-yellow"
                      }`}
                    >
                      {res.type}
                    </span>
                    {res.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {res.startTime} ~ {res.endTime}{" "}
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
        오늘 예약된 강의실: <strong>{todayScheduleData.length}건</strong>
      </p>
    </PageWrapper>
  );
};

export default Home;
