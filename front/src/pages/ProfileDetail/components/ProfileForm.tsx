import React, { useState, useEffect } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { fetchProfileDataDto } from "../../../api/mypage/dto/fetchProfileDataDto";

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

  useEffect(() => {
    // 임시 데이터, 실제로는 API로 불러올 것
    setFormData({
      name: "홍길동",
      email: "hong@example.com",
      phoneNumber: "010-1234-5678",
    });
  }, [studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // 저장 로직 추가 예정
    setEditMode(false);
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
    </div>
  );
};

export default ProfileForm;
