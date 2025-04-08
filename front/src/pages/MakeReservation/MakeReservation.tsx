import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CenteredPageWrapper from "../../components/CenteredPageWrapper";
import { createReservation } from "../../api/make-reservation/createReservation";
import { fetchRoomsbyBuilding } from "../../api/make-reservation/fetchRoomsbyBuilding";
import { fetchRoomInfo } from "../../api/make-reservation/fetchRoomInfo";
import { fetchTimeList } from "../../api/make-reservation/fetchTimeList";
import fetchRoomInfoDto from "../../api/make-reservation/dto/fetchRoomInfoDto";
import fetchTimeListDto from "../../api/make-reservation/dto/fetchTimeListDto";
import { MapPin, Phone } from "lucide-react";

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

  const makeReservation = async () => {
    try {
      const { reservationId } = await createReservation({
        date,
        building,
        room,
        startTime,
        endTime,
        purpose,
        participantCount,
        professor,
      });
      alert("예약이 완료되었습니다!");
      // TODO: reservationId을 사용하여 예약 상세 팝업 띄우기
    } catch (error) {
      console.error("예약에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    const fetchRoomOptions = async () => {
      if (building) {
        try {
          const rooms = await fetchRoomsbyBuilding(building);
          setRoomOptions(rooms);
        } catch (error) {
          console.error(
            "건물에 대한 강의실을 가져오는 데 실패했습니다.",
            error
          );
        }
      } else {
        setRoomOptions([]);
      }
    };

    fetchRoomOptions();
  }, [building]);

  useEffect(() => {
    const fetchRoom = async () => {
      if (building && room) {
        try {
          const roomInfo = await fetchRoomInfo(building, room);
          const timeList = await fetchTimeList(building, room);

          setRoomInfo(roomInfo);
          setTimeList(timeList);
        } catch (error) {
          console.error(
            "건물에 대한 정보 및 예약/강의 시간 목록을 가져오는 데 실패했습니다.",
            error
          );
        }
      } else {
        setRoomInfo({
          equipment: [],
          minNumberOfUsers: 0,
          contactDepartment: "",
          contactLocation: "",
          contactNumber: "",
        });
        setTimeList([]);
      }
    };

    fetchRoom();
  }, [building, room]);

  // 30분 단위 시간 옵션 생성 + 예약불가 시간 제거
  const generateStartTimeOptions = () => {
    const options: { value: string; disabled: boolean }[] = [];

    for (let hour = 9; hour <= 22; hour++) {
      ["00", "30"].forEach((minute) => {
        const time = `${hour.toString().padStart(2, "0")}:${minute}`;

        // 예약 불가능 시간대인지 확인
        const isUnavailable = timeList.some(({ startTime, endTime }) => {
          return (
            new Date(`2000-01-01T${time}:00`) >=
              new Date(`2000-01-01T${startTime}:00`) &&
            new Date(`2000-01-01T${time}:00`) <
              new Date(`2000-01-01T${endTime}:00`)
          );
        });

        options.push({ value: time, disabled: isUnavailable });
      });
    }

    return options;
  };

  const generateEndTimeOptions = (start: string) => {
    const options: { value: string; disabled: boolean }[] = [];
    const startTimeObj = new Date(`2000-01-01T${start}:00`);

    // start 이후의 예약 중 가장 빠른 예약 시작 시간 찾기
    const nextReservationStart = timeList
      .map(({ startTime }) => new Date(`2000-01-01T${startTime}:00`))
      .filter((resStart) => resStart > startTimeObj)
      .sort((a, b) => a.getTime() - b.getTime())[0]; // 가장 빠른 예약

    for (let hour = 9; hour <= 22; hour++) {
      ["00", "30"].forEach((minute) => {
        const timeStr = `${hour.toString().padStart(2, "0")}:${minute}`;
        const currentTime = new Date(`2000-01-01T${timeStr}:00`);

        if (currentTime <= startTimeObj) return;
        if (nextReservationStart && currentTime > nextReservationStart) return;

        options.push({ value: timeStr, disabled: false });
      });
    }

    return options;
  };

  const isFormValid = Boolean(
    date &&
      building &&
      room &&
      startTime &&
      endTime &&
      purpose.length > 0 &&
      purpose.length <= 15 &&
      participantCount > 0 &&
      participantCount >= (roomInfo.minNumberOfUsers || 0) &&
      professor
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
    makeReservation();
  };

  return (
    <CenteredPageWrapper>
      <form
        className=" bg-white bg-opacity-50 p-6 w-full max-w-lg shadow-lg rounded-xl space-y-3 z-10"
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

        {/* 건물 + 강의실 선택 */}
        <div>
          <div className="block mb-2 font-semibold">대여 장소</div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select
                options={[
                  "건물",
                  "기념관",
                  "누리관",
                  "비마관",
                  "새빛관",
                  "참빛관",
                  "한울관",
                  "화도관",
                ]}
                value={building}
                onChange={(e) => {
                  const selectedBuilding = e.target.value;
                  setBuilding(selectedBuilding);
                  setRoom("");
                  setRoomInfo({
                    equipment: [],
                    minNumberOfUsers: 0,
                    contactDepartment: "",
                    contactLocation: "",
                    contactNumber: "",
                  });
                  setStartTime("");
                  setEndTime("");
                  setTimeList([]);
                }}
              />
            </div>
            <div className="flex-1">
              <Select
                options={["강의실", ...roomOptions]}
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </div>
        </div>

        {building && room && (
          <div className="mt-4 p-4 bg-white/50 border border-gray rounded-lg text-black">
            <p className="font-semibold mb-4 text-center tracking-wide border-b border-gray pb-2">
              {building} {room} 정보
            </p>
            <ul className="space-y-2">
              <li>
                {roomInfo.equipment.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {roomInfo.equipment.map((eq, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-skyblue rounded-full text-sm font-medium"
                      >
                        # {eq}
                      </span>
                    ))}
                  </div>
                )}
              </li>
              <li>
                <strong>최소 인원:</strong>{" "}
                {roomInfo.minNumberOfUsers ?? "제한 없음"}
              </li>
              <li>
                <strong>관리 부서:</strong> {roomInfo.contactDepartment}
                <br />
                <p className="ml-16">
                  <MapPin size={14} className="inline mr-1 text-gray-500" />
                  {roomInfo.contactLocation}
                </p>
                <p className="ml-16">
                  <Phone size={14} className="inline mr-1 text-gray-500" />
                  {roomInfo.contactNumber}
                </p>
              </li>
            </ul>
          </div>
        )}

        {/* 시작 시간 선택 */}
        <div>
          <label className="block mb-2 font-semibold">시작 시간</label>
          <Select
            options={["시작 시간", ...generateStartTimeOptions()]}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* 종료 시간 선택 */}
        <div>
          <label className="block mb-2 font-semibold">종료 시간</label>
          <Select
            options={[
              "종료 시간",
              ...(startTime ? generateEndTimeOptions(startTime) : []),
            ]}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* 용도 입력 */}
        <div>
          <label className="block mb-2 font-semibold">
            용도 입력 (최대 15자)
          </label>
          <Input
            type="text"
            maxLength={15}
            placeholder="예: 정보융합학부 개강총회"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        {/* 용도 입력 */}
        <div>
          <label className="block mb-2 font-semibold">사용 인원</label>
          <Input
            type="number"
            maxLength={10}
            value={String(participantCount)}
            onChange={(e) => setParticipantCount(Number(e.target.value))}
          />
          {roomInfo.minNumberOfUsers > 0 ??
          participantCount < (roomInfo.minNumberOfUsers ?? Infinity) ? (
            <p className="text-red text-sm">
              {roomInfo.minNumberOfUsers}명 이상만 사용할 수 있는 강의실입니다.
            </p>
          ) : null}
        </div>

        {/* 담당 교수 입력 */}
        <div>
          <label className="block mb-2 font-semibold">담당 교수</label>
          <Input
            type="text"
            maxLength={10}
            placeholder="담당 교수님 성함을 입력하세요"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
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
