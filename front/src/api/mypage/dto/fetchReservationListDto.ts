export interface fetchReservationListDto {
  id: string; // 예약 아이디
  reserve_date: Date;
  reserve_start_time: string;
  reserve_end_time: string;
  building: string;
  room: string;
  reservation_confirmed: boolean; // 예약 확인 여부 (0: 예약 반려, 1: 예약 확정)
}
