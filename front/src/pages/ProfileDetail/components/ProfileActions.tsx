import { deleteUserAccount } from "../../../api//profile-detail/deleteUserAccount";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../../../components/Popup/AlertPopup";

interface ProfileActionsProps {
  studentId: string;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ studentId }) => {
  const navigate = useNavigate();
  const [alertModalOpen1, setAlertModalOpen1] = useState(false);

  const [alertModalOpen2, setAlertModalOpen2] = useState(false);

  const logoutButton = () => {
    setAlertModalOpen2(false);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("studentId");
    navigate("/login"); // 로그인 페이지로 이동};
  };

  return (
    <div className="flex flex-col gap-10 mt- font-semibold">
      <button onClick={() => console.log()} className="text-purple underline">
        비밀번호 변경
      </button>

      <button
        onClick={() => {
          setAlertModalOpen1(true);
        }}
        className="text-darkgray underline"
      >
        탈퇴하기
      </button>

      {alertModalOpen1 && (
        <AlertPopup
          text="정말 탈퇴하시겠습니까?"
          onClose={async () => {
            try {
              await deleteUserAccount(studentId);
              setAlertModalOpen1(false);
              setAlertModalOpen2(true);
            } catch (error) {
              setAlertModalOpen1(false);
              alert("회원 탈퇴에 실패했습니다.");
              console.error(error);
            }
          }}
        />
      )}

      {alertModalOpen2 && (
        <AlertPopup
          text="회원 탈퇴가 완료되었습니다. 로그인 페이지로 이동합니다."
          onClose={logoutButton}
        />
      )}
    </div>
  );
};

export default ProfileActions;
