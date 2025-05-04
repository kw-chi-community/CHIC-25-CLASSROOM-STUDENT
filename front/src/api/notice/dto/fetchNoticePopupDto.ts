export interface fetchNoticePopupDto {
  id: string; // 공지 아이디
  start_date: string; // 팝업 보여주기 시작할 시간
  end_date: string; // 팝업 보여주기 끝낼 시간
  title: string; // 공지 제목
  contents: string; // 공지 내용
  isHidden: boolean; // 공지 숨김 여부
}
