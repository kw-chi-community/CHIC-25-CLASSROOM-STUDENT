export interface updateReservationDto {
  reservationId?: string | undefined; // 예약 아이디
  date: string; // 예약 날짜
  building: string; // 건물명
  room: string; // 호실
  startTime: string; // 시작 시간
  endTime: string; // 종료 시간
  purpose: string; // 예약 목적
  professor: string; // 담당 교수명
  participantCount: number; // 참여 인원 수
}
