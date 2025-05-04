export interface fetchReservationNoticesDto {
  id: string; // 공지 아이디
  created_at: string; // 공지 작성 시간
  type: boolean; // 공지 타입 (예: false: 고정, true: 팝업)
  title: string; // 공지 제목
}
