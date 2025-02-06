"use client";

interface RoomTabProps {
  rooms: number[];
  selectedRoom: number | null;
  setSelectedRoom: (room: number) => void;
}

const RoomTab: React.FC<RoomTabProps> = ({
  rooms,
  selectedRoom,
  setSelectedRoom,
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      {rooms.map((room) => (
        <button
          key={room}
          className={`px-4 py-2 border rounded-lg font-semibold ${
            selectedRoom === room
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setSelectedRoom(room)}
        >
          {room}호
        </button>
      ))}
    </div>
  );
};

export default RoomTab;
