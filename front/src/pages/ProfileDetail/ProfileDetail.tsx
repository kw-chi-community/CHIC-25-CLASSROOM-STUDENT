import { useEffect, useState } from "react";
import { fetchProfileData } from "../../api/mypage/fetchProfileData";
import { fetchProfileDataDto } from "../../api/mypage/dto/fetchProfileDataDto";
import ProfileForm from "./components/ProfileForm";
import ProfileActions from "./components/ProfileActions";
import CenteredPageWrapper from "../../components/PageWrapper/CenteredPageWrapper";

const ProfileDetail = () => {
  const [userData, setUserData] = useState<fetchProfileDataDto | null>(null);
  const studentId: string | null = sessionStorage.getItem("studentId");

  useEffect(() => {
    const loadData = async () => {
      if (!studentId) {
        console.error("학번이 존재하지 않습니다.");
        return;
      }
      const data = await fetchProfileData(studentId);
      setUserData(data);
    };

    loadData();
  }, [studentId]);

  return (
    <CenteredPageWrapper>
      {userData && (
        <div className="w-full space-y-28">
          <ProfileForm userData={userData} studentId={studentId || ""} />
          <ProfileActions studentId={studentId || ""} />
        </div>
      )}
    </CenteredPageWrapper>
  );
};

export default ProfileDetail;
