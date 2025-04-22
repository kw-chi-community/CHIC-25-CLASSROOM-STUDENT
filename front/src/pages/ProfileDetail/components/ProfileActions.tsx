import React from "react";

interface ProfileActionsProps {
  studentId: string;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ studentId }) => {
  return (
    <div className="flex flex-col gap-10 mt- font-semibold">
      <button onClick={() => console.log()} className="text-purple underline">
        비밀번호 변경
      </button>

      <button onClick={() => console.log()} className="text-darkgray underline">
        탈퇴하기
      </button>
    </div>
  );
};

export default ProfileActions;
