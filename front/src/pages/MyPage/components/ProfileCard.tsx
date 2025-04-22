// components/ProfileCard.tsx
import React from "react";
import { fetchProfileDataDto } from "../../../api/mypage/dto/fetchProfileDataDto";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

interface ProfileCardProps {
  studentId: string;
  userData: fetchProfileDataDto | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ studentId, userData }) => {
  return (
    <div className="bg-white shadow-lg bg-opacity-40 rounded-xl p-6 w-full flex justify-between relative z-10 items-center">
      <div className="text-left">
        {userData ? (
          <>
            <p className="text-lg font-semibold">{userData.name}</p>
            <p>{studentId}</p>
            <p>{userData.email}</p>
          </>
        ) : (
          <p className="text-sm text-gray-500">로딩 중...</p>
        )}
      </div>
      <Link
        to={ROUTES.PROFILE_DETAIL.path}
        className="border-lightpurple text-lightpurple border-2 rounded-full w-fit h-fit p-1 hover:bg-lightpurple hover:text-white transition-colors duration-200"
      >
        <ChevronRight />
      </Link>
    </div>
  );
};

export default ProfileCard;
