// 기본 DTO 타입
export interface fetchReservationSchedulesDtoBase {
  start_time: string;
  end_time: string;
}

// 'reservation' 타입을 위한 DTO
export interface fetchReservationSchedulesDtoReservation
  extends fetchReservationSchedulesDtoBase {
  type: "reservation";
  user: string;
  purpose: string;
}

// 'lecture' 타입을 위한 DTO
export interface fetchReservationSchedulesDtoLecture
  extends fetchReservationSchedulesDtoBase {
  type: "lecture";
  subject: string;
  professor: string;
}

// 통합 DTO 타입 (조건부 타입)
export type fetchReservationSchedulesDto =
  | fetchReservationSchedulesDtoReservation
  | fetchReservationSchedulesDtoLecture;
