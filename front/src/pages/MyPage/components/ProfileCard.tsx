// components/ProfileCard.tsx
import React from "react";
import { fetchProfileDataDto } from "../../../api/mypage/dto/fetchProfileDataDto";

interface ProfileCardProps {
  studentId: string;
  userData: fetchProfileDataDto | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ studentId, userData }) => {
  return (
    <div className="bg-white shadow-lg bg-opacity-40 rounded-xl p-6 w-full text-center relative z-10">
      <h2 className="text-lg font-bold text-gray-900">내 프로필</h2>
      {userData ? (
        <>
          <p className="text-lg text-gray-700 mt-2">{userData.name}</p>
          <p className="text-sm text-gray-500">학번: {studentId}</p>
        </>
      ) : (
        <p className="text-sm text-gray-500">로딩 중...</p>
      )}
    </div>
  );
};

export default ProfileCard;
