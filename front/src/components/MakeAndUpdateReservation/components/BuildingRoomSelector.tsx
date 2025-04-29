import Select from "../../../components/Select";
import { MapPin, Phone } from "lucide-react";
import fetchRoomInfoDto from "../../../api/make-reservation/dto/fetchRoomInfoDto";

interface Props {
  building: string;
  room: string;
  roomOptions: string[];
  roomInfo: fetchRoomInfoDto;
  onBuildingChange: (building: string) => void;
  onRoomChange: (room: string) => void;
}

const BuildingRoomSelector = ({
  building,
  room,
  roomOptions,
  roomInfo,
  onBuildingChange,
  onRoomChange,
}: Props) => {
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

  return (
    <div>
      <div className="block mb-2 font-semibold">대여 장소</div>
      <div className="flex gap-4">
        <Select
          options={buildings}
          value={building}
          onChange={(e) => onBuildingChange(e.target.value)}
        />
        <Select
          options={["강의실", ...roomOptions]}
          value={room}
          onChange={(e) => onRoomChange(e.target.value)}
        />
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
                  {roomInfo.equipment.map((eq, i) => (
                    <span
                      key={i}
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
    </div>
  );
};

export default BuildingRoomSelector;
