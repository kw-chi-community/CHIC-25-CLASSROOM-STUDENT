export default interface fetchRoomInfoDto {
  equipment: string[]; // 장비 목록
  minNumberOfUsers: number | null; // 최소 인원 수
  contactDepartment: string; // 관리 기관
  contactLocation: string; // 관리 기관 위치
  contactNumber: string; // 관리 기관 연락처
}
