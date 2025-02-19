"use client";

import { useState } from "react";
import { AllScheduleDTO } from "../AllScheduleDTO";

interface WeeklyTimeTableProps {
  scheduleData: AllScheduleDTO[];
  selectedRoom: number;
}

// ✅ 요일 정의 (월~금만 남김)
const daysOfWeek = ["월", "화", "수", "목", "금"];
const timeSlots = Array.from({ length: 14 }, (_, i) => `${9 + i}:00`);

// HH:mm 문자열을 분 단위로 변환하는 함수
const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const WeeklyTimeTable: React.FC<WeeklyTimeTableProps> = ({
  scheduleData,
  selectedRoom,
}) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  // ✅ 월요일을 기준으로 한 주의 시작 계산
  const getStartOfWeek = () => {
    const today = new Date();
    today.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7);
    return today;
  };

  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4); // ✅ 금요일까지만 계산

  // ✅ 월~금 사이의 예약만 필터링
  const filteredData = scheduleData.filter(
    (item) =>
      item.roomNumber === selectedRoom &&
      item.date >= startOfWeek.toISOString().split("T")[0] &&
      item.date <= endOfWeek.toISOString().split("T")[0]
  );

  // 날짜 변환 (YYYY-MM-DD)
  const getFormattedDate = (offset: number) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + offset);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="w-full max-w-full overflow-x-auto">
      {/* 주차 변경 버튼 */}
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setCurrentWeek((prev) => prev - 1)}
        >
          ◀ 이전
        </button>
        <h3 className="text-lg font-semibold">
          {getFormattedDate(0)} ~ {getFormattedDate(4)}
        </h3>
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setCurrentWeek((prev) => prev + 1)}
        >
          다음 ▶
        </button>
      </div>

      {/* 주간 타임테이블 */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">시간</th>
            {daysOfWeek.map((day, index) => (
              <th key={day} className="border border-gray-300 px-4 py-2">
                {day}({getFormattedDate(index).slice(5)})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="border border-gray-300 px-4 py-2 text-center h-14 w-24">
                {time}
              </td>
              {daysOfWeek.map((day, dayIndex) => {
                const date = getFormattedDate(dayIndex);

                // 현재 셀에 해당하는 예약 찾기
                const reservation = filteredData.find(
                  (res) =>
                    res.date === date &&
                    timeToMinutes(res.startTime) <= timeToMinutes(time) &&
                    timeToMinutes(res.endTime) > timeToMinutes(time)
                );

                // ✅ 해당 예약이 시작되는 시간인지 확인
                const isStartCell =
                  reservation &&
                  timeToMinutes(reservation.startTime) === timeToMinutes(time);

                return (
                  <td
                    key={day}
                    className={`px-2 py-2 text-center h-14 w-24 ${
                      reservation
                        ? "bg-blue-200 border-t-0"
                        : "border border-gray-300"
                    }`}
                    style={{
                      verticalAlign: "middle",
                      borderLeft: "1px solid #000",
                      borderRight: "1px solid #000",
                      borderBottom: reservation ? "0px" : "1px solid #000",
                      minWidth: "100px",
                    }}
                  >
                    {reservation ? (
                      <div className="relative w-full h-full flex flex-col justify-center items-center p-1">
                        {isStartCell && (
                          <>
                            <span
                              className={`text-xs font-semibold px-2 py-0 rounded-full text-white ${
                                reservation.type === "강의"
                                  ? "bg-purple"
                                  : "bg-yellow"
                              }`}
                            >
                              {reservation.type}
                            </span>
                            <p
                              className="text-sm font-semibold text-center w-full whitespace-nowrap overflow-hidden text-ellipsis"
                              style={{ maxWidth: "90%" }} // ✅ 텍스트 길면 말줄임(...)
                            >
                              {reservation.title}
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyTimeTable;
