export interface fetchReservationListDto {
  id: string; // 예약 아이디
  reserve_date: Date;
  reserve_start_time: string;
  reserve_end_time: string;
  reserve_reason: string; // 예약 사유
  reservation_confirmed: boolean; // 예약 확인 여부 (0: 예약 대기, 1: 예약 확정)
}
