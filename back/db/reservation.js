// db/reservation.js
const mongoose = require('mongoose');
const { classDB } = require('./mongodb'); // 이미 선언된 "classDB" 연결

const reservationSchema = new mongoose.Schema({
  reserve_idx: { type: Number, required: true, unique: true }, //고유 예약 번호
  class_idx: { type: Number, required: true },  //수업 학정 번호
  account_idx: { type: Number, required: true },  //사용자 고유 번호
  reserve_title: { type: String, required: true },  //예약 제목, 목적
  reserve_date: { type: Date, required: true }, //예약할 날짜
  reserve_start_time: { type: String, required: true },  //예약 시작 시간
  reserve_end_time: { type: String, required: true },  //예약 끝 시간
  selectedAt: { type: Date, default: Date.now },  //예약 버튼 선택 시간
  reservation_confirmed: { type: Number, default: 0 } //예약 확정 여부
}, { versionKey: false });

// 세 번째 인자로 'reserve' 지정 => "class" DB 안의 "reserve" 컬렉션 생성
module.exports = classDB.model('Reservation', reservationSchema, 'reserve');
