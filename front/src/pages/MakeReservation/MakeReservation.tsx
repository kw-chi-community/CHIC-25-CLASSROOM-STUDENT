import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CenteredPageWrapper from "../../components/CenteredPageWrapper";
import { createReservation } from "../../api/make-reservation/createReservation";
import { fetchRoomsbyBuilding } from "../../api/make-reservation/fetchRoomsbyBuilding";

const MakeReservation = () => {
  const [date, setDate] = useState("");
  const [building, setBuilding] = useState("");
  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [professor, setProfessor] = useState("");
  const [participantCount, setParticipantCount] = useState(1);

  const makeReservation = async () => {
    try {
      const { reservationId } = await createReservation({
        date,
        building,
        room,
        startTime,
        endTime,
        purpose,
        professor,
        participantCount,
      });
      alert("예약이 완료되었습니다!");
      // TODO: reservationId을 사용하여 예약 상세 페이지로 이동하기
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
      building &&
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
                onChange={(e) => setBuilding(e.target.value)}
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

        {/* 시작 시간 선택 */}
        <div>
          <label className="block mb-2 font-semibold">시작 시간</label>
          <Select
            options={["시작 시간", ...timeOptions]}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* 종료 시간 선택 */}
        <div>
          <label className="block mb-2 font-semibold">종료 시간</label>
          <Select
            options={["종료 시간", ...timeOptions]}
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
