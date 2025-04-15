export interface fetchReservationDetailDto {
  id: string;
  reserve_date: string;
  reserve_start_time: string;
  reserve_end_time: string;
  student_id: string;
  reserve_reason: string;
  building: string;
  room: string;
  reservation_confirmed: number;
  equipment: string[];
  contactDepartment: string;
  contactLocation: string;
  contactNumber: string;
}
