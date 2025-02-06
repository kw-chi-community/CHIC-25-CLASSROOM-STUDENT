"use client";

import { useState } from "react";

const MakeReservation = () => {
  const [date, setDate] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");

  // 30분 단위 시간 옵션 생성
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 22; hour++) {
      options.push(`${hour}:00`, `${hour}:30`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const isFormValid =
    date &&
    startTime &&
    endTime &&
    room &&
    purpose.length > 0 &&
    purpose.length <= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("모든 항목을 올바르게 입력해주세요!");
      return;
    }
    if (startTime >= endTime) {
      alert("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    console.log({
      date,
      startTime,
      endTime,
      room,
      purpose,
    });

    alert("예약이 완료되었습니다!");
  };

  return (
    <div className="relative flex items-center justify-center h-screen px-6 overflow-hidden">
      {/* Blur 효과 원 (Ellipse 1 - 노란색) */}
      <div className="absolute w-52 h-52 bg-yellow opacity-45 blur-[120px] left-[10%] top-[5%]"></div>

      {/* Blur 효과 원 (Ellipse 2 - 보라색) */}
      <div className="absolute w-52 h-52 bg-purple opacity-50 blur-[120px] right-[10%] top-[15%]"></div>

      <div className="relative w-full max-w-lg text-left">
        <h2 className="text-2xl font-bold mb-4">강의실 예약</h2>
        <form
          className=" bg-white bg-opacity-50 p-6 shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          {/* 날짜 선택 */}
          <label className="block mb-2 font-semibold">예약 날짜</label>
          <input
            type="date"
            className="w-full p-2 border mb-4 border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-center text-lg transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* 강의실 선택 */}
          <label className="block mb-2 font-semibold">강의실 선택</label>
          <select
            className="w-full p-2 border mb-4 border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-center text-lg transition-all"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="">강의실 선택</option>
            <option value="103호">103호</option>
            <option value="104호">104호</option>
            <option value="205호">205호</option>
            <option value="715호">715호</option>
          </select>

          {/* 시작 시간 선택 */}
          <label className="block mb-2 font-semibold">시작 시간</label>
          <select
            className="w-full p-2 border mb-4 border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-center text-lg transition-all"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">시작 시간 선택</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* 종료 시간 선택 */}
          <label className="block mb-2 font-semibold">종료 시간</label>
          <select
            className="w-full p-2 border mb-4 border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-center text-lg transition-all"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            <option value="">종료 시간 선택</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* 용도 입력 */}
          <label className="block mb-2 font-semibold">
            용도 입력 (최대 10자)
          </label>
          <input
            type="text"
            className="w-full p-2 border mb-4 border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-center text-lg transition-all"
            maxLength={10}
            placeholder="예: 세미나"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          {/* 예약 버튼 */}
          <button
            type="submit"
            className={`w-full mt-6 p-4 rounded-xl font-semibold transition duration-300 text-white text-lg tracking-wide shadow-md ${
              isFormValid
                ? "bg-purple bg-opacity-70 hover:bg-purple shadow-lg transform hover:scale-105"
                : "bg-gray cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            예약하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeReservation;
