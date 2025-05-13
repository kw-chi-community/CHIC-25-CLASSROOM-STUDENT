import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { fetchRoomsbyBuilding } from "../../api/make-reservation/fetchRoomsbyBuilding";
import Select from "../../components/Select";
import Input from "../../components/Input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchReservationSchedulesDto } from "../../api/room-schedule/dto/fetchReservationSchedulesDto";
import { fetchReservationSchedules } from "../../api/room-schedule/fetchReservationSchedules";

const getToday = () => new Date().toISOString().split("T")[0];

const ReservationStatus = () => {
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [date, setDate] = useState(getToday());
  const [data, setData] = useState<fetchReservationSchedulesDto[]>([]); // 예약 데이터

  const buildings = [
    "건물",
    "기념관",
    "누리관",
    "비마관",
    "새빛관",
    "참빛관",
    "한울관",
    "화도관",
  ];

  const adjustDate = (days: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + days);
    setDate(currentDate.toISOString().split("T")[0]);
  };

  // 건물 선택시 강의실 옵션 자동 생성
  useEffect(() => {
    if (building) {
      fetchRoomsbyBuilding(building)
        .then(setRoomOptions)
        .catch((err) => console.error("건물의 강의실 불러오기 실패:", err));
    } else {
      setRoomOptions([]);
    }
    setRoom("");
    setData([]);
  }, [building]);

  // room 선택 시 예약 데이터 로드 (조건: building과 room 모두 선택된 경우)
  useEffect(() => {
    console.log(date, building, room);
    if (date && building && room && room !== "강의실") {
      fetchReservationSchedules(building, room, date).then((schedules) => {
        setData(schedules);
      });
    } else {
      setData([]);
    }
  }, [date, building, room]);

  return (
    <PageWrapper>
      <h1 className="text-lg mb-4 w-full text-center">
        사용 현황을 알고싶은 강의실을 선택하세요
      </h1>

      <div className="flex flex-row gap-4 w-full mb-2">
        <Select
          options={buildings}
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
        <Select
          options={["강의실", ...roomOptions]}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      {building && room && (
        <div className="w-full px-8 flex flex-row items-center justify-center gap-4">
          <ChevronLeft
            onClick={() => adjustDate(-1)}
            className="cursor-pointer"
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <ChevronRight
            onClick={() => adjustDate(1)}
            className="cursor-pointer"
          />
        </div>
      )}

      {building && room && room !== "강의실" && (
        <div className="mt-4">
          {data.length === 0 && <p>예약 및 강의 정보가 없습니다.</p>}
          <ul>
            {data.map((item, idx) => (
              <li key={idx} className="mb-4">
                <span>
                  {item.type === "reservation" ? (
                    <>
                      <span className="px-2 py-1 rounded-full bg-yellow text-white text-sm font-semibold mr-2">
                        예약
                      </span>
                      {item.purpose} ({item.user})
                    </>
                  ) : (
                    <>
                      <span className="px-2 py-1 rounded-full bg-purple text-white text-sm font-semibold mr-2">
                        강의
                      </span>
                      {item.subject} ({item.professor})
                    </>
                  )}
                </span>
                {" / "}
                <span>
                  시간: {item.start_time} ~ {item.end_time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageWrapper>
  );
};

export default ReservationStatus;
