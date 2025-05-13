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

  // 이름 익명화 처리 (첫 글자만 표시)
  const anonymizeName = (name: string) => {
    if (!name) return "";
    return name.charAt(0) + "*".repeat(name.length - 1);
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
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 bg-opacity-50">
          <div className="flex flex-row gap-4 w-full mb-4">
            <div className="flex-1">
              <Select
                options={buildings}
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

          {building && room && (
            <div className="w-full flex flex-row items-center justify-center gap-4">
              <ChevronLeft
                onClick={() => adjustDate(-1)}
                className="cursor-pointer hover:text-blue-600 transition-colors"
              />
              <div className="flex flex-col items-center">
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <ChevronRight
                onClick={() => adjustDate(1)}
                className="cursor-pointer hover:text-purple transition-colors"
              />
            </div>
          )}
        </div>

        {building && room && room !== "강의실" && (
          <div className="bg-white rounded-xl shadow-md p-6 bg-opacity-50">
            {data.length === 0 ? (
              <p className="text-center">예약 및 강의 정보가 없습니다.</p>
            ) : (
              <ul className="space-y-4">
                {data.map((item, idx) => (
                  <li
                    key={idx}
                    className={`p-4 rounded-lg transition-all ${
                      item.type === "reservation"
                        ? "bg-yellow/10"
                        : "bg-purple/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold min-w-[48px] text-center ${
                          item.type === "reservation"
                            ? "bg-yellow"
                            : "bg-purple"
                        }`}
                      >
                        {item.type === "reservation" ? "예약" : "강의"}
                      </span>
                      <span className="font-medium whitespace-nowrap">
                        {item.start_time} ~ {item.end_time}
                      </span>
                      <span className="break-all">
                        {item.type === "reservation" ? (
                          <>
                            {item.purpose}
                            <span className="ml-1">
                              ({anonymizeName(item.user)})
                            </span>
                          </>
                        ) : (
                          <>
                            {item.subject}
                            <span className="ml-1">({item.professor})</span>
                          </>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ReservationStatus;
