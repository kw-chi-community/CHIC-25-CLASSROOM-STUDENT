import { CalendarPlus, ClipboardList, Megaphone, User } from "lucide-react";
import { Link } from "react-router-dom";

const NavigationButtons = () => {
  const buttons = [
    {
      to: "/make-reservation",
      label: "예약하기",
      icon: (
        <CalendarPlus size={28} strokeWidth={1.5} className="mb-1 text-black" />
      ),
    },
    {
      to: "/reservation-status",
      label: "강의실 시간표",
      icon: (
        <ClipboardList
          size={28}
          strokeWidth={1.5}
          className="mb-1 text-black"
        />
      ),
    },
    {
      to: "/notice",
      label: "공지사항",
      icon: (
        <Megaphone size={28} strokeWidth={1.5} className="mb-1 text-black" />
      ),
    },
    {
      to: "/mypage",
      label: "마이페이지",
      icon: <User size={28} strokeWidth={1.5} className="mb-1 text-black" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {buttons.map((btn) => (
        <Link
          key={btn.to}
          to={btn.to}
          className="flex flex-col items-center justify-center bg-white/60 rounded-xl shadow-md p-6 font-semibold text-black hover:bg-white transition-all duration-200"
        >
          {btn.icon}
          <span>{btn.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavigationButtons;
