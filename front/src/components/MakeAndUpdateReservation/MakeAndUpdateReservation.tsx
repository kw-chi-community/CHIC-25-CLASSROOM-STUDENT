import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import CenteredPageWrapper from "../../components/PageWrapper/CenteredPageWrapper";
import { createReservation } from "../../api/make-reservation/createReservation";
import { fetchRoomsbyBuilding } from "../../api/make-reservation/fetchRoomsbyBuilding";
import { fetchRoomInfo } from "../../api/make-reservation/fetchRoomInfo";
import { fetchTimeList } from "../../api/make-reservation/fetchTimeList";
import fetchRoomInfoDto from "../../api/make-reservation/dto/fetchRoomInfoDto";
import fetchTimeListDto from "../../api/make-reservation/dto/fetchTimeListDto";

import DateSelector from "./components/DateSelector";
import BuildingRoomSelector from "./components/BuildingRoomSelector";
import StartTimeSelector from "./components/StartTimeSelector";
import EndTimeSelector from "./components/EndTimeSelector";
import PurposeInput from "./components/PurposeInput";
import ParticipantInput from "./components/ParticipantInput";
import ProfessorInput from "./components/ProfessorInput";
import ReservationDetailPopup from "../../components/Popup/ReservationDetailPopup";
import AlertPopup from "../../components/Popup/AlertPopup";
import { updateReservation } from "../../api/make-reservation/updateReservation";
import { getReservation } from "../../api/make-reservation/getReservation";
import { getReservationDto } from "../../api/make-reservation/dto/getReservationDto";

const MakeAndUpdateReservation = ({
  reservationId,
}: {
  reservationId?: string;
}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // 팝업 닫으면 홈으로 돌아가기
  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

  const [noticePoupOpen, setNoticePoupOpen] = useState<boolean>(true);

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
  const [reservationIdState, setReservationId] = useState<string>("");

  // isEditMode: true if reservationId is provided as prop
  const isEditMode = !!reservationId;

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
    if (isEditMode) return;
    setDate(formatDate(minReservationDate));
  }, []);

  // 예약 수정 모드일 때, 기존 데이터를 받아오도록
  useEffect(() => {
    if (!isEditMode || !reservationId) return;

    // 실제 기존 데이터 받아오는거 수정
    getReservation(reservationId)
      .then((originData: getReservationDto) => {
        setDate(originData.date);
        setBuilding(originData.building);
        setRoom(originData.room);
        setStartTime(originData.startTime);
        setEndTime(originData.endTime);
        setPurpose(originData.purpose);
        setParticipantCount(originData.participantCount);
        setProfessor(originData.professor);
      })
      .catch((err) =>
        console.error("Failed to fetch reservation details:", err)
      );
  }, [isEditMode, reservationId]);

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
        fetchTimeList(date, building, room),
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
  }, [date, building, room]);

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

    const reservationPayload = {
      ...(reservationId && { reservationId }),
      date,
      building,
      room,
      startTime,
      endTime,
      purpose,
      participantCount,
      professor,
    };

    const submitFn = isEditMode
      ? async () => {
          const result = await updateReservation(reservationPayload);
          if (result.success) {
            setShowPopup(true);
          }
        }
      : async () => {
          const result = await createReservation(reservationPayload);
          setReservationId(result); // set id for popup
          setShowPopup(true);
        };

    submitFn().catch((err) => console.error("예약 처리 실패:", err));
  };

  return (
    <CenteredPageWrapper>
      {noticePoupOpen && (
        <AlertPopup
          text={
            "강의실 예약은 이용일 기준 2주 전부터, 전날 오후 5시까지 가능합니다."
          }
          onClose={() => setNoticePoupOpen(false)}
        />
      )}
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
          minRequired={roomInfo.minNumberOfUsers ?? undefined}
          onChange={setParticipantCount}
        />
        <ProfessorInput value={professor} onChange={setProfessor} />
        <div className="pt-10">
          <Button
            type="submit"
            text={isEditMode ? "예약 수정" : "예약하기"}
            isActive={!!isFormValid}
          />
        </div>
      </form>

      {/* 예약 상세 팝업 */}
      {showPopup && (
        <ReservationDetailPopup
          reservationId={isEditMode ? reservationId : reservationIdState}
          onClose={handleClosePopup}
        />
      )}
    </CenteredPageWrapper>
  );
};

export default MakeAndUpdateReservation;
