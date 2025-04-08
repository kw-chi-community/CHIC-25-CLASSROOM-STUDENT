import { useEffect, useState } from "react";
import Button from "../../components/Button";
import CenteredPageWrapper from "../../components/PageWrapper/CenteredPageWrapper";
import { createReservation } from "../../api/make-reservation/createReservation";
import { fetchRoomsbyBuilding } from "../../api/make-reservation/fetchRoomsbyBuilding";
import { fetchRoomInfo } from "../../api/make-reservation/fetchRoomInfo";
import { fetchTimeList } from "../../api/make-reservation/fetchTimeList";
import fetchRoomInfoDto from "../../api/make-reservation/dto/fetchRoomInfoDto";
import fetchTimeListDto from "../../api/make-reservation/dto/fetchTimeListDto";

// 분리된 컴포넌트 import
import DateSelector from "./components/DateSelector";
import BuildingRoomSelector from "./components/BuildingRoomSelector";
import StartTimeSelector from "./components/StartTimeSelector";
import EndTimeSelector from "./components/EndTimeSelector";
import PurposeInput from "./components/PurposeInput";
import ParticipantInput from "./components/ParticipantInput";
import ProfessorInput from "./components/ProfessorInput";

const MakeReservation = () => {
  const [date, setDate] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [participantCount, setParticipantCount] = useState(1);
  const [professor, setProfessor] = useState("");

  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [roomInfo, setRoomInfo] = useState<fetchRoomInfoDto>({
    equipment: [],
    minNumberOfUsers: 0,
    contactDepartment: "",
    contactLocation: "",
    contactNumber: "",
  });
  const [timeList, setTimeList] = useState<fetchTimeListDto[]>([]);

  const now = new Date();
  const isAfter5PM = now.getHours() >= 17;

  const minReservationDate = new Date();
  minReservationDate.setDate(
    minReservationDate.getDate() + (isAfter5PM ? 2 : 1)
  );
  const maxReservationDate = new Date(minReservationDate);
  maxReservationDate.setDate(minReservationDate.getDate() + 13);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  useEffect(() => {
    setDate(formatDate(minReservationDate));
  }, []);

  useEffect(() => {
    if (building) {
      fetchRoomsbyBuilding(building)
        .then(setRoomOptions)
        .catch((err) => console.error("건물의 강의실 불러오기 실패:", err));
    } else {
      setRoomOptions([]);
    }
  }, [building]);

  useEffect(() => {
    if (building && room) {
      Promise.all([
        fetchRoomInfo(building, room),
        fetchTimeList(building, room),
      ])
        .then(([info, time]) => {
          setRoomInfo(info);
          setTimeList(time);
        })
        .catch((err) => {
          console.error("강의실 정보/시간 목록 실패:", err);
          resetRoomData();
        });
    } else {
      resetRoomData();
    }
  }, [building, room]);

  const resetRoomData = () => {
    setRoomInfo({
      equipment: [],
      minNumberOfUsers: 0,
      contactDepartment: "",
      contactLocation: "",
      contactNumber: "",
    });
    setTimeList([]);
  };

  const generateStartTimeOptions = () => {
    const options: { value: string; disabled: boolean }[] = [];
    for (let hour = 9; hour <= 22; hour++) {
      ["00", "30"].forEach((min) => {
        const time = `${hour.toString().padStart(2, "0")}:${min}`;
        const unavailable = timeList.some(
          ({ startTime, endTime }) =>
            new Date(`2000-01-01T${time}:00`) >=
              new Date(`2000-01-01T${startTime}:00`) &&
            new Date(`2000-01-01T${time}:00`) <
              new Date(`2000-01-01T${endTime}:00`)
        );
        options.push({ value: time, disabled: unavailable });
      });
    }
    return options;
  };

  const generateEndTimeOptions = (start: string) => {
    const options: { value: string; disabled: boolean }[] = [];
    const startTimeObj = new Date(`2000-01-01T${start}:00`);
    const nextReservation = timeList
      .map(({ startTime }) => new Date(`2000-01-01T${startTime}:00`))
      .filter((t) => t > startTimeObj)
      .sort((a, b) => a.getTime() - b.getTime())[0];

    for (let hour = 9; hour <= 22; hour++) {
      ["00", "30"].forEach((min) => {
        const time = `${hour.toString().padStart(2, "0")}:${min}`;
        const timeObj = new Date(`2000-01-01T${time}:00`);
        if (
          timeObj <= startTimeObj ||
          (nextReservation && timeObj > nextReservation)
        )
          return;
        options.push({ value: time, disabled: false });
      });
    }
    return options;
  };

  const isFormValid =
    date &&
    building &&
    room &&
    startTime &&
    endTime &&
    purpose.length > 0 &&
    purpose.length <= 15 &&
    participantCount >= (roomInfo.minNumberOfUsers || 0) &&
    professor;

  const isValidTimeRange = (start: string, end: string) =>
    new Date(`2000-01-01T${start}:00`) < new Date(`2000-01-01T${end}:00`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return alert("모든 항목을 올바르게 입력해주세요!");
    if (!isValidTimeRange(startTime, endTime))
      return alert("종료 시간은 시작 시간보다 늦어야 합니다.");

    createReservation({
      date,
      building,
      room,
      startTime,
      endTime,
      purpose,
      participantCount,
      professor,
    })
      .then(({ reservationId }) => {
        alert("예약이 완료되었습니다!");
        // TODO: 상세 팝업 처리
      })
      .catch((err) => console.error("예약 실패:", err));
  };

  return (
    <CenteredPageWrapper>
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-50 p-6 w-full max-w-lg shadow-lg rounded-xl space-y-3 z-10"
      >
        <DateSelector
          date={date}
          min={formatDate(minReservationDate)}
          max={formatDate(maxReservationDate)}
          onChange={setDate}
        />
        <BuildingRoomSelector
          building={building}
          room={room}
          roomOptions={roomOptions}
          roomInfo={roomInfo}
          onBuildingChange={(b) => {
            setBuilding(b);
            setRoom("");
            resetRoomData();
            setStartTime("");
            setEndTime("");
          }}
          onRoomChange={setRoom}
        />
        <StartTimeSelector
          value={startTime}
          options={generateStartTimeOptions()}
          onChange={setStartTime}
        />
        <EndTimeSelector
          value={endTime}
          options={startTime ? generateEndTimeOptions(startTime) : []}
          onChange={setEndTime}
        />
        <PurposeInput value={purpose} onChange={setPurpose} />
        <ParticipantInput
          value={participantCount}
          minRequired={roomInfo.minNumberOfUsers}
          onChange={setParticipantCount}
        />
        <ProfessorInput value={professor} onChange={setProfessor} />
        <div className="pt-10">
          <Button type="submit" text="예약하기" isActive={isFormValid} />
        </div>
      </form>
    </CenteredPageWrapper>
  );
};

export default MakeReservation;
