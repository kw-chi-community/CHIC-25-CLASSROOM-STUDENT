import { updateUserInformationDto } from "./dto/updateUserInformationDto";

export const updateUserInformation = async (data: updateUserInformationDto) => {
  const token = sessionStorage.getItem("accessToken");
  const response = await fetch("/api/update-user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("회원 정보 수정에 실패했습니다.");
  }

  return response.json();
};
