const mongoose = require("mongoose");
const { classDB } = require("./mongodb");

const reservationSchema = new mongoose.Schema({
  reserve_idx: { type: Number, required: true, unique: true }, // 예약 번호 (없으면 생략 가능)
  class_idx: { type: String, required: true },        // 강의실명, 예: "비405"
  account_idx: { type: Number },                      // 사용자 ID (있으면 사용)
  reserve_title: { type: String, required: true },    // 건물명, 예: "새빛관"
  reserve_date: { type: Date, required: true },       // 예약 날짜
  reserve_start_time: { type: String, required: true }, // 시작 시간 (ex: "09:00")
  reserve_end_time: { type: String, required: true },   // 종료 시간 (ex: "10:30")
  selectedAt: { type: Date, default: Date.now },      // 생성 시간
  reservation_confirmed: { type: Number, default: 0 } // 확인 여부
}, { versionKey: false });

module.exports = classDB.model("Reservation", reservationSchema, "reserve");