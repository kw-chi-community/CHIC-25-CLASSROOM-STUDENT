export interface fetchProfileDataDto {
  name: string;
  reservation_status: {
    roomNumber: number;
    date: string;
    startTime: string; // 시작 시간 (HH:mm)
    endTime: string; // 종료 시간 (HH:mm)
    title: string;
  };
}
