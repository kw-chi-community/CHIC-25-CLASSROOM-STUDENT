"use client";

import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CenteredPageWrapper from "../../components/CenteredPageWrapper";

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

  const isFormValid = Boolean(
    date &&
      startTime &&
      endTime &&
      room &&
      purpose.length > 0 &&
      purpose.length <= 10
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("모든 항목을 올바르게 입력해주세요!");
      return;
    }

    const isValidTimeRange = (startTime: string, endTime: string): boolean => {
      const start = new Date(`2000-01-01T${startTime}:00`); // 예: "09:00" -> 2000-01-01T09:00:00
      const end = new Date(`2000-01-01T${endTime}:00`);

      return start < end;
    };

    if (!isValidTimeRange(startTime, endTime)) {
      alert("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    alert("예약이 완료되었습니다!");
  };

  return (
    <CenteredPageWrapper>
      <form
        className=" bg-white bg-opacity-50 p-6 w-full max-w-lg shadow-lg rounded-xl space-y-3"
        onSubmit={handleSubmit}
      >
        {/* 날짜 선택 */}
        <div>
          <label className="block mb-2 font-semibold">예약 날짜</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* 강의실 선택 */}
        <div>
          <label className="block mb-2 font-semibold">강의실 선택</label>
          <Select
            options={["강의실 선택", "103호", "104호", "205호", "715호"]}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        {/* 시작 시간 선택 */}
        <div>
          <label className="block mb-2 font-semibold">시작 시간</label>
          <Select
            options={["시작 시간 선택", ...timeOptions]}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* 종료 시간 선택 */}
        <div>
          <label className="block mb-2 font-semibold">종료 시간</label>
          <Select
            options={["종료 시간 선택", ...timeOptions]}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* 용도 입력 */}
        <div>
          <label className="block mb-2 font-semibold">
            용도 입력 (최대 10자)
          </label>
          <Input
            type="text"
            maxLength={10}
            placeholder="예: 세미나"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        {/* 예약 버튼 */}
        <div className="pt-10">
          <Button type="submit" text="예약하기" isActive={isFormValid} />
        </div>
      </form>
    </CenteredPageWrapper>
  );
};

export default MakeReservation;
