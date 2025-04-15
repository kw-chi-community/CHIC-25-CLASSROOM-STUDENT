import { useEffect, useState } from "react";
import { fetchProfileData } from "../../api/mypage/fetchProfileData";
import { fetchProfileDataDto } from "../../api/mypage/dto/fetchProfileDataDto";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ProfileCard from "./components/ProfileCard";
import ReservationList from "./components/ReservationList";

const MyPage: React.FC = () => {
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
    <PageWrapper>
      <ProfileCard studentId={studentId || ""} userData={userData} />
      <ReservationList studentId={studentId || ""} />
    </PageWrapper>
  );
};

export default MyPage;
