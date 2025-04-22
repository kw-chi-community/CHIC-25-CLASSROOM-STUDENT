import React, { useState, useEffect } from "react";
import { fetchProfileData } from "../../../api/mypage/fetchProfileData";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { fetchProfileDataDto } from "../../../api/mypage/dto/fetchProfileDataDto";
import { updateUserInformation } from "../../../api/profile-detail/updateUserInformation";
import { updateUserInformationDto } from "../../../api/profile-detail/dto/updateUserInformationDto";
import AlertPopup from "../../../components/Popup/AlertPopup";

interface ProfileFormProps {
  studentId: string;
  userData: fetchProfileDataDto;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ studentId }) => {
  const [formData, setFormData] = useState<fetchProfileDataDto>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchProfileData(studentId);
        setFormData(data ?? { name: "", email: "", phoneNumber: "" });
      } catch (error) {
        console.error("프로필 정보를 불러오는데 실패했습니다.", error);
      }
    };

    loadProfileData();
  }, [studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload: updateUserInformationDto = {
        studentId,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      };
      console.log("payload", payload);
      await updateUserInformation(payload);
      setEditMode(false);
      setAlertModalOpen(true);
    } catch (error) {
      console.error("사용자 정보 업데이트 실패:", error);
    }
  };

  return (
    <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md w-full space-y-4">
      <h2 className="text-xl font-bold">프로필 정보</h2>
      <div className="space-y-2">
        <Input
          label="이름"
          name="name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!editMode}
        />
        <Input
          label="전화번호"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          readOnly={!editMode}
        />
        <Input
          label="이메일"
          name="email"
          value={formData.email}
          readOnly={true}
        />
        <Input
          label="학번"
          name="studentId"
          value={studentId}
          readOnly={true}
        />
      </div>
      <div className="flex justify-end gap-2">
        {editMode ? (
          <Button text="저장" onClick={handleSave} isActive />
        ) : (
          <Button
            text="프로필 정보 수정"
            onClick={() => setEditMode(true)}
            isActive
          />
        )}
      </div>
      {alertModalOpen ?? (
        <AlertPopup
          text="프로필 정보가 수정되었습니다."
          onClose={() => setAlertModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileForm;
